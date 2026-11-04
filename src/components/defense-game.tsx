import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import {
  BookOpen,
  Coins,
  FastForward,
  Heart,
  Lock,
  Pause,
  Play,
  RotateCcw,
  Shield,
  Swords,
  Volume2,
  VolumeX,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  AIM_LABEL,
  CELL,
  ENEMIES,
  ENDING,
  PROLOGUE,
  TOWERS,
  TRAITS,
  WAVES,
  WORLD_H,
  WORLD_W,
  type AimMode,
  type EnemyKind,
  type TraitId,
} from "@/game/content";
import { draw } from "@/game/draw";
import { LEVELS, levelById } from "@/game/levels";
import { AIM_ORDER, DefenseSim, type HudSnap, type RunMode, type SfxName } from "@/game/sim";

function cn(...v: ClassValue[]) {
  return twMerge(clsx(v));
}

const SAVE_KEY = "chengchao-defense-v1";

interface SaveData {
  bestWave: number;
  wins: number;
  endlessBest: number;
}

function loadRecord(): SaveData {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return { bestWave: 0, wins: 0, endlessBest: 0 };
    const parsed = JSON.parse(raw) as Partial<SaveData>;
    return {
      bestWave: typeof parsed.bestWave === "number" ? parsed.bestWave : 0,
      wins: typeof parsed.wins === "number" ? parsed.wins : 0,
      endlessBest: typeof parsed.endlessBest === "number" ? parsed.endlessBest : 0,
    };
  } catch {
    return { bestWave: 0, wins: 0, endlessBest: 0 };
  }
}

class Sfx {
  private ctx: AudioContext | null = null;
  muted = false;
  private lastKill = 0;

  resume() {
    if (this.muted) return;
    if (!this.ctx) this.ctx = new AudioContext();
    if (this.ctx.state === "suspended") void this.ctx.resume();
  }

  play(name: SfxName) {
    if (this.muted) return;
    if (!this.ctx) this.ctx = new AudioContext();
    const ctx = this.ctx;
    if (ctx.state === "suspended") void ctx.resume();
    if (name === "kill") {
      const now = performance.now();
      if (now - this.lastKill < 70) return;
      this.lastKill = now;
    }
    if (name === "win") {
      [523, 659, 784].forEach((freq, i) => this.tone(ctx, freq, ctx.currentTime + i * 0.11, 0.16, "sine", 0.04));
      return;
    }
    const table: Record<Exclude<SfxName, "win">, [number, number, OscillatorType, number]> = {
      place: [620, 0.07, "triangle", 0.035],
      kill: [880, 0.06, "sine", 0.03],
      leak: [98, 0.22, "sawtooth", 0.028],
      wave: [246, 0.12, "square", 0.02],
      upgrade: [540, 0.09, "triangle", 0.04],
      boss: [78, 0.32, "sawtooth", 0.035],
      lose: [130, 0.36, "triangle", 0.04],
      sell: [360, 0.07, "triangle", 0.03],
    };
    const [freq, dur, type, gain] = table[name];
    this.tone(ctx, freq, ctx.currentTime, dur, type, gain);
  }

  private tone(
    ctx: AudioContext,
    freq: number,
    when: number,
    dur: number,
    type: OscillatorType,
    gain: number,
  ) {
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, when);
    amp.gain.setValueAtTime(gain, when);
    amp.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    osc.connect(amp);
    amp.connect(ctx.destination);
    osc.start(when);
    osc.stop(when + dur + 0.02);
  }
}

