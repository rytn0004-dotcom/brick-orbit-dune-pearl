import { WAVES, type EnemyKind, type WaveDef, type WaveGroup } from "./content";
import { addPads, blankWalls, carve, gridFromCells, raster, type Cell, type Grid } from "./field";

export interface LevelDef {
  id: string;
  name: string;
  blurb: string;
  gold: number;
  lives: number;
  waves: WaveDef[];
  story: boolean;
  grid: Grid;
}

function carveLane(cells: ReturnType<typeof blankWalls>, y: number, dip: number) {
  const row = Math.max(12, Math.min(187, y));
  const deep = Math.max(row + 6, Math.min(196, row + dip));
  raster(cells, { c: 2, r: row }, { c: 197, r: row });
  raster(cells, { c: 24, r: row }, { c: 24, r: deep });
  raster(cells, { c: 24, r: deep }, { c: 176, r: deep });
  raster(cells, { c: 176, r: deep }, { c: 176, r: row });
  carve(cells, 2, row, "spawn");
  carve(cells, 197, row, "goal");
}

function buildGrid(lanes: { y: number; dip: number }[], links: Cell[][] = []) {
  const cells = blankWalls();
  for (const lane of lanes) carveLane(cells, lane.y, lane.dip);
  for (const link of links) {
    for (let i = 0; i < link.length - 1; i++) raster(cells, link[i], link[i + 1]);
  }
  addPads(cells);
  const grid = gridFromCells(cells);
  if (!grid) throw new Error("關卡地圖沒有入口或終點");
  return grid;
}

function idx(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}

function group(
  kind: EnemyKind,
  count: number,
  interval: number,
  delay: number,
  spawns: number[],
  goals: number[],
): WaveGroup {
  return { kind, count, interval, delay, spawns, goals };
}

function generated(count: number, spawns: number, goals: number, title: string): WaveDef[] {
  const doors = idx(spawns);
  const ends = idx(goals);
  const waves: WaveDef[] = [];
  for (let i = 0; i < count; i++) {
    const n = i + 1;
    const groups: WaveGroup[] = [];
    let name = `${title} ${n}`;
    let line = doors.length > 1 ? "這一波會平均拆進每一個入口。" : "潮徑很長。先把樁立在你守得住的那一段。";
    if (n === count) {
      name = "潮心";
      groups.push(group("swift", 8 + spawns, 0.42, 0.2, doors, ends));
      groups.push(group("core", 1, 1, 3.2, [0], [0]));
      groups.push(group("hammer", Math.max(2, spawns), 1.15, 4.4, doors, ends));
      line = "潮心走第一個入口。錘骸會平均砸向每個入口上的潮閘。";
    } else if (n % 5 === 0) {
      name = "近戰特攻";
      groups.push(group("claw", 3 + spawns, 0.72, 0.25, doors, ends));
      groups.push(group("hammer", 1 + Math.floor(spawns / 2), 1.15, 1.3, doors, ends));
      groups.push(group("shell", 3, 1, 0.4, doors, ends));
      line = "裂爪和錘骸會停下來砸樁、砸潮閘。多入口時牠們被平均拆開。";
    } else if (n % 4 === 2 && spawns > 1) {
      const only = (Math.floor(n / 2) - 1) % spawns;
      name = `入口 ${only + 1}`;
      groups.push(group("swift", 6 + n, 0.46, 0.2, [only], ends));
      groups.push(group("wisp", 8, 0.55, 0.35, [only], ends));
      line = `這一波只從入口 ${only + 1} 進來，終點仍會平均分配。`;
    } else {
      groups.push(group("wisp", 6 + n, Math.max(0.32, 0.82 - n * 0.02), 0.18, doors, ends));
      if (n >= 3) groups.push(group("swift", 3 + Math.floor(n / 2), 0.5, 0.55, doors, ends));
      if (n >= 6) groups.push(group("shell", 2 + Math.floor(n / 5), 1.05, 0.9, doors, ends));
    }
    waves.push({ id: n, name, line, groups });
  }
  return waves;
}

export const LEVELS: LevelDef[] = [
  {
    id: "levee",
    name: "長堤",
    blurb: "一條橫貫澄洲的長堤，中段有一條繞遠的退路。故事十二波。",
    gold: 240,
    lives: 20,
    story: true,
    waves: WAVES,
    grid: buildGrid([{ y: 100, dip: 18 }]),
  },
  {
    id: "twin",
    name: "雙潮口",
    blurb: "南北兩個入口，終點各一。大多數波次會把兵平均拆開。",
    gold: 280,
    lives: 22,
    story: false,
    waves: generated(12, 2, 2, "雙潮"),
    grid: buildGrid([
      { y: 70, dip: 14 },
      { y: 130, dip: 14 },
    ]),
  },
  {
    id: "three",
    name: "三門夜",
    blurb: "三個入口同時壓過來。有幾波只走其中一道門。",
    gold: 320,
    lives: 24,
    story: false,
    waves: generated(14, 3, 3, "三門"),
    grid: buildGrid([
      { y: 48, dip: 12 },
      { y: 100, dip: 12 },
      { y: 152, dip: 12 },
    ]),
  },
  {
    id: "ford",
    name: "對岸",
    blurb: "兩條互不相連的潮徑。守住你指定的那個終點。",
    gold: 300,
    lives: 22,
    story: false,
    waves: generated(14, 2, 2, "對岸"),
    grid: buildGrid([
      { y: 60, dip: 16 },
      { y: 150, dip: 16 },
    ]),
  },
  {
    id: "conflux",
    name: "匯流",
    blurb: "兩條潮徑在地圖中段有一座橋。閘門可以把兵逼去另一條。",
    gold: 340,
    lives: 24,
    story: false,
    waves: generated(16, 2, 2, "匯流"),
    grid: buildGrid(
      [
        { y: 68, dip: 14 },
        { y: 132, dip: 14 },
      ],
      [
        [
          { c: 100, r: 68 },
          { c: 100, r: 132 },
        ],
      ],
    ),
  },
  {
    id: "four",
    name: "四門終潮",
    blurb: "四個入口、四個終點。最長的一夜。",
    gold: 380,
    lives: 26,
    story: false,
    waves: generated(16, 4, 4, "四門"),
    grid: buildGrid([
      { y: 36, dip: 10 },
      { y: 78, dip: 10 },
      { y: 122, dip: 10 },
      { y: 164, dip: 10 },
    ]),
  },
];

export function levelById(id: string) {
  return LEVELS.find((level) => level.id === id) ?? LEVELS[0];
}
