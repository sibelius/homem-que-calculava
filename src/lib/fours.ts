export const EXPRESSIONS: Record<number, string> = {
  0: "44 − 44",
  1: "44 ÷ 44",
  2: "4÷4 + 4÷4",
  3: "(4 + 4 + 4) ÷ 4",
  4: "4 + (4 − 4) × 4",
  5: "(4 × 4 + 4) ÷ 4",
  6: "4 + (4 + 4) ÷ 4",
  7: "44 ÷ 4 − 4",
  8: "4 + 4 + 4 − 4",
  9: "4 + 4 + 4 ÷ 4",
  10: "(44 − 4) ÷ 4",
  11: "44 ÷ (√4 + √4)",
  12: "(44 + 4) ÷ 4",
  13: "44 ÷ 4 + √4",
  14: "4 × 4 − 4 + √4",
  15: "44 ÷ 4 + 4",
  16: "4 + 4 + 4 + 4",
  17: "4 × 4 + 4 ÷ 4",
  18: "4 × 4 + 4 − √4",
  19: "4! − 4 − 4 ÷ 4",
  20: "4 × (4 + 4 ÷ 4)",
  21: "4! − 4 + 4 ÷ 4",
  22: "4! − (4 + 4) ÷ 4",
  23: "4! − 4^(4 − 4)",
  24: "4 × 4 + 4 + 4",
  25: "4! + 4^(4 − 4)",
  26: "4! + (4 + 4) ÷ 4",
  27: "4! + 4 − 4 ÷ 4",
  28: "44 − 4 × 4",
  29: "4! + 4 + 4 ÷ 4",
  30: "4! + 4 + 4 − √4",
  31: "4! + (4! + 4) ÷ 4",
  32: "4 × 4 + 4 × 4",
  33: "4! + 4 + √4 ÷ .4",
  34: "4 × 4 × √4 + √4",
  35: "4! + 44 ÷ 4",
  36: "44 − 4 − 4",
  40: "44 − √4 − √4",
  42: "44 − 4 + √4",
  44: "44 + 4 − 4",
  48: "44 + √4 + √4",
  50: "44 + 4 + √4",
  64: "(4 + 4) × (4 + 4)",
  72: "44 + 4! + 4",
  96: "4! × 4 + 4 − 4",
  100: "44 ÷ .44",
};

export function toJs(expr: string) {
  return expr
    .replace(/÷/g, "/")
    .replace(/×/g, "*")
    .replace(/−/g, "-")
    .replace(/\^/g, "**")
    .replace(/(\d*\.?\d+)!/g, "f($1)")
    .replace(/√(\d*\.?\d+)/g, "s($1)");
}

const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));

export function evaluate(expr: string): number | null {
  const js = toJs(expr);
  if (!/^[\d.+\-*/()sf\s]*$/.test(js) || js.trim() === "") return null;
  try {
    const v = new Function("s", "f", `return (${js});`)(Math.sqrt, fact) as unknown;
    return typeof v === "number" && Number.isFinite(v) ? v : null;
  } catch {
    return null;
  }
}

export const countFours = (expr: string) => (expr.match(/4/g) ?? []).length;
export const usesOnlyFours = (expr: string) => !/[0-35-9]/.test(expr);
