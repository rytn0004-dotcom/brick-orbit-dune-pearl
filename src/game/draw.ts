import {
  CELL,
  COLS,
  ENEMIES,
  ROWS,
  TOWER_BY_ID,
  WORLD_H,
  WORLD_W,
  type TowerDef,
} from "./content";
import type { Bolt, DefenseSim, Enemy, Tower } from "./sim";

export interface DrawView {
  hover: { c: number; r: number } | null;
  armed: { c: number; r: number } | null;
  reduceMotion: boolean;
  camX: number;
  camY: number;
  viewW: number;
  viewH: number;
}

const artReady = (img: HTMLImageElement | undefined): img is HTMLImageElement =>
  !!img && img.complete && img.naturalWidth > 0;

export function draw(
  ctx: CanvasRenderingContext2D,
  sim: DefenseSim,
  art: Record<string, HTMLImageElement | undefined>,
  time: number,
  view: DrawView,
) {
  ctx.clearRect(view.camX - 4, view.camY - 4, view.viewW + 8, view.viewH + 8);
  ctx.save();
  if (sim.shake > 0 && !view.reduceMotion) {
    const m = sim.shake * 14;
    ctx.translate((Math.random() - 0.5) * m, (Math.random() - 0.5) * m);
  }

  paintGround(ctx, time, view);
  paintCells(ctx, sim, view);
  paintPath(ctx, sim, time);
  paintLandmarks(ctx, sim, time);

  const ghost = sim.buildType ? (view.armed ?? view.hover) : null;
  if (sim.buildType === "gate" && ghost) {
    paintCellTint(ctx, ghost.c, ghost.r, sim.canBuild(ghost.c, ghost.r));
  } else if (sim.buildType && ghost) {
    paintRange(
      ctx,
      (ghost.c + 0.5) * CELL,
      (ghost.r + 0.5) * CELL,
      TOWER_BY_ID[sim.buildType].range,
      sim.canBuild(ghost.c, ghost.r),
    );
  } else if (sim.selectedId != null) {
    const tower = sim.towers.find((t) => t.id === sim.selectedId);
    if (tower && tower.role === "tower") {
      const def = TOWER_BY_ID[tower.typeId];
      paintRange(ctx, tower.x, tower.y, def.range, true);
    }
  }

  for (const tower of sim.towers) paintTower(ctx, tower, art, sim.selectedId === tower.id, time, view.reduceMotion);
  if (sim.buildType === "gate" && ghost && sim.canBuild(ghost.c, ghost.r)) {
    paintGateShape(ctx, (ghost.c + 0.5) * CELL, (ghost.r + 0.5) * CELL, 0.55);
  } else if (sim.buildType && ghost && sim.canBuild(ghost.c, ghost.r)) {
    paintGhost(ctx, ghost.c, ghost.r, TOWER_BY_ID[sim.buildType], art);
  }

  for (const enemy of sim.enemies) paintEnemy(ctx, enemy, art, time);
  for (const bolt of sim.bolts) paintBolt(ctx, bolt);
  for (const zap of sim.zaps) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, zap.life / zap.max);
    ctx.strokeStyle = zap.color;
    ctx.lineWidth = 2.4;
    ctx.lineJoin = "round";
    ctx.beginPath();
    zap.pts.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.stroke();
    ctx.restore();
  }
  for (const p of sim.particles) {
    ctx.globalAlpha = Math.max(0, p.life / p.max);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  for (const f of sim.floaters) {
    ctx.globalAlpha = Math.max(0, f.life / f.max);
    ctx.fillStyle = f.color;
    ctx.font = "700 13px 'Noto Sans TC', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(f.text, f.x, f.y);
  }
  ctx.globalAlpha = 1;

  if (sim.bannerT > 0 && sim.banner) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, sim.bannerT);
    ctx.fillStyle = "#e7f0ea";
    ctx.font = "700 22px 'Noto Serif TC', serif";
    ctx.textAlign = "center";
    ctx.fillText(sim.banner, view.camX + view.viewW / 2, view.camY + 28);
    ctx.restore();
  }
  ctx.restore();
}

