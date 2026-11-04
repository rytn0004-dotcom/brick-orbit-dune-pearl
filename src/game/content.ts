export const COLS = 200;
export const ROWS = 200;
export const CELL = 32;
export const WORLD_W = COLS * CELL;
export const WORLD_H = ROWS * CELL;

export const START_GOLD = 200;
export const START_LIVES = 20;

export const WAYPOINTS: ReadonlyArray<readonly [number, number]> = [
  [0, 1],
  [4, 1],
  [4, 4],
  [1, 4],
  [1, 6],
  [7, 6],
  [7, 2],
  [10, 2],
  [10, 6],
  [11, 6],
];

export const BLOCKED = new Set(["0,0", "11,0", "0,7", "10,0", "11,7"]);

export type EnemyKind = "wisp" | "swift" | "shell" | "core" | "claw" | "hammer";
export type AimMode = "first" | "close" | "last" | "strong";
export type ShotStyle = "bolt" | "chain";

export interface EnemyDef {
  kind: EnemyKind;
  name: string;
  hp: number;
  speed: number;
  armor: number;
  gold: number;
  leak: number;
  radius: number;
  art: string;
  blurb: string;
  melee: number;
  meleeEvery: number;
}

export const ENEMIES: Record<EnemyKind, EnemyDef> = {
  wisp: {
    kind: "wisp",
    name: "游絲",
    hp: 44,
    speed: 52,
    armor: 0,
    gold: 18,
    leak: 1,
    radius: 16,
    art: "/art/echo-wisp.png",
    blurb: "最弱的殘響。基礎 18 金，後面的波次會掉得更多。",
    melee: 0,
    meleeEvery: 1,
  },
  swift: {
    kind: "swift",
    name: "疾影",
    hp: 36,
    speed: 96,
    armor: 0,
    gold: 32,
    leak: 1,
    radius: 16,
    art: "/art/echo-swift.png",
    blurb: "比游絲難纏，賞金也更高。基礎 32 金。",
    melee: 0,
    meleeEvery: 1,
  },
  shell: {
    kind: "shell",
    name: "鎧殼",
    hp: 160,
    speed: 34,
    armor: 6,
    gold: 58,
    leak: 1,
    radius: 20,
    art: "",
    blurb: "厚血高甲。基礎 58 金，是前中期最肥的目標。",
    melee: 0,
    meleeEvery: 1,
  },
  core: {
    kind: "core",
    name: "虛潮之核",
    hp: 3400,
    speed: 22,
    armor: 8,
    gold: 420,
    leak: 6,
    radius: 30,
    art: "",
    blurb: "全場最厚的潮心。基礎 420 金，漏進門會一次抽走大量生命。",
    melee: 0,
    meleeEvery: 1,
  },
  claw: {
    kind: "claw",
    name: "裂爪",
    hp: 72,
    speed: 62,
    armor: 0,
    gold: 44,
    leak: 1,
    radius: 15,
    art: "",
    blurb: "近戰特攻。走到樁或潮閘旁邊會停下來砸，砸碎之後路會重新接通。",
    melee: 6,
    meleeEvery: 0.75,
  },
  hammer: {
    kind: "hammer",
    name: "錘骸",
    hp: 240,
    speed: 30,
    armor: 4,
    gold: 78,
    leak: 2,
    radius: 20,
    art: "",
    blurb: "慢、厚、賞金高。專門砸潮閘和立樁，基礎 78 金。",
    melee: 14,
    meleeEvery: 1.05,
  },
};

export type TraitId =
  | "rapid"
  | "heavy"
  | "slow"
  | "burn"
  | "root"
  | "shield"
  | "splash"
  | "chain"
  | "pierce";

export const TRAITS: Record<TraitId, { name: string; hint: string }> = {
  rapid: { name: "速射", hint: "攻擊很密，適合收拾成群的脆皮。" },
  heavy: { name: "高傷害", hint: "單發傷害高，殘血時再補一刀。" },
  slow: { name: "減速", hint: "命中後降低移動速度。" },
  burn: { name: "燃燒", hint: "留下灼燒，持續扣血，這段傷害無視鎧甲。" },
  root: { name: "阻擋", hint: "短暫停住腳步。剛被放開的殘響會短暫免疫。" },
  shield: { name: "護盾", hint: "每次攻擊為城門加一點護盾，漏怪時先扣盾。" },
  splash: { name: "濺射", hint: "爆炸打中範圍內所有殘響。" },
  chain: { name: "連鎖", hint: "傷害會跳到附近的其他殘響。" },
  pierce: { name: "破甲", hint: "直接傷害不吃鎧甲減免。" },
};

