import {
  AIM_LABEL,
  CELL,
  COLS,
  ENEMIES,
  endlessWave,
  GATE,
  MAX_RANK,
  ROWS,
  SELL_RATIO,
  START_GOLD,
  START_LIVES,
  TOWER_BY_ID,
  TOWERS,
  WAVES,
  type AimMode,
  type EnemyKind,
  type MonsterSpec,
  type SkillId,
  type WaveDef,
  scaledDamage,
  scaledRate,
  upgradeCost,
  waveScale,
} from "./content";
import { routeTo, shortest, type Cell, type Grid } from "./field";
import { LEVELS } from "./levels";

export type Phase = "prep" | "fight" | "victory" | "defeat";
export type RunMode = "story" | "endless";
export type GameSpeed = 1 | 2 | 10;
export type SfxName = "place" | "kill" | "leak" | "wave" | "upgrade" | "boss" | "win" | "lose" | "sell";

export interface Enemy {
  id: number;
  kind: EnemyKind;
  hp: number;
  maxHp: number;
  speed: number;
  armor: number;
  gold: number;
  leak: number;
  radius: number;
  progress: number;
  x: number;
  y: number;
  slow: number;
  slowT: number;
  burnDps: number;
  burnT: number;
  rootT: number;
  rootCd: number;
  path: Cell[];
  seg: number;
  meleeCd: number;
  swing: number;
  facing: number;
  spawnT: number;
  dead: boolean;
  goal: Cell;
  skills: SkillId[];
  barrier: number;
  sprintT: number;
  sprintCd: number;
  summoned: boolean;
  color: string;
  customId: string;
}

export interface Tower {
  id: number;
  typeId: string;
  role: "tower" | "gate";
  c: number;
  r: number;
  x: number;
  y: number;
  dmgRank: number;
  rateRank: number;
  spent: number;
  cd: number;
  angle: number;
  mode: AimMode;
  hp: number;
  maxHp: number;
  recoil: number;
  hitFlash: number;
}

export interface Bolt {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  dmg: number;
  splash: number;
  slow: number;
  slowDur: number;
  color: string;
  life: number;
  pierce: boolean;
  halfArmor: boolean;
  execute: number;
  burnDps: number;
  burnDur: number;
  root: number;
  shield: number;
  targetId: number;
  speed: number;
}

export interface Zap {
  pts: { x: number; y: number }[];
  life: number;
  max: number;
  color: string;
}

export interface Floater {
  x: number;
  y: number;
  text: string;
  life: number;
  max: number;
  color: string;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  color: string;
  size: number;
}

export interface HudSnap {
  phase: Phase;
  gold: number;
  lives: number;
  shield: number;
  waveIndex: number;
  waveNumber: number;
  waveCount: number;
  waveName: string;
  waveLine: string;
  mode: RunMode;
  levelName: string;
  paused: boolean;
  speed: GameSpeed;
  kills: number;
  leaks: number;
  buildType: string | null;
  selectedId: number | null;
  toast: string;
  banner: string;
  bannerT: number;
  enemyCount: number;
  queueLeft: number;
  log: string[];
  rev: number;
  selected: null | {
    id: number;
    typeId: string;
    name: string;
    title: string;
    dmgRank: number;
    rateRank: number;
    damage: number;
    rate: number;
    range: number;
    mode: AimMode;
    sell: number;
    hp: number;
    maxHp: number;
    role: "tower" | "gate";
    dmgCost: number | null;
    rateCost: number | null;
    nextDamage: number | null;
    nextRate: number | null;
  };
}

interface QItem {
  t: number;
  kind: EnemyKind;
  customId?: string;
  spawn: number;
  goal: number;
}

export class DefenseSim {
  phase: Phase = "prep";
  gold = START_GOLD;
  lives = START_LIVES;
  waveIndex = 0;
  paused = false;
  speed: GameSpeed = 1;
  kills = 0;
  leaks = 0;
  shield = 0;
  mode: RunMode = "story";
  grid: Grid = LEVELS[0].grid;
  road: Cell[] = [];
  lanes: Cell[][] = [];
  levelName = LEVELS[0].name;
  buildType: string | null = null;
  selectedId: number | null = null;
  toast = "";
  toastT = 0;
  banner = "";
  bannerT = 0;
  shake = 0;
  gateFlash = 0;
  fightT = 0;
  log: string[] = [];
  towers: Tower[] = [];
  enemies: Enemy[] = [];
  bolts: Bolt[] = [];
  zaps: Zap[] = [];
  floaters: Floater[] = [];
  particles: Particle[] = [];
  rev = 1;
  onSfx: ((name: SfxName) => void) | null = null;
  onSettle: ((phase: "victory" | "defeat") => void) | null = null;

  private nextId = 1;
  private queue: QItem[] = [];
  private qIndex = 0;
  private settled = false;
  private pending: Enemy[] = [];
  private script: WaveDef[] = LEVELS[0].waves;
  private monsters: MonsterSpec[] = [];
  private storyExtras = true;

  constructor() {
    this.reset();
  }

