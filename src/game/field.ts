import { COLS, ROWS } from "./content";

export type CellKind = "wall" | "open" | "pad" | "spawn" | "goal";

export interface Cell {
  c: number;
  r: number;
}

export interface Grid {
  cells: CellKind[];
  spawns: Cell[];
  goals: Cell[];
}

const KIND_CHAR: Record<CellKind, string> = {
  wall: "W",
  open: ".",
  pad: "P",
  spawn: "S",
  goal: "G",
};

export function keyOf(cell: Cell) {
  return `${cell.c},${cell.r}`;
}

export function inBounds(c: number, r: number) {
  return c >= 0 && r >= 0 && c < COLS && r < ROWS;
}

export function isBorder(c: number, r: number) {
  return c === 0 || r === 0 || c === COLS - 1 || r === ROWS - 1;
}

export function blankWalls(): CellKind[] {
  return new Array(COLS * ROWS).fill("wall");
}

export function carve(cells: CellKind[], c: number, r: number, kind: CellKind = "open") {
  if (!inBounds(c, r) || isBorder(c, r)) return;
  cells[r * COLS + c] = kind;
}

export function raster(cells: CellKind[], a: Cell, b: Cell, kind: CellKind = "open") {
  let c = a.c;
  let r = a.r;
  carve(cells, c, r, kind);
  while (c !== b.c || r !== b.r) {
    if (c !== b.c) c += Math.sign(b.c - c);
    else r += Math.sign(b.r - r);
    carve(cells, c, r, kind);
  }
}

export function addPads(cells: CellKind[]) {
  const marks: Cell[] = [];
  for (let r = 1; r < ROWS - 1; r++) {
    for (let c = 1; c < COLS - 1; c++) {
      const kind = cells[r * COLS + c];
      if (kind !== "open" && kind !== "spawn" && kind !== "goal") continue;
      for (const [dc, dr] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ] as const) {
        const nc = c + dc;
        const nr = r + dr;
        if (isBorder(nc, nr)) continue;
        if (cells[nr * COLS + nc] === "wall") marks.push({ c: nc, r: nr });
      }
    }
  }
  for (const cell of marks) {
    if (cells[cell.r * COLS + cell.c] === "wall") cells[cell.r * COLS + cell.c] = "pad";
  }
}

export function gridFromCells(cells: CellKind[]): Grid | null {
  const spawns: Cell[] = [];
  const goals: Cell[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const kind = cells[r * COLS + c];
      if (isBorder(c, r) && kind !== "wall") return null;
      if (kind === "spawn") spawns.push({ c, r });
      if (kind === "goal") goals.push({ c, r });
    }
  }
  if (spawns.length === 0 || goals.length === 0) return null;
  return { cells, spawns, goals };
}

export function parseRows(rows: readonly string[]): Grid | null {
  if (rows.length !== ROWS) return null;
  const cells = blankWalls();
  for (let r = 0; r < ROWS; r++) {
    const row = rows[r];
    if (!row || row.length !== COLS) return null;
    for (let c = 0; c < COLS; c++) {
      const ch = row[c];
      const kind: CellKind | null =
        ch === "W" ? "wall" : ch === "." ? "open" : ch === "P" ? "pad" : ch === "S" ? "spawn" : ch === "G" ? "goal" : null;
      if (!kind) return null;
      cells[r * COLS + c] = kind;
    }
  }
  return gridFromCells(cells);
}

export function rowsFromGrid(grid: Grid): string[] {
  const rows: string[] = [];
  for (let r = 0; r < ROWS; r++) {
    let line = "";
    for (let c = 0; c < COLS; c++) line += KIND_CHAR[grid.cells[r * COLS + c]];
    rows.push(line);
  }
  return rows;
}

function walkable(kind: CellKind) {
  return kind === "open" || kind === "spawn" || kind === "goal";
}

class Heap {
  private data: number[] = [];
  constructor(private dist: Float64Array) {}
  get size() {
    return this.data.length;
  }
  push(value: number) {
    const data = this.data;
    data.push(value);
    let i = data.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.dist[data[p]] <= this.dist[data[i]]) break;
      const tmp = data[p];
      data[p] = data[i];
      data[i] = tmp;
      i = p;
    }
  }
  pop() {
    const data = this.data;
    const out = data[0];
    const last = data.pop();
    if (data.length && last !== undefined) {
      data[0] = last;
      let i = 0;
      for (;;) {
        const l = i * 2 + 1;
        const r = l + 1;
        let m = i;
        if (l < data.length && this.dist[data[l]] < this.dist[data[m]]) m = l;
        if (r < data.length && this.dist[data[r]] < this.dist[data[m]]) m = r;
        if (m === i) break;
        const tmp = data[m];
        data[m] = data[i];
        data[i] = tmp;
        i = m;
      }
    }
    return out;
  }
}

export function routeTo(
  grid: Grid,
  blocked: Set<string>,
  costly: Set<string>,
  from: Cell,
  goals: readonly Cell[],
): { path: Cell[]; goal: Cell } | null {
  if (goals.length === 0 || !inBounds(from.c, from.r)) return null;
  const n = COLS * ROWS;
  const dist = new Float64Array(n);
  const prev = new Int32Array(n);
  dist.fill(Number.POSITIVE_INFINITY);
  prev.fill(-1);
  const start = from.r * COLS + from.c;
  const goalSet = new Set(goals.map((cell) => cell.r * COLS + cell.c));
  dist[start] = 0;
  const heap = new Heap(dist);
  heap.push(start);
  const seen = new Uint8Array(n);
  let found = -1;
  const dirs = [1, 0, -1, 0, 0, 1, 0, -1];
  while (heap.size) {
    const u = heap.pop();
    if (seen[u]) continue;
    seen[u] = 1;
    if (goalSet.has(u)) {
      found = u;
      break;
    }
    const c = u % COLS;
    const r = (u / COLS) | 0;
    for (let d = 0; d < 4; d++) {
      const nc = c + dirs[d * 2];
      const nr = r + dirs[d * 2 + 1];
      if (!inBounds(nc, nr)) continue;
      const nk = nr * COLS + nc;
      if (!walkable(grid.cells[nk])) continue;
      const id = `${nc},${nr}`;
      if (blocked.has(id)) continue;
      const step = costly.has(id) ? 6 : 1;
      const nd = dist[u] + step;
      if (nd < dist[nk]) {
        dist[nk] = nd;
        prev[nk] = u;
        heap.push(nk);
      }
    }
  }
  if (found < 0 || !Number.isFinite(dist[found])) return null;
  const path: Cell[] = [];
  let cursor = found;
  while (cursor >= 0) {
    path.push({ c: cursor % COLS, r: (cursor / COLS) | 0 });
    if (cursor === start) break;
    cursor = prev[cursor];
  }
  path.reverse();
  if (path[0]?.c !== from.c || path[0]?.r !== from.r) return null;
  return { path, goal: { c: found % COLS, r: (found / COLS) | 0 } };
}

export function shortest(grid: Grid, blocked: Set<string>, costly: Set<string>, from: Cell, to: Cell) {
  const found = routeTo(grid, blocked, costly, from, [to]);
  return found?.path ?? null;
}