export interface TowerDef {
  id: string;
  name: string;
  title: string;
  cost: number;
  range: number;
  damage: number;
  rate: number;
  splash: number;
  slow: number;
  slowDur: number;
  chain: number;
  chainFalloff: number;
  style: ShotStyle;
  pierce: boolean;
  halfArmor: boolean;
  execute: number;
  burn: number;
  burnDur: number;
  root: number;
  shieldOnHit: number;
  traits: TraitId[];
  color: string;
  art: string;
  unlockWave: number;
  blurb: string;
  join: string;
  story: string;
}

export const TOWERS: TowerDef[] = [
  {
    id: "lingfeng",
    name: "泠風",
    title: "風鈴斥候",
    cost: 55,
    range: 150,
    damage: 9,
    rate: 1.55,
    splash: 0,
    slow: 0.82,
    slowDur: 0.9,
    chain: 0,
    chainFalloff: 1,
    style: "bolt",
    pierce: false,
    halfArmor: false,
    execute: 1,
    burn: 0,
    burnDur: 0,
    root: 0,
    shieldOnHit: 0,
    traits: ["slow"],
    color: "#7ed9c4",
    art: "/art/lingfeng.png",
    unlockWave: 1,
    blurb: "減速。中距穩射，讓殘響在彎道多停一下。",
    join: "她把風鈴塞進你手心：響一聲，就是還有人在城上。",
    story:
      "澄洲外圍最後的風鈴斥候。悲潮第一年，她的隊伍在裂谷邊失散，只剩這串鈴還認得回家的頻率。她叫你旅律——一種能把別人的頻率編成樁的人。你不記得這稱號，她也不打算再解釋第二次。",
  },
  {
    id: "yanque",
    name: "焰雀",
    title: "城衛槍手",
    cost: 85,
    range: 172,
    damage: 13,
    rate: 2.35,
    splash: 0,
    slow: 1,
    slowDur: 0,
    chain: 0,
    chainFalloff: 1,
    style: "bolt",
    pierce: false,
    halfArmor: false,
    execute: 1,
    burn: 0.5,
    burnDur: 2.2,
    root: 0,
    shieldOnHit: 0,
    traits: ["rapid", "burn"],
    color: "#e07848",
    art: "/art/yanque.png",
    unlockWave: 1,
    blurb: "速射、燃燒。槍火密，還會留下無視鎧甲的灼燒。",
    join: "他踢開一具碎掉的殘響：東垛我守。樁別立在潮徑上。",
    story:
      "城衛隊最吵的槍手，欠城西麵攤一條命——老闆在上一回潮汛把他從門洞裡拖出來。嘴上說不信頻率，槍口卻總打在殘響的核心。疤是自己人的火藥留下的，他不讓人問。",
  },
  {
    id: "shuangjian",
    name: "霜箋",
    title: "觀象學士",
    cost: 110,
    range: 146,
    damage: 7,
    rate: 1.05,
    splash: 0,
    slow: 0.48,
    slowDur: 2.3,
    chain: 0,
    chainFalloff: 1,
    style: "bolt",
    pierce: false,
    halfArmor: false,
    execute: 1,
    burn: 0,
    burnDur: 0,
    root: 0,
    shieldOnHit: 0,
    traits: ["slow"],
    color: "#9fd4e8",
    art: "/art/shuangjian.png",
    unlockWave: 3,
    blurb: "減速。寒譜把腳步壓到一半以下，給別人時間輸出。",
    join: "學士展開冰紋卷軸：牠們的殼是凝住的悲鳴。冷下來，就慢。",
    story:
      "觀象臺的學士，把悲潮錄成可以計算的寒譜。人不善戰，卷軸很善戰。城裡的孩子怕他，因為他看人的眼神像在量一條還會不會斷的弦。",
  },
  {
    id: "chiren",
    name: "赤刃",
    title: "血舞刀客",
    cost: 130,
    range: 96,
    damage: 32,
    rate: 1.32,
    splash: 0,
    slow: 1,
    slowDur: 0,
    chain: 0,
    chainFalloff: 1,
    style: "bolt",
    pierce: true,
    halfArmor: false,
    execute: 1.55,
    burn: 0,
    burnDur: 0,
    root: 0.55,
    shieldOnHit: 0,
    traits: ["heavy", "pierce", "root"],
    color: "#c45b6a",
    art: "/art/chiren.png",
    unlockWave: 5,
    blurb: "高傷害、破甲、阻擋。近身砍開鎧殼，並短暫停步。",
    join: "刀客舔掉唇邊的血：鎧殼吃槍子。我來近處切開頻率。",
    story:
      "曾是夜歸的斥候。為了切開一隻鎧殼，她把半條命押進雙刃，左眼從此用瓷片蓋住。她說痛是頻率還在的證明。嵐戟沒有把她除名，只是不再派她出遠門。",
  },
  {
    id: "leiou",
    name: "雷偶",
    title: "縛線傀師",
    cost: 175,
    range: 160,
    damage: 16,
    rate: 0.92,
    splash: 0,
    slow: 1,
    slowDur: 0,
    chain: 3,
    chainFalloff: 0.62,
    style: "chain",
    pierce: false,
    halfArmor: false,
    execute: 1,
    burn: 0,
    burnDur: 0,
    root: 0,
    shieldOnHit: 0,
    traits: ["chain"],
    color: "#d2c15a",
    art: "/art/leiou.png",
    unlockWave: 7,
    blurb: "連鎖。雷會跳向附近的殘響，一隻比一隻輕。",
    join: "傀師的絲線亮起：一隻不夠看。讓雷沿著線走。",
    story:
      "製偶師。每條絲線都綁著一封沒送出去的信，收信的人多半已經不在城裡。肩上的瓷偶負責記得那些名字。他說雷不是懲罰，是讓信終於送到的方式。",
  },
  {
    id: "lanji",
    name: "嵐戟",
    title: "夜歸統帥",
    cost: 250,
    range: 190,
    damage: 30,
    rate: 0.62,
    splash: 54,
    slow: 1,
    slowDur: 0,
    chain: 0,
    chainFalloff: 1,
    style: "bolt",
    pierce: false,
    halfArmor: true,
    execute: 1,
    burn: 0,
    burnDur: 0,
    root: 0,
    shieldOnHit: 0,
    traits: ["splash"],
    color: "#8fbf7a",
    art: "/art/lanji.png",
    unlockWave: 9,
    blurb: "濺射。一擊覆蓋一小圈，鎧甲只吃一半。",
    join: "統帥把長戟頓在城磚上：我從前線回來，不是為了看燈滅。",
    story:
      "夜歸軍統帥，在裂谷前線守了九年，戟上的缺口比勳章多。這回回城，是因為潮聲變了調——不再像獸，像一句還沒唱完的喪歌。他認得赤刃的刀，也不點破。",
  },
  {
    id: "chimou",
    name: "熾謀",
    title: "炎策軍師",
    cost: 320,
    range: 178,
    damage: 52,
    rate: 0.4,
    splash: 82,
    slow: 1,
    slowDur: 0,
    chain: 0,
    chainFalloff: 1,
    style: "bolt",
    pierce: false,
    halfArmor: true,
    execute: 1,
    burn: 0.42,
    burnDur: 3,
    root: 0,
    shieldOnHit: 0,
    traits: ["heavy", "burn", "splash"],
    color: "#e08a3a",
    art: "/art/chimou.png",
    unlockWave: 10,
    blurb: "高傷害、燃燒、濺射。慢速大火球，炸開後還在燒。",
    join: "軍師合上扇：別省金幣。省了，就會死人。",
    story:
      "城主身邊的炎策。扇子一合，就是一場燒掉退路的計劃。她怕的不是殘響，是城裡的人開始把投降說成休息。焰雀嫌她冷血，每次交火仍站在她算過的那個垛口。",
  },
  {
    id: "chaoxi",
    name: "潮汐",
    title: "澄洲城主",
    cost: 440,
    range: 214,
    damage: 64,
    rate: 0.48,
    splash: 100,
    slow: 0.7,
    slowDur: 1.5,
    chain: 0,
    chainFalloff: 1,
    style: "bolt",
    pierce: true,
    halfArmor: false,
    execute: 1,
    burn: 0,
    burnDur: 0,
    root: 0,
    shieldOnHit: 1,
    traits: ["shield", "slow", "splash", "pierce"],
    color: "#f0e2b0",
    art: "/art/chaoxi.png",
    unlockWave: 11,
    blurb: "護盾、減速、濺射、破甲。命中為城門積盾，漏怪先扣盾。",
    join: "城主把潮玉印送到你掌心：用在最後，不要用在炫耀。",
    story:
      "澄洲城主。印裡封著整座城還能震動的頻率。銀髮與獸耳是城裡認得的印記。傳說她不老，其實是一次次把自己的歲月借給城牆。",
  },
];