  reset(
    mode: RunMode = "story",
    grid?: Grid,
    extra?: {
      waves?: WaveDef[];
      monsters?: MonsterSpec[];
      levelName?: string;
      gold?: number;
      lives?: number;
      story?: boolean;
    },
  ) {
    this.phase = "prep";
    this.mode = mode;
    this.grid = grid ?? LEVELS[0].grid;
    this.script = extra?.waves ?? (grid ? WAVES : LEVELS[0].waves);
    this.monsters = extra?.monsters ?? [];
    this.levelName = extra?.levelName ?? LEVELS[0].name;
    this.storyExtras = extra?.story ?? false;
    this.gold = extra?.gold ?? START_GOLD;
    this.lives = extra?.lives ?? START_LIVES;
    this.waveIndex = 0;
    this.paused = false;
    this.speed = 1;
    this.kills = 0;
    this.leaks = 0;
    this.shield = 0;
    this.buildType = null;
    this.selectedId = null;
    this.toast = "";
    this.toastT = 0;
    this.banner = "";
    this.bannerT = 0;
    this.shake = 0;
    this.gateFlash = 0;
    this.fightT = 0;
    this.log = [];
    this.towers = [];
    this.enemies = [];
    this.bolts = [];
    this.zaps = [];
    this.floaters = [];
    this.particles = [];
    this.queue = [];
    this.qIndex = 0;
    this.settled = false;
    this.pending = [];
    this.road = [];
    this.refreshRoad();
    this.notePrep();
    this.rev++;
  }

  private currentWave(): WaveDef {
    if (this.mode === "endless") {
      const wave = endlessWave(this.waveIndex);
      const doors = this.grid.spawns.map((_, i) => i);
      const ends = this.grid.goals.map((_, i) => i);
      return {
        ...wave,
        groups: wave.groups.map((group) => ({ ...group, spawns: doors, goals: ends })),
      };
    }
    const wave = this.script[Math.min(this.waveIndex, Math.max(0, this.script.length - 1))];
    if (!this.storyExtras) return wave;
    if (wave.id === 4) {
      return {
        ...wave,
        groups: [...wave.groups, { kind: "claw", count: 3, interval: 1.15, delay: 2.2 }],
      };
    }
    if (wave.id === 8) {
      return {
        ...wave,
        groups: [
          ...wave.groups,
          { kind: "claw", count: 4, interval: 0.8, delay: 1.2 },
          { kind: "hammer", count: 2, interval: 1.35, delay: 2.2 },
        ],
      };
    }
    if (wave.id === 12) {
      return {
        ...wave,
        groups: [...wave.groups, { kind: "hammer", count: 2, interval: 1.3, delay: 5.4 }],
      };
    }
    return wave;
  }

  private notePrep() {
    const wave = this.currentWave();
    this.log.push(`—— 第 ${wave.id} 波 · ${wave.name} ——`);
    this.log.push(wave.line);
    if (this.mode === "story" && wave.id > 1) {
      for (const t of TOWERS) {
        if (t.unlockWave === wave.id) this.log.push(`${t.name}入陣。${t.join}`);
      }
    }
    if (this.log.length > 48) this.log.splice(0, this.log.length - 48);
  }

  private bump() {
    this.rev++;
  }

  private say(text: string) {
    this.toast = text;
    this.toastT = 1.6;
    this.bump();
  }

  unlocked(id: string): boolean {
    if (id === "gate") return true;
    const def = TOWER_BY_ID[id];
    if (!def) return false;
    return this.waveIndex + 1 >= def.unlockWave;
  }

  private cellKind(c: number, r: number) {
    if (c < 0 || r < 0 || c >= COLS || r >= ROWS) return "wall" as const;
    return this.grid.cells[r * COLS + c];
  }

  private blockedSet(extra?: string) {
    const blocked = new Set<string>();
    for (const tower of this.towers) {
      if (tower.role === "gate") blocked.add(`${tower.c},${tower.r}`);
    }
    if (extra) blocked.add(extra);
    return blocked;
  }

  private costlySet() {
    const costly = new Set<string>();
    for (const tower of this.towers) {
      if (tower.role === "tower") costly.add(`${tower.c},${tower.r}`);
    }
    return costly;
  }

  private refreshRoad() {
    const blocked = this.blockedSet();
    const costly = this.costlySet();
    const lanes: Cell[][] = [];
    const road: Cell[] = [];
    const seen = new Set<string>();
    for (const spawn of this.grid.spawns) {
      const found = routeTo(this.grid, blocked, costly, spawn, this.grid.goals);
      if (!found) continue;
      lanes.push(found.path);
      for (const cell of found.path) {
        const id = `${cell.c},${cell.r}`;
        if (seen.has(id)) continue;
        seen.add(id);
        road.push(cell);
      }
    }
    this.lanes = lanes;
    this.road = road;
  }

  private foot(enemy: Enemy): Cell {
    if (enemy.seg >= 0.5 && enemy.path[1]) return enemy.path[1];
    return enemy.path[0] ?? this.grid.spawns[0];
  }

