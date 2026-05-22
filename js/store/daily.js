// Seed für den „Ausdruck des Tages" — abhängig vom Datum, deterministisch.

export function getDailySeed() {
  const d = new Date();
  return d.getFullYear() * 1000 + (d.getMonth() + 1) * 50 + d.getDate();
}