export const GATE = {
  id: "gate",
  name: "潮閘",
  cost: 40,
  hp: 140,
  blurb: "堵住一格。殘響會改走還通得過的最短路。外框是地圖邊界，封死唯一的路時放不下去。",
};

export const TOWER_BY_ID: Record<string, TowerDef> = Object.fromEntries(
  TOWERS.map((t) => [t.id, t]),
);

export interface WaveGroup {
  kind: EnemyKind;
  count: number;
  interval: number;
  delay: number;
  customId?: string;
  spawns?: number[];
  goals?: number[];
}

export type SkillId = "regen" | "split" | "sprint" | "aura" | "shield" | "stealth";

export const SKILLS: { id: SkillId; name: string; hint: string }[] = [
  { id: "regen", name: "再生", hint: "每秒回復少量生命。" },
  { id: "split", name: "分裂", hint: "死後裂成兩隻較小的游絲。" },
  { id: "sprint", name: "疾衝", hint: "每隔幾秒突然加速。" },
  { id: "aura", name: "護潮", hint: "讓附近殘響少吃兩成傷害。" },
  { id: "shield", name: "潮盾", hint: "進場帶著一層護盾。" },
  { id: "stealth", name: "潛潮", hint: "滿血且離樁遠時，樁鎖不到牠。" },
];