  private repathAll() {
    this.refreshRoad();
    const blocked = this.blockedSet();
    const costly = this.costlySet();
    for (const enemy of this.enemies) {
      if (enemy.dead) continue;
      const cell = this.foot(enemy);
      if (blocked.has(`${cell.c},${cell.r}`)) continue;
      const route = shortest(this.grid, blocked, costly, cell, enemy.goal);
      if (!route || route.length === 0) continue;
      enemy.path = route;
      enemy.seg = 0;
      enemy.x = (route[0].c + 0.5) * CELL;
      enemy.y = (route[0].r + 0.5) * CELL;
    }
  }

  canBuild(c: number, r: number): boolean {
    if (this.buildType === "gate") return this.canPlaceGate(c, r);
    if (!this.buildType) return false;
    return this.canPlaceTower(c, r);
  }

  private occupied(c: number, r: number) {
    return this.towers.some((tower) => tower.c === c && tower.r === r);
  }

  private canPlaceTower(c: number, r: number) {
    return this.cellKind(c, r) === "pad" && !this.occupied(c, r);
  }

  private canPlaceGate(c: number, r: number) {
    if (this.cellKind(c, r) !== "open" || this.occupied(c, r)) return false;
    for (const enemy of this.enemies) {
      if (enemy.dead) continue;
      const foot = this.foot(enemy);
      if (foot.c === c && foot.r === r) return false;
    }
    const blocked = this.blockedSet(`${c},${r}`);
    const costly = this.costlySet();
    for (const spawn of this.grid.spawns) {
      if (!routeTo(this.grid, blocked, costly, spawn, this.grid.goals)) return false;
    }
    for (const enemy of this.enemies) {
      if (enemy.dead) continue;
      if (!shortest(this.grid, blocked, costly, this.foot(enemy), enemy.goal)) return false;
    }
    return true;
  }

  arm(id: string | null) {
    if (this.phase === "victory" || this.phase === "defeat") return;
    if (id && !this.unlocked(id)) {
      const def = TOWER_BY_ID[id];
      this.say(def ? `${def.name}於第 ${def.unlockWave} 波入陣` : "尚未入陣");
      return;
    }
    this.buildType = this.buildType === id ? null : id;
    if (this.buildType) this.selectedId = null;
    this.bump();
  }

  place(c: number, r: number): boolean {
    if (this.phase === "victory" || this.phase === "defeat") return false;
    const existing = this.towers.find((t) => t.c === c && t.r === r);
    if (existing) {
      this.selectedId = existing.id;
      this.buildType = null;
      this.bump();
      return false;
    }
    if (!this.buildType) {
      this.selectedId = null;
      this.bump();
      return false;
    }
    if (this.buildType === "gate") return this.placeGate(c, r);
    const def = TOWER_BY_ID[this.buildType];
    if (!def || !this.unlocked(def.id)) return false;
    if (!this.canPlaceTower(c, r)) {
      const kind = this.cellKind(c, r);
      this.say(kind === "open" ? "潮徑上請放潮閘，塔要立在路旁的塔位" : kind === "pad" ? "這裡已經有建築" : "地圖邊界上不能建造");
      return false;
    }
    if (this.gold < def.cost) {
      this.say("金幣不足");
      return false;
    }
    this.gold -= def.cost;
    const hp = Math.round(70 + def.cost * 0.35);
    const tower: Tower = {
      id: this.nextId++,
      typeId: def.id,
      role: "tower",
      c,
      r,
      x: (c + 0.5) * CELL,
      y: (r + 0.5) * CELL,
      dmgRank: 0,
      rateRank: 0,
      spent: def.cost,
      cd: 0.15,
      angle: 0,
      mode: "first",
      hp,
      maxHp: hp,
      recoil: 0,
      hitFlash: 0,
    };
    this.towers.push(tower);
    this.onSfx?.("place");
    this.burst(tower.x, tower.y, def.color, 8);
    this.repathAll();
    this.bump();
    return true;
  }

  private placeGate(c: number, r: number) {
    if (!this.canPlaceGate(c, r)) {
      const kind = this.cellKind(c, r);
      this.say(kind === "open" ? "這道閘會封死去路，或壓在殘響身上" : "地圖邊界上不能建造");
      return false;
    }
    if (this.gold < GATE.cost) {
      this.say("金幣不足");
      return false;
    }
    this.gold -= GATE.cost;
    this.towers.push({
      id: this.nextId++,
      typeId: "gate",
      role: "gate",
      c,
      r,
      x: (c + 0.5) * CELL,
      y: (r + 0.5) * CELL,
      dmgRank: 0,
      rateRank: 0,
      spent: GATE.cost,
      cd: 0,
      angle: 0,
      mode: "first",
      hp: GATE.hp,
      maxHp: GATE.hp,
      recoil: 0,
      hitFlash: 0,
    });
    this.onSfx?.("place");
    this.burst((c + 0.5) * CELL, (r + 0.5) * CELL, "#e3c36a", 8);
    this.repathAll();
    this.bump();
    return true;
  }

  selectAt(c: number, r: number) {
    const existing = this.towers.find((t) => t.c === c && t.r === r);
    this.selectedId = existing ? existing.id : null;
    if (existing) this.buildType = null;
    this.bump();
  }

  cancelArm() {
    this.buildType = null;
    this.selectedId = null;
    this.bump();
  }