function bounds(view: DrawView) {
  return {
    c0: Math.max(0, Math.floor(view.camX / CELL) - 1),
    r0: Math.max(0, Math.floor(view.camY / CELL) - 1),
    c1: Math.min(COLS - 1, Math.ceil((view.camX + view.viewW) / CELL) + 1),
    r1: Math.min(ROWS - 1, Math.ceil((view.camY + view.viewH) / CELL) + 1),
  };
}

function paintGround(ctx: CanvasRenderingContext2D, time: number, view: DrawView) {
  ctx.fillStyle = "#101614";
  ctx.fillRect(view.camX, view.camY, view.viewW, view.viewH);
  const { c0, r0, c1, r1 } = bounds(view);
  const fine = view.viewW / CELL < 48;
  if (!fine) return;
  ctx.strokeStyle = "rgba(42,56,52,0.85)";
  ctx.lineWidth = 1;
  for (let c = c0; c <= c1 + 1; c++) {
    ctx.beginPath();
    ctx.moveTo(c * CELL + 0.5, r0 * CELL);
    ctx.lineTo(c * CELL + 0.5, (r1 + 1) * CELL);
    ctx.stroke();
  }
  for (let r = r0; r <= r1 + 1; r++) {
    ctx.beginPath();
    ctx.moveTo(c0 * CELL, r * CELL + 0.5);
    ctx.lineTo((c1 + 1) * CELL, r * CELL + 0.5);
    ctx.stroke();
  }
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = "#3ecfb2";
  for (let i = 0; i < 12; i++) {
    const x = view.camX + ((i * 97 + time * 12) % view.viewW);
    const y = view.camY + ((i * 53) % view.viewH);
    ctx.fillRect(x, y, 2, 2);
  }
  ctx.globalAlpha = 1;
}

function paintCells(ctx: CanvasRenderingContext2D, sim: DefenseSim, view: DrawView) {
  const { c0, r0, c1, r1 } = bounds(view);
  const road = new Set(sim.road.map((cell) => cell.r * COLS + cell.c));
  for (let r = r0; r <= r1; r++) {
    for (let c = c0; c <= c1; c++) {
      const kind = sim.grid.cells[r * COLS + c];
      const x = c * CELL;
      const y = r * CELL;
      if (kind === "wall") {
        ctx.fillStyle = "#1a1916";
        ctx.fillRect(x + 1, y + 1, CELL - 2, CELL - 2);
        continue;
      }
      if (kind === "pad") {
        ctx.fillStyle = "rgba(62,207,178,0.07)";
        ctx.fillRect(x + 2, y + 2, CELL - 4, CELL - 4);
        continue;
      }
      if (road.has(r * COLS + c)) continue;
    }
  }
  const hover = view.armed ?? view.hover;
  if (!hover || !sim.buildType) return;
  paintCellTint(ctx, hover.c, hover.r, sim.canBuild(hover.c, hover.r));
}

function paintCellTint(ctx: CanvasRenderingContext2D, c: number, r: number, ok: boolean) {
  ctx.fillStyle = ok ? "rgba(62,207,178,0.16)" : "rgba(225,93,108,0.18)";
  ctx.fillRect(c * CELL + 2, r * CELL + 2, CELL - 4, CELL - 4);
}