export interface MonsterSpec {
  id: string;
  name: string;
  hp: number;
  speed: number;
  armor: number;
  gold: number;
  leak: number;
  radius: number;
  melee: number;
  meleeEvery: number;
  skills: SkillId[];
  color: string;
}

export interface WaveDef {
  id: number;
  name: string;
  line: string;
  groups: WaveGroup[];
}

export const WAVES: WaveDef[] = [
  {
    id: 1,
    name: "潮聲初起",
    line: "泠風：潮徑亮了。樁立在彎道內側，讓牠們多挨兩下再進門。",
    groups: [{ kind: "wisp", count: 8, interval: 1.15, delay: 0.35 }],
  },
  {
    id: 2,
    name: "細響成列",
    line: "焰雀：第二陣比第一陣密。金幣捏在手裡不會自己變槍。",
    groups: [{ kind: "wisp", count: 12, interval: 0.78, delay: 0.2 }],
  },
  {
    id: 3,
    name: "疾影夾縫",
    line: "霜箋：快的先拖慢。寒譜給疾影，槍口留給還在爬的游絲。",
    groups: [
      { kind: "wisp", count: 6, interval: 0.85, delay: 0.2 },
      { kind: "swift", count: 6, interval: 1.05, delay: 1.6 },
    ],
  },
  {
    id: 4,
    name: "風口再裂",
    line: "泠風：裂爪會停下來砸樁。潮閘放在亮著的捷徑上，牠們就得繞路。",
    groups: [
      { kind: "swift", count: 8, interval: 0.62, delay: 0.25 },
      { kind: "wisp", count: 8, interval: 0.7, delay: 0.8 },
    ],
  },
  {
    id: 5,
    name: "鎧殼推進",
    line: "赤刃：鎧殼吃槍子。讓我站得夠近，殼就只是殼。",
    groups: [
      { kind: "shell", count: 5, interval: 1.55, delay: 0.35 },
      { kind: "wisp", count: 8, interval: 0.7, delay: 1 },
    ],
  },
  {
    id: 6,
    name: "雙線壓境",
    line: "焰雀：鎧殼配疾影。誰漏了一隻，城門就會響。",
    groups: [
      { kind: "shell", count: 6, interval: 1.35, delay: 0.3 },
      { kind: "swift", count: 8, interval: 0.58, delay: 1.2 },
    ],
  },
  {
    id: 7,
    name: "絲線雷雨",
    line: "雷偶：擠在一起的時候，雷比槍便宜。",
    groups: [
      { kind: "wisp", count: 12, interval: 0.4, delay: 0.15 },
      { kind: "swift", count: 7, interval: 0.55, delay: 0.8 },
      { kind: "shell", count: 4, interval: 1.7, delay: 1.5 },
    ],
  },
  {
    id: 8,
    name: "城垛告急",
    line: "霜箋：錘骸近戰。先打死砸門的，潮閘碎了，路就會改回來。",
    groups: [
      { kind: "shell", count: 8, interval: 1.15, delay: 0.25 },
      { kind: "swift", count: 10, interval: 0.48, delay: 0.6 },
    ],
  },
  {
    id: 9,
    name: "夜歸回援",
    line: "嵐戟：厚的一波交給槍林。彎道不要空著。",
    groups: [
      { kind: "shell", count: 7, interval: 1.1, delay: 0.25 },
      { kind: "wisp", count: 12, interval: 0.38, delay: 0.4 },
      { kind: "swift", count: 8, interval: 0.5, delay: 1.8 },
    ],
  },
  {
    id: 10,
    name: "焚扇既出",
    line: "熾謀：虛潮要現形了。現在省下的金幣，等一下會變成屍體。",
    groups: [
      { kind: "swift", count: 12, interval: 0.4, delay: 0.2 },
      { kind: "shell", count: 8, interval: 1, delay: 0.7 },
    ],
  },
  {
    id: 11,
    name: "城印解封",
    line: "潮汐：澄洲的頻率借你。潮心之前的這一陣，是試印。",
    groups: [
      { kind: "shell", count: 8, interval: 0.95, delay: 0.2 },
      { kind: "swift", count: 10, interval: 0.4, delay: 0.45 },
      { kind: "wisp", count: 12, interval: 0.32, delay: 1 },
    ],
  },
  {
    id: 12,
    name: "虛潮之核",
    line: "潮心之外還有錘骸。潮閘可以逼牠們繞，但別把唯一的路封死。",
    groups: [
      { kind: "swift", count: 6, interval: 0.5, delay: 0.2 },
      { kind: "core", count: 1, interval: 1, delay: 3.2 },
      { kind: "shell", count: 5, interval: 1.35, delay: 4.2 },
    ],
  },
];