  private selectedTower(): Tower | null {
    if (this.selectedId == null) return null;
    return this.towers.find((t) => t.id === this.selectedId) ?? null;
  }

  upgrade(path: "dmg" | "rate") {
    const tower = this.selectedTower();
    if (!tower || tower.role !== "tower" || this.phase === "victory" || this.phase === "defeat") return;
    const def = TOWER_BY_ID[tower.typeId];
    const rank = path === "dmg" ? tower.dmgRank : tower.rateRank;
    const cost = upgradeCost(def.cost, rank);
    if (cost == null) {
      this.say("這條路已經到頂");
      return;
    }
    if (this.gold < cost) {
      this.say("金幣不足");
      return;
    }
    this.gold -= cost;
    tower.spent += cost;
    if (path === "dmg") tower.dmgRank += 1;
    else tower.rateRank += 1;
    this.onSfx?.("upgrade");
    this.burst(tower.x, tower.y, def.color, 10);
    this.bump();
  }

  setAim(mode: AimMode) {
    const tower = this.selectedTower();
    if (!tower) return;
    tower.mode = mode;
    this.bump();
  }

  sell() {
    const tower = this.selectedTower();
    if (!tower || this.phase === "victory" || this.phase === "defeat") return;
    const refund = Math.round(tower.spent * SELL_RATIO);
    this.gold += refund;
    this.towers = this.towers.filter((t) => t.id !== tower.id);
    this.selectedId = null;
    this.float(tower.x, tower.y, `+${refund}`, "#e3c36a");
    this.onSfx?.("sell");
    this.repathAll();
    this.bump();
  }

  startWave() {
    if (this.phase !== "prep" || this.lives <= 0) return;
    const wave = this.currentWave();
    this.phase = "fight";
    this.fightT = 0;
    this.queue = [];
    for (const g of wave.groups) {
      const doors = g.spawns?.length ? g.spawns : this.grid.spawns.map((_, index) => index);
      const ends = g.goals?.length ? g.goals : this.grid.goals.map((_, index) => index);
      for (let i = 0; i < g.count; i++) {
        this.queue.push({
          t: g.delay + i * g.interval,
          kind: g.kind,
          customId: g.customId,
          spawn: doors[i % doors.length],
          goal: ends[i % ends.length],
        });
      }
    }
    this.queue.sort((a, b) => a.t - b.t);
    this.qIndex = 0;
    this.banner = wave.name;
    this.bannerT = 1.7;
    this.onSfx?.("wave");
    this.bump();
  }

  tick(dt: number) {
    this.toastT = Math.max(0, this.toastT - dt);
    this.bannerT = Math.max(0, this.bannerT - dt);
    this.shake = Math.max(0, this.shake - dt);
    this.gateFlash = Math.max(0, this.gateFlash - dt);
    for (const tower of this.towers) {
      tower.recoil = Math.max(0, tower.recoil - dt * 4.5);
      tower.hitFlash = Math.max(0, tower.hitFlash - dt);
    }
    if (this.toastT === 0 && this.toast) {
      this.toast = "";
      this.bump();
    }
    if (this.phase === "victory" || this.phase === "defeat") {
      this.decayFx(dt);
      return;
    }
    if (this.phase === "fight") {
      this.fightT += dt;
      while (this.qIndex < this.queue.length && this.queue[this.qIndex].t <= this.fightT) {
        const item = this.queue[this.qIndex];
        const origin = this.grid.spawns[item.spawn] ?? this.grid.spawns[0];
        const goal = this.grid.goals[item.goal] ?? this.grid.goals[0];
        this.spawn(item.kind, origin, goal, 1, null, item.customId, false);
        this.qIndex++;
      }
    }
    for (const enemy of this.enemies) {
      if (enemy.dead) continue;
      this.stepEnemy(enemy, dt);
      if (this.lives <= 0) break;
    }
    if (this.pending.length) {
      this.enemies.push(...this.pending);
      this.pending = [];
    }
    if (this.lives > 0 && this.phase === "fight") {
      for (const tower of this.towers) {
        if (tower.role === "tower") this.aimAndFire(tower, dt);
      }
      this.stepBolts(dt);
    }
    this.enemies = this.enemies.filter((e) => !e.dead);
    this.decayFx(dt);
    if (
      this.phase === "fight" &&
      this.qIndex >= this.queue.length &&
      this.enemies.length === 0
    ) {
      const bonus = 16 + this.waveIndex * 6;
      this.gold += bonus;
      this.log.push(`潮徑清空，城裡補上 ${bonus} 金幣。`);
      if (this.mode === "endless") {
        this.waveIndex += 1;
        this.phase = "prep";
        this.notePrep();
        this.bump();
      } else if (this.waveIndex >= this.script.length - 1) {
        this.finish("victory");
      } else {
        this.waveIndex += 1;
        this.phase = "prep";
        this.notePrep();
        this.bump();
      }
    }
  }

  private finish(phase: "victory" | "defeat") {
    if (this.settled) return;
    this.phase = phase;
    this.settled = true;
    this.buildType = null;
    this.banner = phase === "victory" ? "城門還亮著" : "城燈滅了";
    this.bannerT = 2.4;
    this.onSfx?.(phase === "victory" ? "win" : "lose");
    this.onSettle?.(phase);
    this.bump();
  }

