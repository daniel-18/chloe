export const clamp = (v: number, lo = 0, hi = 1): number =>
  v < lo ? lo : v > hi ? hi : v;

export const smooth = (e: number): number => {
  const t = clamp(e);
  return t * t * t * (t * (t * 6 - 15) + 10);
};

export const two = (n: number): string => String(n + 1).padStart(2, "0");

export interface FanPosition {
  tx: string;
  ty: number;
  rot: number;
  sc: number;
  z: number;
}

export function fanPos(n: number): FanPosition[] {
  const c = (n - 1) / 2;
  return Array.from({ length: n }, (_, i) => {
    const o = i - c;
    return {
      tx: `${(o * 13).toFixed(2)}vw`,
      ty: Math.abs(o) * 30,
      rot: o * 8,
      sc: 1.06 - Math.abs(o) * 0.05,
      z: 10 - Math.round(Math.abs(o)),
    };
  });
}
