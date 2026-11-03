export const COLS = 24;
export const ROWS = 15;
export const CELL = 40;
export const SPAWN = { c: 0, r: 7 };
export const GOAL = { c: 23, r: 12 };

export type Cell = { c: number; r: number };

const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

export function cellKey(c: number, r: number) {
  return `${c},${r}`;
}

export function findPath(blocked: Set<string>): Cell[] | null {
  const start = cellKey(SPAWN.c, SPAWN.r);
  const goal = cellKey(GOAL.c, GOAL.r);
  if (blocked.has(start) || blocked.has(goal)) return null;
  const open: { c: number; r: number; g: number; f: number }[] = [
    { ...SPAWN, g: 0, f: Math.abs(GOAL.c - SPAWN.c) + Math.abs(GOAL.r - SPAWN.r) },
  ];
  const came = new Map<string, string>();
  const gscore = new Map<string, number>([[start, 0]]);
  const closed = new Set<string>();
  while (open.length) {
    let bi = 0;
    for (let i = 1; i < open.length; i++) if (open[i].f < open[bi].f) bi = i;
    const cur = open.splice(bi, 1)[0];
    const ck = cellKey(cur.c, cur.r);
    if (closed.has(ck)) continue;
    closed.add(ck);
    if (ck === goal) {
      const path: Cell[] = [{ c: cur.c, r: cur.r }];
      let k = ck;
      while (came.has(k)) {
        k = came.get(k)!;
        const [c, r] = k.split(",").map(Number);
        path.push({ c, r });
      }
      return path.reverse();
    }
    for (const [dc, dr] of DIRS) {
      const nc = cur.c + dc;
      const nr = cur.r + dr;
      if (nc < 0 || nr < 0 || nc >= COLS || nr >= ROWS) continue;
      const nk = cellKey(nc, nr);
      if (blocked.has(nk) || closed.has(nk)) continue;
      const ng = cur.g + 1;
      if (ng < (gscore.get(nk) ?? 1e9)) {
        gscore.set(nk, ng);
        came.set(nk, ck);
        open.push({
          c: nc,
          r: nr,
          g: ng,
          f: ng + Math.abs(nc - GOAL.c) + Math.abs(nr - GOAL.r),
        });
      }
    }
  }
  return null;
}

export function pointsOf(cells: Cell[]) {
  return cells.map((c) => ({ x: c.c * CELL + CELL / 2, y: c.r * CELL + CELL / 2 }));
}

export const HEIGHT_MAX = 3;

export function emptyHeights() {
  return Array.from({ length: COLS * ROWS }, () => 0);
}

export function clampHeight(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(HEIGHT_MAX, Math.round(n)));
}

/** Height 0 adds nothing. Each step above 0 adds 30 range. */
export function rangeBonus(height: number) {
  return clampHeight(height) * 30;
}

export function cellHeight(heights: number[], c: number, r: number) {
  if (c < 0 || r < 0 || c >= COLS || r >= ROWS) return 0;
  return clampHeight(heights[r * COLS + c] ?? 0);
}

export type MapLayout = {
  id: string;
  name: string;
  blocked: string[];
  heights: number[];
};

function stampHill(heights: number[], cx: number, cy: number, peak: number) {
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const x = cx + dx;
      const y = cy + dy;
      if (x < 0 || y < 0 || x >= COLS || y >= ROWS) continue;
      const edge = Math.abs(dx) + Math.abs(dy) === 2;
      const h = edge ? Math.max(1, peak - 1) : peak;
      const i = y * COLS + x;
      heights[i] = Math.max(heights[i], h);
    }
  }
}

export function presetMaps(): MapLayout[] {
  const ridge = emptyHeights();
  for (let c = 2; c < COLS - 2; c++) {
    ridge[3 * COLS + c] = c % 6 === 2 ? 3 : 2;
    ridge[4 * COLS + c] = 1;
    ridge[10 * COLS + c] = c % 5 === 1 ? 3 : 2;
    ridge[11 * COLS + c] = 1;
  }
  const hills = emptyHeights();
  stampHill(hills, 6, 3, 3);
  stampHill(hills, 17, 4, 3);
  stampHill(hills, 8, 11, 2);
  stampHill(hills, 18, 10, 3);
  return [
    { id: "preset-flat", name: "潮坪", blocked: [], heights: emptyHeights() },
    { id: "preset-ridge", name: "月脊", blocked: [], heights: ridge },
    { id: "preset-hills", name: "雙丘", blocked: [], heights: hills },
  ];
}