  private spawn(
    kind: EnemyKind,
    at: Cell,
    goal: Cell,
    hpMul: number,
    goldOverride: number | null,
    customId?: string,
    summoned = false,
  ) {
    const custom = customId ? this.monsters.find((item) => item.id === customId) : undefined;
    const def = custom ?? ENEMIES[kind];
    const skills = custom?.skills ?? [];
    const route = shortest(this.grid, this.blockedSet(), this.costlySet(), at, goal);
    if (!route || route.length < 2) return;
    const scale = waveScale(this.waveIndex) * (this.mode === "endless" ? 1 + this.waveIndex * 0.04 : 1);
    const hp = Math.round(def.hp * scale * hpMul);
    const pay = goldOverride == null ? def.gold : goldOverride;
    const gold = Math.round(pay * (1 + this.waveIndex * 0.2));
    const px = 64 / CELL;
    const enemy: Enemy = {
      id: this.nextId++,
      kind,
      hp,
      maxHp: hp,
      speed: def.speed * px * (1 + this.waveIndex * 0.012),
      armor: def.armor,
      gold,
      leak: def.leak,
      radius: def.radius,
      progress: 0,
      x: (route[0].c + 0.5) * CELL,
      y: (route[0].r + 0.5) * CELL,
      slow: 1,
      slowT: 0,
      burnDps: 0,
      burnT: 0,
      rootT: 0,
      rootCd: 0,
      path: route,
      seg: 0,
      meleeCd: 0.35,
      swing: 0,
      facing: 0,
      spawnT: kind === "core" && !custom ? 4 : 0,
      dead: false,
      goal,
      skills,
      barrier: skills.includes("shield") ? Math.round(hp * 0.3) : 0,
      sprintT: 0,
      sprintCd: 2.5,
      summoned,
      color: custom?.color ?? "",
      customId: customId ?? "",
    };
    this.pending.push(enemy);
    if (kind === "core" && !custom) {
      this.banner = "虛潮之核";
      this.bannerT = 2.3;
      this.shake = 0.5;
      this.onSfx?.("boss");
    }
  }

  private stepEnemy(enemy: Enemy, dt: number) {
    if (enemy.skills.includes("regen") && enemy.hp < enemy.maxHp && enemy.hp > 0) {
      enemy.hp = Math.min(enemy.maxHp, enemy.hp + enemy.maxHp * 0.02 * dt);
    }
    if (enemy.skills.includes("sprint")) {
      enemy.sprintCd -= dt;
      if (enemy.sprintT > 0) enemy.sprintT -= dt;
      if (enemy.sprintCd <= 0) {
        enemy.sprintCd = 4.2;
        enemy.sprintT = 1.15;
      }
    }
    if (enemy.burnT > 0) {
      const step = Math.min(dt, enemy.burnT);
      enemy.burnT -= dt;
      enemy.hp -= enemy.burnDps * step;
      if (enemy.hp <= 0) {
        this.slay(enemy);
        return;
      }
    }
    if (enemy.rootCd > 0) enemy.rootCd -= dt;
    const rooted = enemy.rootT > 0;
    if (enemy.rootT > 0) enemy.rootT = Math.max(0, enemy.rootT - dt);
    if (enemy.slowT > 0) {
      enemy.slowT -= dt;
      if (enemy.slowT <= 0) enemy.slow = 1;
    }
    enemy.swing = Math.max(0, enemy.swing - dt * 3.2);
    if (enemy.kind === "core") {
      enemy.spawnT -= dt;
      if (enemy.spawnT <= 0) {
        enemy.spawnT = 6.5;
        this.spawn("wisp", enemy.path[0] ?? this.foot(enemy), enemy.goal, 0.62, 14);
      }
    }
    const spec = enemy.customId
      ? this.monsters.find((item) => item.id === enemy.customId)
      : undefined;
    const melee = spec?.melee ?? ENEMIES[enemy.kind].melee;
    const meleeEvery = spec?.meleeEvery ?? ENEMIES[enemy.kind].meleeEvery;
    if (melee > 0) {
      const victim = this.nearestStructure(enemy, CELL * 1.25);
      if (victim) {
        enemy.facing = Math.atan2(victim.y - enemy.y, victim.x - enemy.x);
        enemy.meleeCd -= dt;
        if (enemy.meleeCd <= 0) {
          enemy.meleeCd = meleeEvery;
          enemy.swing = 1;
          this.hurtStructure(victim, melee);
        }
        this.markProgress(enemy);
        return;
      }
    }
    if (rooted || enemy.path.length < 2) {
      if (!rooted && enemy.path.length < 2) this.leak(enemy);
      else this.markProgress(enemy);
      return;
    }
    const sprint = enemy.sprintT > 0 ? 1.85 : 1;
    const speed = enemy.speed * sprint * (enemy.slowT > 0 ? enemy.slow : 1);
    const from = enemy.path[0];
    const to = enemy.path[1];
    const len =
      Math.hypot((to.c - from.c) * CELL, (to.r - from.r) * CELL) || CELL;
    enemy.facing = Math.atan2(to.r - from.r, to.c - from.c);
    enemy.seg += (speed * dt) / len;
    if (enemy.seg >= 1) {
      enemy.seg = 0;
      enemy.path.shift();
      if (enemy.path.length < 2) {
        const last = enemy.path[0];
        if (last) {
          enemy.x = (last.c + 0.5) * CELL;
          enemy.y = (last.r + 0.5) * CELL;
        }
        this.leak(enemy);
        return;
      }
    }
    const a = enemy.path[0];
    const b = enemy.path[1];
    const ax = (a.c + 0.5) * CELL;
    const ay = (a.r + 0.5) * CELL;
    const bx = (b.c + 0.5) * CELL;
    const by = (b.r + 0.5) * CELL;
    enemy.x = ax + (bx - ax) * enemy.seg;
    enemy.y = ay + (by - ay) * enemy.seg;
    this.markProgress(enemy);
  }