export function DefenseGame() {
  const simRef = useRef<DefenseSim | null>(null);
  if (!simRef.current) simRef.current = new DefenseSim();
  const sim = simRef.current;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const artRef = useRef<Record<string, HTMLImageElement | undefined>>({});
  const hoverRef = useRef<{ c: number; r: number } | null>(null);
  const armedRef = useRef<{ c: number; r: number } | null>(null);
  const sfxRef = useRef<Sfx | null>(null);
  if (!sfxRef.current) sfxRef.current = new Sfx();
  const logRef = useRef<HTMLDivElement | null>(null);
  const camRef = useRef({ x: 0, y: 0, scale: 1.4, ready: false });
  const keysRef = useRef(new Set<string>());
  const miniRef = useRef({ x: 12, y: 12, s: 148 });
  const dragRef = useRef<{
    id: number;
    x: number;
    y: number;
    camX: number;
    camY: number;
    moved: boolean;
    cell: { c: number; r: number };
  } | null>(null);

  const [hud, setHud] = useState<HudSnap>(() => sim.snapshot());
  const [screen, setScreen] = useState<"menu" | "play" | "shop">("menu");
  const [prologue, setPrologue] = useState(0);
  const [tab, setTab] = useState<"build" | "log" | "cast">("build");
  const [record, setRecord] = useState<SaveData>({ bestWave: 0, wins: 0, endlessBest: 0 });
  const [muted, setMuted] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    setRecord(loadRecord());
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
    const urls = new Set<string>();
    for (const tower of TOWERS) urls.add(tower.art);
    for (const enemy of Object.values(ENEMIES)) if (enemy.art) urls.add(enemy.art);
    const bag: Record<string, HTMLImageElement | undefined> = {};
    for (const url of urls) {
      const img = new Image();
      img.decoding = "async";
      img.src = url;
      bag[url] = img;
    }
    artRef.current = bag;
    sim.onSfx = (name) => sfxRef.current?.play(name);
    sim.onSettle = (phase) => {
      const prev = loadRecord();
      const next = { ...prev };
      if (sim.mode === "endless") {
        next.endlessBest = Math.max(prev.endlessBest, sim.waveIndex + 1);
      } else {
        const reached = phase === "victory" ? WAVES.length : sim.waveIndex + 1;
        next.bestWave = Math.max(prev.bestWave, reached);
        next.wins = prev.wins + (phase === "victory" ? 1 : 0);
      }
      localStorage.setItem(SAVE_KEY, JSON.stringify(next));
      setRecord(next);
    };
  }, [sim]);

  useEffect(() => {
    if (screen !== "play") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let ui = 0;

    const viewOf = () => {
      const cssW = Math.max(1, canvas.clientWidth);
      const cssH = Math.max(1, canvas.clientHeight);
      const scale = camRef.current.scale;
      return { cssW, cssH, scale, viewW: cssW / scale, viewH: cssH / scale };
    };
    const minScale = () => {
      const cssW = Math.max(1, canvas.clientWidth);
      const cssH = Math.max(1, canvas.clientHeight);
      return Math.min(cssW / WORLD_W, cssH / WORLD_H);
    };
    const clampCam = () => {
      const { viewW, viewH } = viewOf();
      const maxX = Math.max(0, WORLD_W - viewW);
      const maxY = Math.max(0, WORLD_H - viewH);
      camRef.current.x = Math.max(0, Math.min(maxX, camRef.current.x));
      camRef.current.y = Math.max(0, Math.min(maxY, camRef.current.y));
    };
    const focusEntrance = () => {
      if (canvas.clientWidth < 8) return;
      const spawn = sim.grid.spawns[0] ?? { c: 2, r: 100 };
      camRef.current.scale = Math.min(2.4, Math.max(minScale() * 1.02, canvas.clientWidth / (28 * CELL)));
      const { viewW, viewH } = viewOf();
      camRef.current.x = (spawn.c + 7) * CELL - viewW * 0.32;
      camRef.current.y = (spawn.r + 0.5) * CELL - viewH * 0.5;
      clampCam();
      camRef.current.ready = true;
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const scaleTime = sim.paused || prologue < PROLOGUE.length ? 0 : sim.phase === "fight" ? sim.speed : 1;
      acc += dt * scaleTime;
      let steps = 0;
      const cap = sim.speed >= 10 ? 36 : 8;
      while (acc >= 1 / 60 && steps < cap) {
        sim.tick(1 / 60);
        acc -= 1 / 60;
        steps++;
      }
      const keys = keysRef.current;
      let vx = 0;
      let vy = 0;
      if (keys.has("arrowleft") || keys.has("a")) vx -= 1;
      if (keys.has("arrowright") || keys.has("d")) vx += 1;
      if (keys.has("arrowup") || keys.has("w")) vy -= 1;
      if (keys.has("arrowdown") || keys.has("s")) vy += 1;
      if (vx || vy) {
        const len = Math.hypot(vx, vy) || 1;
        const step = (720 / camRef.current.scale) * dt;
        camRef.current.x += (vx / len) * step;
        camRef.current.y += (vy / len) * step;
        clampCam();
      }
      if (!camRef.current.ready) focusEntrance();
      const ctx = canvas.getContext("2d");
      if (ctx && canvas.clientWidth > 0) {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const { cssW, cssH, scale, viewW, viewH } = viewOf();
        const w = Math.round(cssW * dpr);
        const h = Math.round(cssH * dpr);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        ctx.setTransform(dpr * scale, 0, 0, dpr * scale, -camRef.current.x * dpr * scale, -camRef.current.y * dpr * scale);
        draw(ctx, sim, artRef.current, now / 1000, {
          hover: hoverRef.current,
          armed: coarse ? armedRef.current : null,
          reduceMotion: reduce,
          camX: camRef.current.x,
          camY: camRef.current.y,
          viewW,
          viewH,
        });
        const mini = 148;
        const mx = 12;
        const my = cssH - mini - 12;
        miniRef.current = { x: mx, y: my, s: mini };
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = "rgba(12,18,16,0.88)";
        ctx.fillRect(mx, my, mini, mini);
        ctx.strokeStyle = "#2a3834";
        ctx.lineWidth = 1;
        ctx.strokeRect(mx + 0.5, my + 0.5, mini - 1, mini - 1);
        const sx = mini / 200;
        ctx.fillStyle = "#18343a";
        for (const cell of sim.road) {
          ctx.fillRect(mx + cell.c * sx, my + cell.r * sx, Math.max(1.2, sx), Math.max(1.2, sx));
        }
        ctx.fillStyle = "#3ecfb2";
        for (const cell of sim.grid.spawns) ctx.fillRect(mx + cell.c * sx - 1.5, my + cell.r * sx - 1.5, 4, 4);
        ctx.fillStyle = "#e3c36a";
        for (const cell of sim.grid.goals) ctx.fillRect(mx + cell.c * sx - 1.5, my + cell.r * sx - 1.5, 4, 4);
        ctx.strokeStyle = "#e7f0ea";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(
          mx + (camRef.current.x / CELL) * sx,
          my + (camRef.current.y / CELL) * sx,
          Math.max(6, (viewW / CELL) * sx),
          Math.max(6, (viewH / CELL) * sx),
        );
      }
      ui += dt;
      if (ui > 0.2) {
        ui = 0;
        setHud(sim.snapshot());
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onHide = () => {
      if (document.hidden && sim.phase === "fight") {
        sim.paused = true;
        setHud(sim.snapshot());
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target;
      if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
      keysRef.current.add(e.key.toLowerCase());
      if (e.code === "Space") {
        e.preventDefault();
        if (!e.repeat && sim.phase === "prep" && prologue >= PROLOGUE.length) sim.startWave();
      } else if (e.key === "Escape") {
        sim.cancelArm();
        armedRef.current = null;
      } else if (e.key === "9") {
        sim.arm("gate");
      } else if (e.key >= "1" && e.key <= "8") {
        const tower = TOWERS[Number(e.key) - 1];
        if (tower) sim.arm(tower.id);
      } else if (["arrowleft", "arrowright", "arrowup", "arrowdown", "a", "d", "w", "s"].includes(e.key.toLowerCase())) {
        e.preventDefault();
        return;
      } else return;
      setHud(sim.snapshot());
    };
    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const old = camRef.current.scale;
      const next = Math.min(2.6, Math.max(minScale(), old * (e.deltaY < 0 ? 1.12 : 1 / 1.12)));
      const wx = camRef.current.x + (e.clientX - rect.left) / old;
      const wy = camRef.current.y + (e.clientY - rect.top) / old;
      camRef.current.scale = next;
      camRef.current.x = wx - (e.clientX - rect.left) / next;
      camRef.current.y = wy - (e.clientY - rect.top) / next;
      clampCam();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      cancelAnimationFrame(raf);
      keysRef.current.clear();
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [screen, sim, prologue, coarse]);

  useEffect(() => {
    if (tab === "log" && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [hud.log.length, tab]);

  function sync() {
    setHud(sim.snapshot());
  }

  function worldFrom(e: { clientX: number; clientY: number; currentTarget: HTMLCanvasElement }) {
    const rect = e.currentTarget.getBoundingClientRect();
    const scale = camRef.current.scale || 1;
    return {
      x: camRef.current.x + (e.clientX - rect.left) / scale,
      y: camRef.current.y + (e.clientY - rect.top) / scale,
      localX: e.clientX - rect.left,
      localY: e.clientY - rect.top,
    };
  }

  function cellFrom(e: PointerEvent<HTMLCanvasElement>) {
    const p = worldFrom(e);
    return {
      c: Math.floor(p.x / CELL),
      r: Math.floor(p.y / CELL),
    };
  }

  function jumpMini(localX: number, localY: number) {
    const mini = miniRef.current;
    if (localX < mini.x || localY < mini.y || localX > mini.x + mini.s || localY > mini.y + mini.s) return false;
    const canvas = canvasRef.current;
    if (!canvas) return true;
    const gx = ((localX - mini.x) / mini.s) * WORLD_W;
    const gy = ((localY - mini.y) / mini.s) * WORLD_H;
    const viewW = canvas.clientWidth / camRef.current.scale;
    const viewH = canvas.clientHeight / camRef.current.scale;
    camRef.current.x = gx - viewW / 2;
    camRef.current.y = gy - viewH / 2;
    const maxX = Math.max(0, WORLD_W - viewW);
    const maxY = Math.max(0, WORLD_H - viewH);
    camRef.current.x = Math.max(0, Math.min(maxX, camRef.current.x));
    camRef.current.y = Math.max(0, Math.min(maxY, camRef.current.y));
    return true;
  }

  function act(cell: { c: number; r: number }) {
    if (prologue < PROLOGUE.length) return;
    if (sim.phase === "victory" || sim.phase === "defeat") return;
    if (sim.buildType) {
      if (coarse) {
        const armed = armedRef.current;
        if (armed && armed.c === cell.c && armed.r === cell.r) {
          sim.place(cell.c, cell.r);
          armedRef.current = null;
        } else {
          armedRef.current = cell;
          const occupied = sim.towers.some((t) => t.c === cell.c && t.r === cell.r);
          if (occupied) {
            sim.place(cell.c, cell.r);
            armedRef.current = null;
          }
        }
      } else {
        sim.place(cell.c, cell.r);
      }
    } else {
      sim.selectAt(cell.c, cell.r);
    }
    sync();
  }

  function onPointerDown(e: PointerEvent<HTMLCanvasElement>) {
    sfxRef.current?.resume();
    const localX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const localY = e.clientY - e.currentTarget.getBoundingClientRect().top;
    if (e.button === 0 && jumpMini(localX, localY)) return;
    const cell = cellFrom(e);
    hoverRef.current = cell;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* pointer id may already be released */
    }
    dragRef.current = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      camX: camRef.current.x,
      camY: camRef.current.y,
      moved: e.button === 1 || e.button === 2,
      cell,
    };
  }

  function onPointerMove(e: PointerEvent<HTMLCanvasElement>) {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) {
      if (e.pointerType !== "touch") hoverRef.current = cellFrom(e);
      return;
    }
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (Math.hypot(dx, dy) > 7) drag.moved = true;
    if (drag.moved) {
      const canvas = canvasRef.current;
      camRef.current.x = drag.camX - dx / camRef.current.scale;
      camRef.current.y = drag.camY - dy / camRef.current.scale;
      if (canvas) {
        const viewW = canvas.clientWidth / camRef.current.scale;
        const viewH = canvas.clientHeight / camRef.current.scale;
        camRef.current.x = Math.max(0, Math.min(Math.max(0, WORLD_W - viewW), camRef.current.x));
        camRef.current.y = Math.max(0, Math.min(Math.max(0, WORLD_H - viewH), camRef.current.y));
      }
    }
  }

  function onPointerUp(e: PointerEvent<HTMLCanvasElement>) {
    const drag = dragRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    dragRef.current = null;
    if (!drag.moved && e.button === 0) act(drag.cell);
  }

  function look(mode: "entrance" | "all") {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (mode === "all") {
      camRef.current.scale = Math.min(canvas.clientWidth / WORLD_W, canvas.clientHeight / WORLD_H);
      camRef.current.x = 0;
      camRef.current.y = 0;
      camRef.current.ready = true;
      return;
    }
    camRef.current.ready = false;
  }

  function beginLevel(id: string, mode: RunMode) {
    const level = levelById(id);
    sfxRef.current?.resume();
    sim.reset(mode, level.grid, {
      waves: level.waves,
      levelName: level.name,
      gold: level.gold,
      lives: level.lives,
      story: mode === "story" && level.story,
    });
    setPrologue(mode === "story" && level.story ? 0 : PROLOGUE.length);
    camRef.current.ready = false;
    setScreen("play");
    setTab("build");
    sync();
  }

  function restart() {
    const level = LEVELS.find((item) => item.name === sim.levelName) ?? LEVELS[0];
    sim.reset(sim.mode, level.grid, {
      waves: level.waves,
      levelName: level.name,
      gold: level.gold,
      lives: level.lives,
      story: sim.mode === "story" && level.story,
    });
    setPrologue(PROLOGUE.length);
    armedRef.current = null;
    camRef.current.ready = false;
    sync();
  }

  const playing = screen === "play";
  const wave = { id: hud.waveNumber, name: hud.waveName, line: hud.waveLine };

  return (
    <main className="min-h-dvh bg-bg text-fg">
      {!playing ? (
        <Menu
          record={record}
          onStart={(id) => beginLevel(id, "story")}
          onEndless={(id) => beginLevel(id, "endless")}
        />
      ) : (
        <div className="mx-auto flex min-h-dvh max-w-6xl flex-col">
          <header className="flex flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-2">
            <div>
              <p className="font-display text-lg leading-none">澄潮守城</p>
              <p className="text-sm text-muted">
                {hud.levelName} · {hud.mode === "endless" ? `無盡第 ${wave.id} 潮` : `第 ${wave.id} / ${hud.waveCount} 波`} · {wave.name}
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Stat icon={<Heart className="size-4" />} label="生命" value={hud.lives} danger={hud.lives <= 5} />
              <Stat icon={<Shield className="size-4" />} label="護盾" value={hud.shield} />
              <Stat icon={<Coins className="size-4" />} label="金幣" value={hud.gold} gold />
            </div>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <button
                type="button"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-line bg-surface-2 px-3"
                onClick={() => {
                  sim.paused = !sim.paused;
                  sync();
                }}
                aria-label={hud.paused ? "繼續" : "暫停"}
              >
                {hud.paused ? <Play className="size-4" /> : <Pause className="size-4" />}
              </button>
              <button
                type="button"
                className={cn(
                  "inline-flex min-h-11 items-center gap-1 rounded-xl border border-line px-3 text-sm",
                  hud.speed === 2 ? "bg-primary text-bg" : "bg-surface-2 text-fg",
                )}
                onClick={() => {
                  sim.speed = sim.speed === 1 ? 2 : 1;
                  sync();
                }}
              >
                <FastForward className="size-4" />
                {hud.speed === 2 ? "兩倍" : "原速"}
              </button>
              <button
                type="button"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-line bg-surface-2"
                onClick={() => {
                  const next = !muted;
                  setMuted(next);
                  if (sfxRef.current) sfxRef.current.muted = next;
                }}
                aria-label={muted ? "開啟音效" : "關閉音效"}
              >
                {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
              </button>
              <button
                type="button"
                className="inline-flex min-h-11 items-center gap-1 rounded-xl border border-line bg-surface-2 px-3 text-sm"
                onClick={restart}
              >
                <RotateCcw className="size-4" />
                重開
              </button>
            </div>
          </header>

          <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="relative h-[calc(100dvh-8.75rem)] min-h-80 bg-bg">
              <canvas
                ref={canvasRef}
                className="block h-full w-full touch-none"
                aria-label="200 乘 200 的澄洲。拖曳移動視角，點小地圖跳到別處，點格子放樁。"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onPointerLeave={() => {
                  hoverRef.current = null;
                }}
                onContextMenu={(e) => e.preventDefault()}
              />
              <div className="absolute right-3 top-3 flex gap-2">
                <button type="button" className="min-h-11 rounded-xl border border-line bg-surface/90 px-3 text-sm" onClick={() => look("entrance")}>
                  回到入口
                </button>
                <button type="button" className="min-h-11 rounded-xl border border-line bg-surface/90 px-3 text-sm" onClick={() => look("all")}>
                  看全圖
                </button>
              </div>
              {hud.toast ? (
                <p className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-surface px-3 py-1 text-sm text-gold">
                  {hud.toast}
                </p>
              ) : null}
              {hud.phase === "prep" && prologue >= PROLOGUE.length ? (
                <p className="absolute bottom-3 left-44 right-3 text-sm text-muted">
                  {coarse && hud.buildType
                    ? "拖曳看別處。點一次看射程，同一格再點一次才放樁。"
                    : "拖曳或 WASD 移動視角，滾輪縮放。左下小地圖可跳到別的入口。點一下才放樁。"}
                </p>
              ) : null}
            </div>

            <aside className="flex flex-col border-t border-line bg-surface lg:border-t-0 lg:border-l">
              <div className="border-b border-line p-3">
                {hud.phase === "prep" ? (
                  <button
                    type="button"
                    className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-bg"
                    onClick={() => {
                      sfxRef.current?.resume();
                      sim.startWave();
                      sync();
                    }}
                  >
                    <Swords className="size-4" />
                    派出第 {wave.id} 波
                  </button>
                ) : hud.phase === "fight" ? (
                  <p className="text-sm text-muted">
                    交戰中 · 場上 {hud.enemyCount} · 未登場 {hud.queueLeft}
                    {hud.paused ? " · 已暫停" : ""}
                  </p>
                ) : (
                  <p className="text-sm text-muted">{hud.phase === "victory" ? "城門守住了" : "城燈滅了"}</p>
                )}
                <p className="mt-3 border-l-2 border-primary pl-3 text-sm leading-relaxed">{wave.line}</p>
              </div>

              {hud.selected ? (
                <Inspector
                  hud={hud}
                  onUpgrade={(path) => {
                    sim.upgrade(path);
                    sync();
                  }}
                  onAim={(mode) => {
                    sim.setAim(mode);
                    sync();
                  }}
                  onSell={() => {
                    sim.sell();
                    sync();
                  }}
                />
              ) : null}

              <div className="flex border-b border-line">
                {(
                  [
                    ["build", "布陣"],
                    ["log", "戰報"],
                    ["cast", "人物"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    className={cn(
                      "min-h-11 flex-1 text-sm",
                      tab === id ? "text-primary" : "text-muted",
                    )}
                    onClick={() => setTab(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-3">
                {tab === "build" ? (
                  <div>
                    {hud.buildType ? <ArmedTraits id={hud.buildType} /> : (
                      <p className="mb-3 text-sm text-muted">點一張卡看屬性，再點地圖放樁。越強的殘響掉越多金幣。</p>
                    )}
                    <div className="grid grid-cols-2 gap-2">
                    {TOWERS.map((tower) => {
                      const open = hud.waveIndex + 1 >= tower.unlockWave;
                      const armed = hud.buildType === tower.id;
                      return (
                        <button
                          key={tower.id}
                          type="button"
                          disabled={!open || hud.phase === "victory" || hud.phase === "defeat"}
                          onClick={() => {
                            sim.arm(tower.id);
                            armedRef.current = null;
                            sync();
                          }}
                          className={cn(
                            "flex min-h-11 gap-2 rounded-xl border p-2 text-left",
                            armed ? "border-primary bg-surface-2" : "border-line bg-bg",
                            !open && "opacity-50",
                          )}
                        >
                          <img
                            src={tower.art}
                            alt=""
                            className="size-12 shrink-0 rounded-full object-cover"
                          />
                          <span className="min-w-0">
                            <span className="flex items-center gap-1 text-sm font-medium">
                              {tower.name}
                              {!open ? <Lock className="size-3" /> : null}
                            </span>
                            <span className={cn("block text-sm", hud.gold < tower.cost ? "text-danger" : "text-gold")}>
                              {open ? `${tower.cost} 金` : `第 ${tower.unlockWave} 波`}
                            </span>
                            {open ? <TraitChips ids={tower.traits} /> : null}
                          </span>
                        </button>
                      );
                    })}
                    </div>
                  </div>
                ) : null}
                {tab === "log" ? (
                  <div ref={logRef} className="max-h-80 space-y-2 overflow-y-auto text-sm leading-relaxed">
                    {hud.log.map((line, i) => (
                      <p key={`${i}-${line.slice(0, 8)}`} className="text-muted">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : null}
                {tab === "cast" ? <Codex /> : null}
              </div>
            </aside>
          </div>
        </div>
      )}

      {playing && prologue < PROLOGUE.length ? (
        <StoryCard
          speaker={PROLOGUE[prologue].speaker}
          text={PROLOGUE[prologue].text}
          step={`${prologue + 1} / ${PROLOGUE.length}`}
          primary={prologue === PROLOGUE.length - 1 ? "踏上城垛" : "繼續"}
          onNext={() => setPrologue((n) => n + 1)}
          onSkip={() => setPrologue(PROLOGUE.length)}
        />
      ) : null}

      {playing && (hud.phase === "victory" || hud.phase === "defeat") ? (
        <StoryCard
          speaker={hud.phase === "victory" ? ENDING.winTitle : ENDING.loseTitle}
          text={hud.phase === "victory" ? ENDING.win : ENDING.lose}
          step={`擊殺 ${hud.kills} · 漏網 ${hud.leaks} · 餘金 ${hud.gold}`}
          primary="重新開始"
          onNext={restart}
        />
      ) : null}
    </main>
  );
}

function Menu({
  record,
  onStart,
  onEndless,
}: {
  record: SaveData;
  onStart: (id: string) => void;
  onEndless: (id: string) => void;
}) {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <img
        src="/art/chaoxi.png"
        alt=""
        className="pointer-events-none absolute right-0 top-0 h-full w-auto max-w-none object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-linear-to-r from-bg via-bg/92 to-bg/25" />
      <div className="relative mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-5 px-5 py-10">
        <p className="text-sm tracking-widest text-primary">200 × 200 澄洲</p>
        <h1 className="font-display text-5xl text-fg">澄潮守城</h1>
        <p className="max-w-xl text-base leading-relaxed text-muted">
          潮徑拉得很長，視角不再鎖在地圖中間。拖曳、滾輪或 WASD 都能看向別的入口。多個入口的波次會把兵平均拆開。
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {LEVELS.map((level) => (
            <article key={level.id} className="rounded-2xl border border-line bg-surface/80 p-3">
              <h2 className="font-display text-xl">{level.name}</h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">{level.blurb}</p>
              <p className="mt-2 text-sm text-gold">
                {level.grid.spawns.length} 入口 · {level.grid.goals.length} 終點 · {level.waves.length} 波
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-primary px-3 text-sm font-medium text-bg"
                  onClick={() => onStart(level.id)}
                >
                  <Play className="mr-1 size-4" />
                  {level.story ? "故事" : "進入"}
                </button>
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-3 text-sm"
                  onClick={() => onEndless(level.id)}
                >
                  無盡
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className="text-sm text-muted">
          {record.bestWave > 0 ? `最遠第 ${record.bestWave} 波 · 守成 ${record.wins} 次` : "尚無守城紀錄"}
          {record.endlessBest > 0 ? ` · 無盡到第 ${record.endlessBest} 潮` : ""}
        </p>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  gold,
  danger,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  gold?: boolean;
  danger?: boolean;
}) {
  return (
    <div className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-bg px-3">
      <span className={gold ? "text-gold" : danger ? "text-danger" : "text-primary"}>{icon}</span>
      <span className="text-sm text-muted">{label}</span>
      <span className={cn("text-base font-medium", danger && "text-danger", gold && "text-gold")}>{value}</span>
    </div>
  );
}

function Inspector({
  hud,
  onUpgrade,
  onAim,
  onSell,
}: {
  hud: HudSnap;
  onUpgrade: (path: "dmg" | "rate") => void;
  onAim: (mode: AimMode) => void;
  onSell: () => void;
}) {
  const sel = hud.selected;
  if (!sel) return null;
  const def = TOWERS.find((t) => t.id === sel.typeId);
  return (
    <div className="space-y-3 border-b border-line p-3">
      <div className="flex items-center gap-3">
        {def ? <img src={def.art} alt="" className="size-12 rounded-full object-cover" /> : null}
        <div>
          <p className="font-display text-lg leading-none">{sel.name}</p>
          <p className="text-sm text-muted">{sel.title}</p>
        </div>
      </div>
      <p className="text-sm text-muted">
        傷害 {sel.damage} · 射速 {sel.rate}/秒 · 射程 {Math.round((sel.range / CELL) * 10) / 10} 格
      </p>
      {def ? <TraitList ids={def.traits} /> : null}
      <div className="grid grid-cols-2 gap-2">
        <UpgradeButton
          label="傷害"
          rank={sel.dmgRank}
          cost={sel.dmgCost}
          next={sel.nextDamage == null ? null : String(sel.nextDamage)}
          gold={hud.gold}
          onClick={() => onUpgrade("dmg")}
        />
        <UpgradeButton
          label="射速"
          rank={sel.rateRank}
          cost={sel.rateCost}
          next={sel.nextRate == null ? null : `${sel.nextRate}/秒`}
          gold={hud.gold}
          onClick={() => onUpgrade("rate")}
        />
      </div>
      <div className="grid grid-cols-4 gap-1">
        {AIM_ORDER.map((mode) => (
          <button
            key={mode}
            type="button"
            className={cn(
              "min-h-11 rounded-lg text-sm",
              sel.mode === mode ? "bg-primary text-bg" : "bg-surface-2 text-fg",
            )}
            onClick={() => onAim(mode)}
          >
            {AIM_LABEL[mode]}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="min-h-11 w-full rounded-xl border border-line text-sm text-muted"
        onClick={onSell}
      >
        出售，返還 {sel.sell} 金
      </button>
    </div>
  );
}

function UpgradeButton({
  label,
  rank,
  cost,
  next,
  gold,
  onClick,
}: {
  label: string;
  rank: number;
  cost: number | null;
  next: string | null;
  gold: number;
  onClick: () => void;
}) {
  const maxed = cost == null;
  return (
    <button
      type="button"
      disabled={maxed || gold < (cost ?? 0)}
      onClick={onClick}
      className="min-h-11 rounded-xl border border-line bg-surface-2 px-2 text-sm disabled:opacity-40"
    >
      <span className="block">{label} {rank}/3</span>
      <span className="block text-gold">{maxed ? "已滿" : `${cost} 金 → ${next}`}</span>
    </button>
  );
}

function TraitChips({ ids }: { ids: TraitId[] }) {
  return (
    <span className="mt-1 flex flex-wrap gap-1">
      {ids.map((id) => (
        <span key={id} className="rounded-full bg-surface-2 px-1.5 py-0.5 text-xs text-primary">
          {TRAITS[id].name}
        </span>
      ))}
    </span>
  );
}

function TraitList({ ids }: { ids: TraitId[] }) {
  return (
    <ul className="space-y-1">
      {ids.map((id) => (
        <li key={id} className="text-sm leading-relaxed text-muted">
          <span className="text-primary">{TRAITS[id].name}</span>
          <span> · {TRAITS[id].hint}</span>
        </li>
      ))}
    </ul>
  );
}

function ArmedTraits({ id }: { id: string }) {
  const tower = TOWERS.find((item) => item.id === id);
  if (!tower) return null;
  return (
    <div className="mb-3 rounded-xl border border-line bg-bg p-3">
      <p className="font-display text-base">{tower.name}</p>
      <p className="mb-2 text-sm text-muted">{tower.blurb}</p>
      <TraitList ids={tower.traits} />
    </div>
  );
}

function Codex() {
  const kinds: EnemyKind[] = ["wisp", "swift", "shell", "core"];
  return (
    <div className="space-y-4">
      {TOWERS.map((tower) => (
        <article key={tower.id} className="flex gap-3">
          <img src={tower.art} alt="" className="size-14 shrink-0 rounded-full object-cover" />
          <div>
            <h2 className="font-display text-base">
              {tower.name}
              <span className="ml-2 text-sm text-muted">{tower.title}</span>
            </h2>
            <TraitList ids={tower.traits} />
            <p className="mt-1 text-sm leading-relaxed text-muted">{tower.story}</p>
          </div>
        </article>
      ))}
      <h2 className="flex items-center gap-2 font-display text-base">
        <BookOpen className="size-4 text-primary" />
        殘響
      </h2>
      {kinds.map((kind) => {
        const enemy = ENEMIES[kind];
        return (
          <p key={kind} className="text-sm leading-relaxed text-muted">
            <span className="text-fg">{enemy.name}。</span>
            <span className="text-gold"> 基礎 {enemy.gold} 金，波次越後越高。</span>
            {enemy.blurb}
          </p>
        );
      })}
    </div>
  );
}

function StoryCard({
  speaker,
  text,
  step,
  primary,
  onNext,
  onSkip,
}: {
  speaker: string;
  text: string;
  step: string;
  primary: string;
  onNext: () => void;
  onSkip?: () => void;
}) {
  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-bg/70 p-4 sm:items-center">
      <div className="w-full max-w-lg rounded-2xl border border-line bg-surface p-5">
        <p className="text-sm text-primary">{speaker}</p>
        <p className="mt-2 text-base leading-relaxed">{text}</p>
        <p className="mt-3 text-sm text-muted">{step}</p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-primary text-sm font-medium text-bg"
            onClick={onNext}
          >
            {primary}
          </button>
          {onSkip ? (
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-sm text-muted"
              onClick={onSkip}
            >
              跳過
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
