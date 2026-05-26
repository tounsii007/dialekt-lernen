// WebGPU Voice-Visualizer — Minimal-Boilerplate.
//
// Status: Experimentell. WebGPU ist auf vielen Browsern noch nicht stabil
// verfügbar. Diese Datei initialisiert den Adapter/Device und rendert
// einen einfachen Frequenz-Placeholder (animierter Farbverlauf). Sobald
// echte Audio-Frequenzdaten verfügbar sind, kann der Fragment-Shader
// erweitert werden.
//
// API:
//   createVoiceVizWebGpu(canvas, opts?) → Promise<{ stop() }|null>
//     - liefert null, wenn WebGPU nicht verfügbar ist (Caller sollte
//       dann auf Canvas2D zurückfallen)
//     - liefert ein Handle mit stop(), das den RAF-Loop beendet

/**
 * Versucht WebGPU zu initialisieren und einen einfachen Visualizer zu starten.
 * @param {HTMLCanvasElement} canvas
 * @param {{ color?: string }} [opts]
 * @returns {Promise<{ stop(): void } | null>}
 */
export async function createVoiceVizWebGpu(canvas, opts = {}) {
  if (typeof navigator === 'undefined' || !navigator.gpu) {
    // Browser ohne WebGPU — Caller soll Canvas2D nutzen.
    return null;
  }
  if (!canvas || typeof canvas.getContext !== 'function') {
    return null;
  }

  let adapter, device, context, pipeline;
  try {
    adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
      console.warn('[voice-viz-webgpu] No GPU adapter available');
      return null;
    }
    device = await adapter.requestDevice();
  } catch (err) {
    console.warn('[voice-viz-webgpu] adapter/device init failed:', err);
    return null;
  }

  context = canvas.getContext('webgpu');
  if (!context) {
    console.warn('[voice-viz-webgpu] webgpu context not available on canvas');
    return null;
  }

  const format = navigator.gpu.getPreferredCanvasFormat
    ? navigator.gpu.getPreferredCanvasFormat()
    : 'bgra8unorm';

  try {
    context.configure({ device, format, alphaMode: 'premultiplied' });
  } catch (err) {
    console.warn('[voice-viz-webgpu] context.configure failed:', err);
    return null;
  }

  // Minimaler Pass-through-Shader: zeichnet ein Fullscreen-Triangle und
  // moduliert die Farbe per uniform `u_time`. Sobald echte Frequenzdaten
  // vorliegen, kann eine Storage-Buffer-Variante das ersetzen.
  const shaderCode = /* wgsl */ `
    struct VsOut {
      @builtin(position) pos: vec4f,
      @location(0) uv: vec2f,
    };

    @vertex
    fn vs(@builtin(vertex_index) i: u32) -> VsOut {
      var p = array<vec2f, 3>(
        vec2f(-1.0, -1.0),
        vec2f( 3.0, -1.0),
        vec2f(-1.0,  3.0),
      );
      var o: VsOut;
      o.pos = vec4f(p[i], 0.0, 1.0);
      o.uv  = (p[i] + vec2f(1.0)) * 0.5;
      return o;
    }

    struct Uni { t: f32, _pad0: f32, _pad1: f32, _pad2: f32 };
    @group(0) @binding(0) var<uniform> u: Uni;

    @fragment
    fn fs(in: VsOut) -> @location(0) vec4f {
      let band = sin(in.uv.x * 24.0 + u.t * 4.0) * 0.5 + 0.5;
      let glow = smoothstep(0.4, 0.6, band) * (0.5 + 0.5 * sin(u.t * 1.3));
      let c = vec3f(0.54, 0.36, 0.96) * glow + vec3f(0.05, 0.04, 0.12);
      return vec4f(c, 0.9);
    }
  `;

  let module;
  try {
    module = device.createShaderModule({ code: shaderCode });
    pipeline = device.createRenderPipeline({
      layout: 'auto',
      vertex:   { module, entryPoint: 'vs' },
      fragment: { module, entryPoint: 'fs', targets: [{ format }] },
      primitive: { topology: 'triangle-list' }
    });
  } catch (err) {
    console.warn('[voice-viz-webgpu] pipeline creation failed:', err);
    return null;
  }

  const uniBuf = device.createBuffer({
    size: 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
  });
  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: { buffer: uniBuf } }]
  });

  let raf = 0;
  let running = true;
  const start = (typeof performance !== 'undefined' ? performance.now() : Date.now());

  function frame() {
    if (!running) return;
    raf = requestAnimationFrame(frame);
    const t = ((typeof performance !== 'undefined' ? performance.now() : Date.now()) - start) / 1000;
    try {
      device.queue.writeBuffer(uniBuf, 0, new Float32Array([t, 0, 0, 0]));
      const tex = context.getCurrentTexture();
      const view = tex.createView();
      const encoder = device.createCommandEncoder();
      const pass = encoder.beginRenderPass({
        colorAttachments: [{
          view,
          clearValue: { r: 0, g: 0, b: 0, a: 0 },
          loadOp: 'clear',
          storeOp: 'store'
        }]
      });
      pass.setPipeline(pipeline);
      pass.setBindGroup(0, bindGroup);
      pass.draw(3, 1, 0, 0);
      pass.end();
      device.queue.submit([encoder.finish()]);
    } catch (err) {
      // Bei laufendem Tab-Wechsel kann der Texture-Acquire fehlschlagen —
      // wir loggen leise und versuchen es im nächsten Frame erneut.
      console.debug('[voice-viz-webgpu] frame skipped:', err && err.message);
    }
  }

  raf = requestAnimationFrame(frame);

  return {
    stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      try { uniBuf.destroy && uniBuf.destroy(); } catch {}
      try { device.destroy && device.destroy(); } catch {}
    }
  };
}

/**
 * Convenience: prüft Verfügbarkeit, ohne tatsächlich zu initialisieren.
 */
export function isWebGpuAvailable() {
  return typeof navigator !== 'undefined' && !!navigator.gpu;
}