  private markProgress(enemy: Enemy) {
    enemy.progress = 10000 - (enemy.path.length - 1 - enemy.seg);
  }

  private nearestStructure(enemy: Enemy, range: number): Tower | null {
    const pick = (list: Tower[]) => {
      let best: Tower | null = null;
      let bestD = range * range;
      for (const tower of list) {
        const dx = tower.x - enemy.x;
        const dy = tower.y - enemy.y;
        const dist = dx * dx + dy * dy;
        if (dist <= bestD) {
          bestD = dist;
          best = tower;
        }
      }
      return best;
    };
    return pick(this.towers.filter((tower) => tower.role === "gate")) ?? pick(this.towers);
  }

  private hurtStructure(tower: Tower, amount: number) {
    tower.hp -= amount;
    tower.hitFlash = 0.18;
    if (tower.hp > 0) return;
    this.float(tower.x, tower.y - 16, "摧毀", "#e15d6c");
    this.burst(tower.x, tower.y, "#e3c36a", 10);
    if (this.selectedId === tower.id) this.selectedId = null;
    this.towers = this.towers.filter((item) => item.id !== tower.id);
    this.repathAll();
    this.bump();
  }

  private leak(enemy: Enemy) {
    if (enemy.dead) return;
    enemy.dead = true;
    let cost = enemy.leak;
    const absorbed = Math.min(this.shield, cost);
    this.shield -= absorbed;
    cost -= absorbed;
    if (absorbed > 0) this.float(enemy.x, enemy.y - 28, `盾-${absorbed}`, "#9fd4e8");
    if (cost > 0) {
      this.lives = Math.max(0, this.lives - cost);
      this.leaks += 1;
      this.gateFlash = 0.45;
      this.shake = Math.max(this.shake, enemy.kind === "core" ? 0.55 : 0.28);
      this.float(enemy.x, enemy.y - 12, `-${cost}`, "#e15d6c");
      this.onSfx?.("leak");
      if (this.lives <= 0) this.finish("defeat");
    } else {
      this.gateFlash = 0.22;
      this.bump();
    }
  }

  private aimAndFire(tower: Tower, dt: number) {
    const def = TOWER_BY_ID[tower.typeId];
    const target = this.pick(tower, def.range);
    if (target) {
      const ang = Math.atan2(target.y - tower.y, target.x - tower.x);
      tower.angle = ang;
    }
    tower.cd -= dt;
    if (!target || tower.cd > 0) return;
    const damage = scaledDamage(def.damage, tower.dmgRank);
    const rate = scaledRate(def.rate, tower.rateRank);
    tower.cd = 1 / rate;
    if (def.style === "chain") this.castChain(tower, def, target, damage);
    else this.castBolt(tower, def, target, damage);
    tower.recoil = 1;
  }

  private pick(tower: Tower, range: number): Enemy | null {
    const r2 = range * range;
    let best: Enemy | null = null;
    let bestKey = 0;
    for (const e of this.enemies) {
      if (e.dead) continue;
      const dx = e.x - tower.x;
      const dy = e.y - tower.y;
      const dist2 = dx * dx + dy * dy;
      if (dist2 > r2) continue;
      if (e.skills.includes("stealth") && e.hp >= e.maxHp * 0.98 && dist2 > 96 * 96) continue;
      let key = 0;
      if (tower.mode === "first") key = e.progress;
      else if (tower.mode === "last") key = -e.progress;
      else if (tower.mode === "strong") key = e.hp;
      else key = -(dx * dx + dy * dy);
      if (!best || key > bestKey) {
        best = e;
        bestKey = key;
      }
    }
    return best;
  }

  private castBolt(
    tower: Tower,
    def: (typeof TOWERS)[number],
    target: Enemy,
    damage: number,
  ) {
    const dx = target.x - tower.x;
    const dy = target.y - tower.y;
    const len = Math.hypot(dx, dy) || 1;
    const speed = def.splash > 0 ? 250 : 340;
    this.bolts.push({
      id: this.nextId++,
      x: tower.x + (dx / len) * 18,
      y: tower.y + (dy / len) * 18,
      vx: (dx / len) * speed,
      vy: (dy / len) * speed,
      dmg: damage,
      splash: def.splash,
      slow: def.slow,
      slowDur: def.slowDur,
      color: def.color,
      life: 1.35,
      pierce: def.pierce,
      halfArmor: def.halfArmor,
      execute: def.execute,
      burnDps: def.burn * damage,
      burnDur: def.burnDur,
      root: def.root,
      shield: def.shieldOnHit,
      targetId: target.id,
      speed,
    });
  }

