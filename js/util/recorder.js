// Mikrofon-Aufnahme — dünne, browser-only Hülle um getUserMedia + AnalyserNode.
//
// Wir speichern KEIN Audio und senden nichts ins Netz: pro Frame wird nur ein
// RMS-Energiewert (eine Zahl) gesammelt, woraus eine Lautstärke-Hüllkurve wird.
// Diese Hüllkurve füttert die reine Rhythmus-Analyse (siehe audio-analysis.js).
// Alles läuft on-device; nach dem Stoppen werden Tracks + AudioContext geschlossen.

// Feature-Erkennung — in Tests/SSR (kein navigator) sicher `false`.
export function isRecordingSupported() {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') return false;
  const md = navigator.mediaDevices;
  const AC = window.AudioContext || window.webkitAudioContext;
  return !!(md && typeof md.getUserMedia === 'function' && AC);
}

/**
 * Startet eine Mikrofon-Aufnahme und sammelt eine RMS-Lautstärke-Hüllkurve.
 *
 * @param {object} [opts]
 * @param {number} [opts.maxMs=4000]  Auto-Stopp nach so vielen Millisekunden.
 * @param {(level:number)=>void} [opts.onLevel]  Live-Callback je Frame (0..1).
 * @param {(result:{envelope:number[],durationMs:number})=>void} [opts.onStop]
 *          Wird genau einmal aufgerufen, sobald die Aufnahme endet — egal ob
 *          per `stop()` oder durch den `maxMs`-Auto-Stopp.
 * @returns {Promise<{ stop:()=>Promise<{envelope:number[],durationMs:number}>,
 *                     cancel:()=>void }>}
 *          Löst auf, sobald der Nutzer den Mikrofon-Zugriff erlaubt hat.
 *          Wirft bei fehlender Unterstützung oder verweigertem Zugriff.
 */
export async function startRecording({ maxMs = 4000, onLevel, onStop } = {}) {
  if (!isRecordingSupported()) {
    throw new Error('Aufnahme wird hier nicht unterstützt.');
  }

  const AC = window.AudioContext || window.webkitAudioContext;
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  let ctx, source, analyser, raf, autoStopId;
  let stopped = false;
  let lastResult = { envelope: [], durationMs: 0 };
  const levels = [];
  const startedAt = (typeof performance !== 'undefined' ? performance.now() : Date.now());

  // Aufräumen: Animationsschleife + Timer beenden, Tracks stoppen, Kontext schließen.
  function teardown() {
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    if (autoStopId) { clearTimeout(autoStopId); autoStopId = null; }
    try { source && source.disconnect(); } catch {}
    try { stream.getTracks().forEach((t) => t.stop()); } catch {}
    try { ctx && ctx.state !== 'closed' && ctx.close(); } catch {}
  }

  try {
    ctx = new AC();
    source = ctx.createMediaStreamSource(stream);
    analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
  } catch (err) {
    teardown();
    throw err;
  }

  const buf = new Float32Array(analyser.fftSize);

  function frame() {
    if (stopped) return;
    // Zeit-Domäne lesen und RMS bilden (Float-Pfad, mit Byte-Fallback).
    let rms = 0;
    if (typeof analyser.getFloatTimeDomainData === 'function') {
      analyser.getFloatTimeDomainData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
      rms = Math.sqrt(sum / buf.length);
    } else {
      const bytes = new Uint8Array(analyser.fftSize);
      analyser.getByteTimeDomainData(bytes);
      let sum = 0;
      for (let i = 0; i < bytes.length; i++) {
        const v = (bytes[i] - 128) / 128;
        sum += v * v;
      }
      rms = Math.sqrt(sum / bytes.length);
    }
    levels.push(rms);
    if (typeof onLevel === 'function') {
      try { onLevel(rms); } catch {}
    }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  function finish() {
    if (stopped) return lastResult;
    stopped = true;
    const durationMs = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - startedAt;
    teardown();
    lastResult = { envelope: levels.slice(), durationMs };
    if (typeof onStop === 'function') {
      try { onStop(lastResult); } catch {}
    }
    return lastResult;
  }

  // Sicherheitsnetz: spätestens nach maxMs selbst stoppen.
  autoStopId = setTimeout(() => { if (!stopped) finish(); }, Math.max(500, maxMs));

  return {
    stop() {
      return Promise.resolve(finish());
    },
    cancel() {
      stopped = true;
      teardown();
    },
  };
}