function paintPath(ctx: CanvasRenderingContext2D, sim: DefenseSim, time: number) {
  for (const cell of sim.road) {
    const x = cell.c * CELL;
    const y = cell.r * CELL;
    ctx.fillStyle = "#142226";
    round(ctx, x + 3, y + 3, CELL - 6, CELL - 6, 6);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(62,207,178,0.85)";
  ctx.lineWidth = 2;
  ctx.setLineDash([8, 10]);
  ctx.lineDashOffset = -time * 28;
  for (const lane of sim.lanes) {
    if (lane.length < 2) continue;
    ctx.beginPath();
    lane.forEach((cell, i) => {
      const x = (cell.c + 0.5) * CELL;
      const y = (cell.r + 0.5) * CELL;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }
  ctx.setLineDash([]);
}

function paintLandmarks(ctx: CanvasRenderingContext2D, sim: DefenseSim, time: number) {
  sim.grid.spawns.forEach((cell, index) => {
    const x = (cell.c + 0.5) * CELL;
    const y = (cell.r + 0.5) * CELL;
    ctx.save();
    ctx.translate(x, y);
    ctx.strokeStyle = "#3ecfb2";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 10 + Math.sin(time * 3 + index) * 1.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
    ctx.fillStyle = "#93a39c";
    ctx.font = "600 11px 'Noto Sans TC', sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`入口${index + 1}`, x + 12, y - 8);
  });
  sim.grid.goals.forEach((cell, index) => {
    const x = (cell.c + 0.5) * CELL;
    const y = (cell.r + 0.5) * CELL;
    ctx.save();
    ctx.translate(x, y);
    if (sim.gateFlash > 0) {
      ctx.fillStyle = `rgba(225,93,108,${0.25 + sim.gateFlash})`;
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = "#e3c36a";
    ctx.lineWidth = 2;
    ctx.strokeRect(-8, -8, 16, 16);
    ctx.restore();
    ctx.fillStyle = "#e3c36a";
    ctx.font = "600 11px 'Noto Sans TC', sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(`終點${index + 1}`, x - 12, y - 8);
  });
}

function paintRange(ctx: CanvasRenderingContext2D, x: number, y: number, range: number, ok: boolean) {
  ctx.beginPath();
  ctx.arc(x, y, range, 0, Math.PI * 2);
  ctx.fillStyle = ok ? "rgba(62,207,178,0.08)" : "rgba(225,93,108,0.08)";
  ctx.fill();
  ctx.strokeStyle = ok ? "rgba(62,207,178,0.7)" : "rgba(225,93,108,0.75)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function paintTower(
  ctx: CanvasRenderingContext2D,
  tower: Tower,
  art: Record<string, HTMLImageElement | undefined>,
  selected: boolean,
  time: number,
  reduce: boolean,
) {
  if (tower.role === "gate") {
    paintStructure(ctx, tower, time, reduce, selected);
    return;
  }
  const def = TOWER_BY_ID[tower.typeId];
  const breathe = reduce ? 1 : 1 + Math.sin(time * 2.2 + tower.id) * 0.025;
  const kick = reduce ? 0 : tower.recoil * 6;
  ctx.save();
  ctx.translate(
    tower.x - Math.cos(tower.angle) * kick,
    tower.y - Math.sin(tower.angle) * kick,
  );
  ctx.scale(breathe, breathe);
  ctx.fillStyle = "rgba(0,0,0,0.35)";
  ctx.beginPath();
  ctx.ellipse(0, 16, 16, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.rotate(tower.angle);
  ctx.strokeStyle = def.color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(8, 0);
  ctx.lineTo(20, 0);
  ctx.stroke();
  ctx.rotate(-tower.angle);

  const rad = 18;
  ctx.beginPath();
  ctx.arc(0, 0, rad, 0, Math.PI * 2);
  ctx.save();
  ctx.clip();
  const img = art[def.art];
  if (artReady(img)) drawCover(ctx, img, rad * 2);
  else {
    ctx.fillStyle = def.color;
    ctx.fillRect(-rad, -rad, rad * 2, rad * 2);
  }
  ctx.restore();
  ctx.beginPath();
  ctx.arc(0, 0, rad, 0, Math.PI * 2);
  ctx.strokeStyle = selected ? "#e7f0ea" : def.color;
  ctx.lineWidth = selected ? 3 : 2;
  ctx.stroke();
  if (tower.hitFlash > 0) {
    ctx.strokeStyle = `rgba(225,93,108,${tower.hitFlash * 3})`;
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  const pips = tower.dmgRank + tower.rateRank;
  for (let i = 0; i < pips; i++) {
    const a = -Math.PI / 2 + i * 0.45 - (pips - 1) * 0.22;
    ctx.fillStyle = i < tower.dmgRank ? "#e07848" : "#3ecfb2";
    ctx.beginPath();
    ctx.arc(Math.cos(a) * 24, Math.sin(a) * 24, 2.3, 0, Math.PI * 2);
    ctx.fill();
  }
  if (selected) {
    ctx.globalAlpha = 0.35 + Math.sin(time * 4) * 0.15;
    ctx.strokeStyle = "#e7f0ea";
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
  paintHp(ctx, tower);
}

function paintStructure(
  ctx: CanvasRenderingContext2D,
  tower: Tower,
  time: number,
  reduce: boolean,
  selected: boolean,
) {
  const jolt = !reduce && tower.hitFlash > 0 ? Math.sin(time * 40) * 2 : 0;
  ctx.save();
  ctx.globalAlpha = 0.95;
  paintGateShape(ctx, tower.x + jolt, tower.y, 1);
  if (selected) {
    ctx.strokeStyle = "#e7f0ea";
    ctx.lineWidth = 2;
    ctx.strokeRect(tower.x - 22, tower.y - 22, 44, 44);
  }
  ctx.restore();
  paintHp(ctx, tower);
}

function paintGateShape(ctx: CanvasRenderingContext2D, x: number, y: number, alpha: number) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(x, y);
  ctx.fillStyle = "#3a342c";
  ctx.fillRect(-16, -18, 8, 36);
  ctx.fillRect(8, -18, 8, 36);
  ctx.fillStyle = "#e3c36a";
  ctx.fillRect(-18, -6, 36, 8);
  ctx.restore();
}

function paintHp(ctx: CanvasRenderingContext2D, tower: Tower) {
  if (tower.hp >= tower.maxHp && tower.role !== "gate") return;
  const w = 28;
  const x = tower.x - w / 2;
  const y = tower.y + 22;
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fillRect(x, y, w, 4);
  ctx.fillStyle = tower.hp > tower.maxHp * 0.35 ? "#e3c36a" : "#e15d6c";
  ctx.fillRect(x, y, w * Math.max(0, tower.hp / tower.maxHp), 4);
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, size: number) {
  const iw = img.naturalWidth || 1;
  const ih = img.naturalHeight || 1;
  const scale = Math.max(size / iw, size / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const focus = ih > iw * 1.15 ? 0.22 : 0.5;
  ctx.drawImage(img, -dw / 2, -dh * focus, dw, dh);
}

function paintGhost(
  ctx: CanvasRenderingContext2D,
  c: number,
  r: number,
  def: TowerDef,
  art: Record<string, HTMLImageElement | undefined>,
) {
  ctx.save();
  ctx.globalAlpha = 0.55;
  ctx.translate((c + 0.5) * CELL, (r + 0.5) * CELL);
  ctx.beginPath();
  ctx.arc(0, 0, 18, 0, Math.PI * 2);
  ctx.clip();
  const img = art[def.art];
  if (artReady(img)) drawCover(ctx, img, 36);
  ctx.restore();
}

function paintEnemy(
  ctx: CanvasRenderingContext2D,
  enemy: Enemy,
  art: Record<string, HTMLImageElement | undefined>,
  time: number,
) {
  const def = ENEMIES[enemy.kind];
  const bob = Math.sin(time * 6 + enemy.id) * 2.2;
  const lunge = enemy.swing * 7;
  ctx.save();
  ctx.translate(enemy.x + Math.cos(enemy.facing) * lunge, enemy.y + bob);
  const img = !enemy.customId && def.art ? art[def.art] : undefined;
  if (enemy.customId || enemy.color) {
    ctx.fillStyle = enemy.color || "#d2b48c";
    ctx.globalAlpha = enemy.skills.includes("stealth") && enemy.hp >= enemy.maxHp * 0.98 ? 0.45 : 1;
    ctx.beginPath();
    ctx.arc(0, 0, enemy.radius * 0.72, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    if (enemy.barrier > 0) {
      ctx.strokeStyle = "#9fd4e8";
      ctx.stroke();
    }
  } else if (artReady(img)) {
    const s = enemy.kind === "swift" ? 62 : 54;
    drawCover(ctx, img, s);
  } else if (enemy.kind === "shell") {
    ctx.rotate(Math.sin(time * 2 + enemy.id) * 0.08);
    drawShell(ctx, enemy.radius);
  } else if (enemy.kind === "core") {
    drawCore(ctx, enemy.radius, time);
  } else if (enemy.kind === "claw") {
    drawClaw(ctx, enemy.radius, time, enemy.swing);
  } else if (enemy.kind === "hammer") {
    drawHammer(ctx, enemy.radius, enemy.swing);
  } else {
    ctx.fillStyle = "#3ecfb2";
    ctx.beginPath();
    ctx.arc(0, 0, enemy.radius * 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
  if (enemy.slowT > 0) {
    ctx.strokeStyle = "rgba(159,212,232,0.9)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 0, enemy.radius + 4, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (enemy.burnT > 0) {
    ctx.fillStyle = "#e07848";
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(-6, enemy.radius * 0.2, 3, 0, Math.PI * 2);
    ctx.arc(5, enemy.radius * 0.05, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  if (enemy.rootT > 0) {
    ctx.strokeStyle = "#e3c36a";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-10, enemy.radius * 0.55);
    ctx.lineTo(10, enemy.radius * 0.55);
    ctx.moveTo(-6, enemy.radius * 0.55);
    ctx.lineTo(-6, enemy.radius * 0.55 + 7);
    ctx.moveTo(6, enemy.radius * 0.55);
    ctx.lineTo(6, enemy.radius * 0.55 + 7);
    ctx.stroke();
  }
  ctx.restore();

  const w = enemy.kind === "core" ? 46 : 28;
  const x = enemy.x - w / 2;
  const y = enemy.y - enemy.radius - 10;
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fillRect(x, y, w, 4);
  const pct = Math.max(0, enemy.hp / enemy.maxHp);
  ctx.fillStyle = pct > 0.4 ? "#3ecfb2" : "#e15d6c";
  ctx.fillRect(x, y, w * pct, 4);
  if (enemy.armor > 0) {
    ctx.strokeStyle = "#e3c36a";
    ctx.strokeRect(x - 0.5, y - 0.5, w + 1, 5);
  }
}

function paintBolt(ctx: CanvasRenderingContext2D, bolt: Bolt) {
  ctx.save();
  ctx.strokeStyle = bolt.color;
  ctx.fillStyle = bolt.color;
  ctx.lineWidth = bolt.splash > 0 ? 4 : 2.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(bolt.x - bolt.vx * 0.04, bolt.y - bolt.vy * 0.04);
  ctx.lineTo(bolt.x, bolt.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(bolt.x, bolt.y, bolt.splash > 0 ? 5.5 : 3.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawClaw(ctx: CanvasRenderingContext2D, r: number, time: number, swing: number) {
  ctx.fillStyle = "#6a3a28";
  ctx.beginPath();
  ctx.ellipse(0, 2, r * 0.55, r * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#e3c36a";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(i * 5, 0);
    ctx.lineTo(i * 7 + Math.sin(time * 10 + i) * 2, -r * 0.7 - swing * 6);
    ctx.stroke();
  }
}

function drawHammer(ctx: CanvasRenderingContext2D, r: number, swing: number) {
  ctx.fillStyle = "#4a4038";
  ctx.beginPath();
  ctx.arc(0, 4, r * 0.46, 0, Math.PI * 2);
  ctx.fill();
  ctx.save();
  ctx.rotate(-0.6 + swing * 0.9);
  ctx.fillStyle = "#8a6230";
  ctx.fillRect(-3, -r, 6, r * 0.8);
  ctx.fillStyle = "#e3c36a";
  ctx.fillRect(-r * 0.55, -r - 4, r * 1.1, 10);
  ctx.restore();
}

function drawShell(ctx: CanvasRenderingContext2D, r: number) {
  ctx.fillStyle = "#221c16";
  ctx.beginPath();
  ctx.ellipse(0, 6, r * 0.72, r * 0.42, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = i === 1 ? "#e3c36a" : "#a56b3c";
    ctx.beginPath();
    ctx.arc(0, 8 - i * 7, r * (0.62 - i * 0.08), Math.PI * 1.12, Math.PI * 1.88);
    ctx.stroke();
  }
  ctx.fillStyle = "#3ecfb2";
  ctx.fillRect(-2, -4, 4, 9);
}

function drawCore(ctx: CanvasRenderingContext2D, r: number, time: number) {
  const pulse = 1 + Math.sin(time * 2.4) * 0.05;
  ctx.save();
  ctx.scale(pulse, pulse);
  ctx.fillStyle = "#160f18";
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = -Math.PI / 2 + (i / 8) * Math.PI * 2;
    const rad = r * (i % 2 === 0 ? 1 : 0.72);
    const x = Math.cos(a) * rad;
    const y = Math.sin(a) * rad;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#3ecfb2";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#f4f7f2";
  ctx.fillRect(-2, -r * 0.42, 4, r * 0.84);
  ctx.restore();
}

function round(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