  private castChain(
    tower: Tower,
    def: (typeof TOWERS)[number],
    primary: Enemy,
    damage: number,
  ) {
    const hits: Enemy[] = [primary];
    let dmg = damage;
    this.hurt(primary, dmg, def.pierce, def.halfArmor, def.execute, def.slow, def.slowDur);
    this.stamp(primary, def.burn * damage, def.burnDur, def.root);
    let guard = 0;
    while (hits.length <= def.chain && guard < 8) {
      guard++;
      dmg *= def.chainFalloff;
      const from = hits[hits.length - 1];
      let next: Enemy | null = null;
      let best = 118 * 118;
      for (const e of this.enemies) {
        if (e.dead || hits.includes(e)) continue;
        const dx = e.x - from.x;
        const dy = e.y - from.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < best) {
          best = d2;
          next = e;
        }
      }
      if (!next) break;
      hits.push(next);
      this.hurt(next, dmg, def.pierce, def.halfArmor, 1, 1, 0);
      this.stamp(next, def.burn * dmg, def.burnDur, def.root);
    }
    const pts: { x: number; y: number }[] = [{ x: tower.x, y: tower.y }];
    for (let i = 0; i < hits.length; i++) {
      const a = i === 0 ? { x: tower.x, y: tower.y } : { x: hits[i - 1].x, y: hits[i - 1].y };
      const b = { x: hits[i].x, y: hits[i].y };
      const steps = 4;
      for (let s = 1; s <= steps; s++) {
        const t = s / steps;
        pts.push({
          x: a.x + (b.x - a.x) * t + (s === steps ? 0 : (Math.random() - 0.5) * 16),
          y: a.y + (b.y - a.y) * t + (s === steps ? 0 : (Math.random() - 0.5) * 16),
        });
      }
    }
    this.zaps.push({ pts, life: 0.18, max: 0.18, color: def.color });
    if (def.shieldOnHit > 0) {
      this.shield = Math.min(12, this.shield + def.shieldOnHit);
      this.bump();
    }
  }

  private stepBolts(dt: number) {
    for (const b of this.bolts) {
      const target = this.enemies.find((e) => e.id === b.targetId && !e.dead);
      if (target) {
        const dx = target.x - b.x;
        const dy = target.y - b.y;
        const len = Math.hypot(dx, dy) || 1;
        b.vx = (dx / len) * b.speed;
        b.vy = (dy / len) * b.speed;
        if (len < target.radius + 8) {
          this.impact(b, target.x, target.y);
          b.life = 0;
          continue;
        }
      }
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
    }
    this.bolts = this.bolts.filter((b) => b.life > 0);
  }

  private impact(b: Bolt, x: number, y: number) {
    const touched: Enemy[] = [];
    if (b.splash > 0) {
      const r2 = b.splash * b.splash;
      for (const e of this.enemies) {
        if (e.dead) continue;
        const dx = e.x - x;
        const dy = e.y - y;
        if (dx * dx + dy * dy <= r2) touched.push(e);
      }
      this.burst(x, y, b.color, 12);
    } else {
      const target = this.enemies.find((e) => e.id === b.targetId && !e.dead);
      if (target) touched.push(target);
      this.burst(x, y, b.color, 5);
    }
    for (const e of touched) {
      this.hurt(e, b.dmg, b.pierce, b.halfArmor, b.execute, b.slow, b.slowDur);
      this.stamp(e, b.burnDps, b.burnDur, b.root);
    }
    if (b.shield > 0 && touched.length > 0) {
      this.shield = Math.min(12, this.shield + b.shield);
      this.bump();
    }
  }

  private hurt(
    e: Enemy,
    amount: number,
    pierce: boolean,
    halfArmor: boolean,
    execute: number,
    slow: number,
    slowDur: number,
  ) {
    if (e.dead) return;
    let dmg = amount;
    if (execute > 1 && e.hp / e.maxHp < 0.22) dmg *= execute;
    if (!pierce && e.armor > 0) {
      const arm = halfArmor ? e.armor * 0.5 : e.armor;
      dmg = Math.max(1, dmg - arm);
    }
    for (const other of this.enemies) {
      if (other.dead || other.id === e.id || !other.skills.includes("aura")) continue;
      const dx = other.x - e.x;
      const dy = other.y - e.y;
      if (dx * dx + dy * dy <= 100 * 100) {
        dmg *= 0.8;
        break;
      }
    }
    if (e.barrier > 0 && dmg > 0) {
      const used = Math.min(e.barrier, dmg);
      e.barrier -= used;
      dmg -= used;
    }
    e.hp -= dmg;
    if (slow < 1 && slowDur > 0 && slow <= e.slow) {
      e.slow = slow;
      e.slowT = Math.max(e.slowT, slowDur);
    } else if (slow < 1 && slowDur > 0 && e.slowT <= 0) {
      e.slow = slow;
      e.slowT = slowDur;
    }
    if (e.hp <= 0) this.slay(e);
  }

  private stamp(e: Enemy, burnDps: number, burnDur: number, root: number) {
    if (e.dead) return;
    if (burnDps > 0 && burnDur > 0) {
      if (burnDps >= e.burnDps || e.burnT <= 0) e.burnDps = burnDps;
      e.burnT = burnDur;
    }
    if (root > 0 && e.rootCd <= 0) {
      e.rootT = root;
      e.rootCd = root + 1.05;
    }
  }

  private slay(e: Enemy) {
    if (e.dead) return;
    e.dead = true;
    e.hp = 0;
    this.gold += e.gold;
    this.kills += 1;
    this.float(e.x, e.y - 10, `+${e.gold}`, "#e3c36a");
    this.burst(e.x, e.y, "#e7f0ea", 8);
    this.onSfx?.("kill");
    if (e.skills.includes("split") && !e.summoned) {
      const at = e.path[0] ?? this.foot(e);
      this.spawn("wisp", at, e.goal, 0.42, 6, undefined, true);
      this.spawn("wisp", at, e.goal, 0.42, 6, undefined, true);
    }
    this.bump();
  }

  private float(x: number, y: number, text: string, color: string) {
    this.floaters.push({ x, y, text, life: 0.8, max: 0.8, color });
    if (this.floaters.length > 30) this.floaters.splice(0, this.floaters.length - 30);
  }

  private burst(x: number, y: number, color: string, n: number) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = 20 + Math.random() * 70;
      this.particles.push({
        x,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        life: 0.35 + Math.random() * 0.25,
        max: 0.6,
        color,
        size: 1.5 + Math.random() * 2.2,
      });
    }
    if (this.particles.length > 180) this.particles.splice(0, this.particles.length - 180);
  }

  private decayFx(dt: number) {
    for (const p of this.particles) {
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 20 * dt;
    }
    this.particles = this.particles.filter((p) => p.life > 0);
    for (const f of this.floaters) {
      f.life -= dt;
      f.y -= 22 * dt;
    }
    this.floaters = this.floaters.filter((f) => f.life > 0);
    for (const z of this.zaps) z.life -= dt;
    this.zaps = this.zaps.filter((z) => z.life > 0);
  }

  snapshot(): HudSnap {
    const tower = this.selectedTower();
    let selected: HudSnap["selected"] = null;
    if (tower?.role === "gate") {
      selected = {
        id: tower.id,
        typeId: "gate",
        name: GATE.name,
        title: "改道",
        dmgRank: 0,
        rateRank: 0,
        damage: 0,
        rate: 0,
        range: 0,
        mode: "first",
        sell: Math.round(tower.spent * SELL_RATIO),
        hp: Math.max(0, Math.ceil(tower.hp)),
        maxHp: tower.maxHp,
        role: "gate",
        dmgCost: null,
        rateCost: null,
        nextDamage: null,
        nextRate: null,
      };
    } else if (tower) {
      const def = TOWER_BY_ID[tower.typeId];
      const dmgCost = upgradeCost(def.cost, tower.dmgRank);
      const rateCost = upgradeCost(def.cost, tower.rateRank);
      selected = {
        id: tower.id,
        typeId: tower.typeId,
        name: def.name,
        title: def.title,
        dmgRank: tower.dmgRank,
        rateRank: tower.rateRank,
        damage: Math.round(scaledDamage(def.damage, tower.dmgRank)),
        rate: Math.round(scaledRate(def.rate, tower.rateRank) * 100) / 100,
        range: def.range,
        mode: tower.mode,
        sell: Math.round(tower.spent * SELL_RATIO),
        hp: Math.max(0, Math.ceil(tower.hp)),
        maxHp: tower.maxHp,
        role: "tower",
        dmgCost,
        rateCost,
        nextDamage:
          tower.dmgRank >= MAX_RANK
            ? null
            : Math.round(scaledDamage(def.damage, tower.dmgRank + 1)),
        nextRate:
          tower.rateRank >= MAX_RANK
            ? null
            : Math.round(scaledRate(def.rate, tower.rateRank + 1) * 100) / 100,
      };
    }
    const wave = this.currentWave();
    return {
      phase: this.phase,
      gold: this.gold,
      lives: this.lives,
      shield: this.shield,
      waveIndex: this.waveIndex,
      waveNumber: wave.id,
      waveCount: this.mode === "endless" ? 0 : this.script.length,
      waveName: wave.name,
      waveLine: wave.line,
      mode: this.mode,
      levelName: this.levelName,
      paused: this.paused,
      speed: this.speed,
      kills: this.kills,
      leaks: this.leaks,
      buildType: this.buildType,
      selectedId: this.selectedId,
      toast: this.toastT > 0 ? this.toast : "",
      banner: this.bannerT > 0 ? this.banner : "",
      bannerT: this.bannerT,
      enemyCount: this.enemies.length,
      queueLeft: Math.max(0, this.queue.length - this.qIndex),
      log: this.log,
      rev: this.rev,
      selected,
    };
  }
}

export const AIM_ORDER: AimMode[] = ["first", "close", "last", "strong"];
export { AIM_LABEL };