export const PROLOGUE: { speaker: string; text: string }[] = [
  {
    speaker: "澄洲",
    text: "悲潮之後，天空留下一條不會癒合的縫。縫裡走出的東西沒有心，只會沿著潮徑走向最大的活頻率——城。人們叫它們殘響。",
  },
  {
    speaker: "泠風",
    text: "你倒在外垛上，脈搏卻像一座城。我是斥候泠風。如果你真是旅律，就把我們的頻率編成樁，守住這條路。你的名字可以以後再想。",
  },
  {
    speaker: "焰雀",
    text: "城衛焰雀。潮徑上的捷徑可以立潮閘，殘響會改走還通的最短路。封死唯一的路就放不下去。漏進燈下的每一隻，城裡就少一盞燈。",
  },
];

export const ENDING = {
  winTitle: "城門還亮著",
  win: "虛潮之核碎成無聲的鹽。潮徑暗下去，像一條終於閉口的河。泠風問你記不記得自己的名字。你搖頭。城主潮汐把印按回城磚：「名字先寄在澄洲。潮還會再來，而這座城已經學會你的節奏。」",
  loseTitle: "城燈滅了",
  lose: "殘響漫過門檻時，長街的燈一盞盞熄掉。泠風的風鈴只響了一半。她的聲音斷在風裡：頻率不會真的死。還能重來。",
  endlessTitle: "潮還沒有盡頭",
  endless: "這一潮沒有最後一波。城燈滅的時候，澄洲記住你守到的那一陣。頻率還在，還能再走深一點。",
};

export interface PathGeom {
  pts: { x: number; y: number }[];
  segLens: number[];
  total: number;
  cells: Set<string>;
}

export function buildPath(): PathGeom {
  const pts = WAYPOINTS.map(([c, r]) => ({
    x: (c + 0.5) * CELL,
    y: (r + 0.5) * CELL,
  }));
  const segLens: number[] = [];
  let total = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const len = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
    segLens.push(len);
    total += len;
  }
  const cells = new Set<string>();
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    let c = WAYPOINTS[i][0];
    let r = WAYPOINTS[i][1];
    const c1 = WAYPOINTS[i + 1][0];
    const r1 = WAYPOINTS[i + 1][1];
    const dc = Math.sign(c1 - c);
    const dr = Math.sign(r1 - r);
    cells.add(`${c},${r}`);
    while (c !== c1 || r !== r1) {
      c += dc;
      r += dr;
      cells.add(`${c},${r}`);
    }
  }
  return { pts, segLens, total, cells };
}

export const PATH = buildPath();

export function pointAt(progress: number): { x: number; y: number } {
  let d = Math.max(0, Math.min(progress, PATH.total));
  for (let i = 0; i < PATH.segLens.length; i++) {
    const seg = PATH.segLens[i];
    if (d <= seg || i === PATH.segLens.length - 1) {
      const t = seg === 0 ? 0 : Math.min(1, d / seg);
      const a = PATH.pts[i];
      const b = PATH.pts[i + 1];
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }
    d -= seg;
  }
  const last = PATH.pts[PATH.pts.length - 1];
  return { x: last.x, y: last.y };
}

export function endlessWave(index: number): WaveDef {
  const n = index + 1;
  const groups: WaveGroup[] = [];
  if (n % 10 === 0) {
    groups.push(
      { kind: "shell", count: 4 + Math.floor(n / 5), interval: 0.85, delay: 0.25 },
      { kind: "hammer", count: 2, interval: 1.25, delay: 0.7 },
      { kind: "core", count: 1, interval: 1, delay: 2.6 },
    );
  } else if (n % 5 === 0) {
    groups.push(
      { kind: "swift", count: 6, interval: 0.45, delay: 0.2 },
      { kind: "claw", count: 4 + Math.floor(n / 5), interval: 0.7, delay: 0.45 },
      { kind: "hammer", count: 2, interval: 1.2, delay: 1.5 },
    );
  } else {
    groups.push({
      kind: "wisp",
      count: 6 + n,
      interval: Math.max(0.32, 0.95 - n * 0.03),
      delay: 0.2,
    });
    if (n >= 2) {
      groups.push({ kind: "swift", count: 3 + Math.floor(n / 2), interval: 0.55, delay: 0.55 });
    }
    if (n >= 4) {
      groups.push({ kind: "shell", count: 2 + Math.floor(n / 3), interval: 1.05, delay: 1 });
    }
  }
  const name = n % 10 === 0 ? "潮心再臨" : n % 5 === 0 ? "近戰特攻" : "無盡潮";
  const line =
    n % 5 === 0
      ? "裂爪和錘骸會停下來砸樁、砸潮閘。先處理近戰。"
      : "沒有最後一波。活過這一潮，城就再借你一點頻率。";
  return { id: n, name, line, groups };
}

export function waveScale(waveIndex: number): number {
  return 1 + waveIndex * 0.15;
}

export function scaledDamage(base: number, rank: number): number {
  return base * Math.pow(1.36, rank);
}

export function scaledRate(base: number, rank: number): number {
  return base * Math.pow(1.26, rank);
}

export function upgradeCost(base: number, rank: number): number | null {
  if (rank >= 3) return null;
  const table = [0.62, 0.98, 1.45];
  return Math.round(base * table[rank]);
}

export const MAX_RANK = 3;
export const SELL_RATIO = 0.65;

export const AIM_LABEL: Record<AimMode, string> = {
  first: "最前",
  close: "最近",
  last: "最後",
  strong: "最厚",
};
