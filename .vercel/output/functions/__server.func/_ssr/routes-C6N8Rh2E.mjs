import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Shield, c as Pause, d as FastForward, f as Coins, i as Swords, l as Lock, n as Volume2, o as RotateCcw, p as BookOpen, s as Play, t as VolumeX, u as Heart } from "../_libs/lucide-react.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C6N8Rh2E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WORLD_W = 6400;
var WORLD_H = 6400;
var WAYPOINTS = [
	[0, 1],
	[4, 1],
	[4, 4],
	[1, 4],
	[1, 6],
	[7, 6],
	[7, 2],
	[10, 2],
	[10, 6],
	[11, 6]
];
var ENEMIES = {
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
		meleeEvery: 1
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
		meleeEvery: 1
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
		meleeEvery: 1
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
		meleeEvery: 1
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
		meleeEvery: .75
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
		meleeEvery: 1.05
	}
};
var TRAITS = {
	rapid: {
		name: "速射",
		hint: "攻擊很密，適合收拾成群的脆皮。"
	},
	heavy: {
		name: "高傷害",
		hint: "單發傷害高，殘血時再補一刀。"
	},
	slow: {
		name: "減速",
		hint: "命中後降低移動速度。"
	},
	burn: {
		name: "燃燒",
		hint: "留下灼燒，持續扣血，這段傷害無視鎧甲。"
	},
	root: {
		name: "阻擋",
		hint: "短暫停住腳步。剛被放開的殘響會短暫免疫。"
	},
	shield: {
		name: "護盾",
		hint: "每次攻擊為城門加一點護盾，漏怪時先扣盾。"
	},
	splash: {
		name: "濺射",
		hint: "爆炸打中範圍內所有殘響。"
	},
	chain: {
		name: "連鎖",
		hint: "傷害會跳到附近的其他殘響。"
	},
	pierce: {
		name: "破甲",
		hint: "直接傷害不吃鎧甲減免。"
	}
};
var TOWERS = [
	{
		id: "lingfeng",
		name: "泠風",
		title: "風鈴斥候",
		cost: 55,
		range: 150,
		damage: 9,
		rate: 1.55,
		splash: 0,
		slow: .82,
		slowDur: .9,
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
		story: "澄洲外圍最後的風鈴斥候。悲潮第一年，她的隊伍在裂谷邊失散，只剩這串鈴還認得回家的頻率。她叫你旅律——一種能把別人的頻率編成樁的人。你不記得這稱號，她也不打算再解釋第二次。"
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
		burn: .5,
		burnDur: 2.2,
		root: 0,
		shieldOnHit: 0,
		traits: ["rapid", "burn"],
		color: "#e07848",
		art: "/art/yanque.png",
		unlockWave: 1,
		blurb: "速射、燃燒。槍火密，還會留下無視鎧甲的灼燒。",
		join: "他踢開一具碎掉的殘響：東垛我守。樁別立在潮徑上。",
		story: "城衛隊最吵的槍手，欠城西麵攤一條命——老闆在上一回潮汛把他從門洞裡拖出來。嘴上說不信頻率，槍口卻總打在殘響的核心。疤是自己人的火藥留下的，他不讓人問。"
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
		slow: .48,
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
		story: "觀象臺的學士，把悲潮錄成可以計算的寒譜。人不善戰，卷軸很善戰。城裡的孩子怕他，因為他看人的眼神像在量一條還會不會斷的弦。"
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
		root: .55,
		shieldOnHit: 0,
		traits: [
			"heavy",
			"pierce",
			"root"
		],
		color: "#c45b6a",
		art: "/art/chiren.png",
		unlockWave: 5,
		blurb: "高傷害、破甲、阻擋。近身砍開鎧殼，並短暫停步。",
		join: "刀客舔掉唇邊的血：鎧殼吃槍子。我來近處切開頻率。",
		story: "曾是夜歸的斥候。為了切開一隻鎧殼，她把半條命押進雙刃，左眼從此用瓷片蓋住。她說痛是頻率還在的證明。嵐戟沒有把她除名，只是不再派她出遠門。"
	},
	{
		id: "leiou",
		name: "雷偶",
		title: "縛線傀師",
		cost: 175,
		range: 160,
		damage: 16,
		rate: .92,
		splash: 0,
		slow: 1,
		slowDur: 0,
		chain: 3,
		chainFalloff: .62,
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
		story: "製偶師。每條絲線都綁著一封沒送出去的信，收信的人多半已經不在城裡。肩上的瓷偶負責記得那些名字。他說雷不是懲罰，是讓信終於送到的方式。"
	},
	{
		id: "lanji",
		name: "嵐戟",
		title: "夜歸統帥",
		cost: 250,
		range: 190,
		damage: 30,
		rate: .62,
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
		story: "夜歸軍統帥，在裂谷前線守了九年，戟上的缺口比勳章多。這回回城，是因為潮聲變了調——不再像獸，像一句還沒唱完的喪歌。他認得赤刃的刀，也不點破。"
	},
	{
		id: "chimou",
		name: "熾謀",
		title: "炎策軍師",
		cost: 320,
		range: 178,
		damage: 52,
		rate: .4,
		splash: 82,
		slow: 1,
		slowDur: 0,
		chain: 0,
		chainFalloff: 1,
		style: "bolt",
		pierce: false,
		halfArmor: true,
		execute: 1,
		burn: .42,
		burnDur: 3,
		root: 0,
		shieldOnHit: 0,
		traits: [
			"heavy",
			"burn",
			"splash"
		],
		color: "#e08a3a",
		art: "/art/chimou.png",
		unlockWave: 10,
		blurb: "高傷害、燃燒、濺射。慢速大火球，炸開後還在燒。",
		join: "軍師合上扇：別省金幣。省了，就會死人。",
		story: "城主身邊的炎策。扇子一合，就是一場燒掉退路的計劃。她怕的不是殘響，是城裡的人開始把投降說成休息。焰雀嫌她冷血，每次交火仍站在她算過的那個垛口。"
	},
	{
		id: "chaoxi",
		name: "潮汐",
		title: "澄洲城主",
		cost: 440,
		range: 214,
		damage: 64,
		rate: .48,
		splash: 100,
		slow: .7,
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
		traits: [
			"shield",
			"slow",
			"splash",
			"pierce"
		],
		color: "#f0e2b0",
		art: "/art/chaoxi.png",
		unlockWave: 11,
		blurb: "護盾、減速、濺射、破甲。命中為城門積盾，漏怪先扣盾。",
		join: "城主把潮玉印送到你掌心：用在最後，不要用在炫耀。",
		story: "澄洲城主。印裡封著整座城還能震動的頻率。銀髮與獸耳是城裡認得的印記。傳說她不老，其實是一次次把自己的歲月借給城牆。"
	}
];
var GATE = {
	id: "gate",
	name: "潮閘",
	cost: 40,
	hp: 140,
	blurb: "堵住一格。殘響會改走還通得過的最短路。外框是地圖邊界，封死唯一的路時放不下去。"
};
var TOWER_BY_ID = Object.fromEntries(TOWERS.map((t) => [t.id, t]));
var WAVES = [
	{
		id: 1,
		name: "潮聲初起",
		line: "泠風：潮徑亮了。樁立在彎道內側，讓牠們多挨兩下再進門。",
		groups: [{
			kind: "wisp",
			count: 8,
			interval: 1.15,
			delay: .35
		}]
	},
	{
		id: 2,
		name: "細響成列",
		line: "焰雀：第二陣比第一陣密。金幣捏在手裡不會自己變槍。",
		groups: [{
			kind: "wisp",
			count: 12,
			interval: .78,
			delay: .2
		}]
	},
	{
		id: 3,
		name: "疾影夾縫",
		line: "霜箋：快的先拖慢。寒譜給疾影，槍口留給還在爬的游絲。",
		groups: [{
			kind: "wisp",
			count: 6,
			interval: .85,
			delay: .2
		}, {
			kind: "swift",
			count: 6,
			interval: 1.05,
			delay: 1.6
		}]
	},
	{
		id: 4,
		name: "風口再裂",
		line: "泠風：裂爪會停下來砸樁。潮閘放在亮著的捷徑上，牠們就得繞路。",
		groups: [{
			kind: "swift",
			count: 8,
			interval: .62,
			delay: .25
		}, {
			kind: "wisp",
			count: 8,
			interval: .7,
			delay: .8
		}]
	},
	{
		id: 5,
		name: "鎧殼推進",
		line: "赤刃：鎧殼吃槍子。讓我站得夠近，殼就只是殼。",
		groups: [{
			kind: "shell",
			count: 5,
			interval: 1.55,
			delay: .35
		}, {
			kind: "wisp",
			count: 8,
			interval: .7,
			delay: 1
		}]
	},
	{
		id: 6,
		name: "雙線壓境",
		line: "焰雀：鎧殼配疾影。誰漏了一隻，城門就會響。",
		groups: [{
			kind: "shell",
			count: 6,
			interval: 1.35,
			delay: .3
		}, {
			kind: "swift",
			count: 8,
			interval: .58,
			delay: 1.2
		}]
	},
	{
		id: 7,
		name: "絲線雷雨",
		line: "雷偶：擠在一起的時候，雷比槍便宜。",
		groups: [
			{
				kind: "wisp",
				count: 12,
				interval: .4,
				delay: .15
			},
			{
				kind: "swift",
				count: 7,
				interval: .55,
				delay: .8
			},
			{
				kind: "shell",
				count: 4,
				interval: 1.7,
				delay: 1.5
			}
		]
	},
	{
		id: 8,
		name: "城垛告急",
		line: "霜箋：錘骸近戰。先打死砸門的，潮閘碎了，路就會改回來。",
		groups: [{
			kind: "shell",
			count: 8,
			interval: 1.15,
			delay: .25
		}, {
			kind: "swift",
			count: 10,
			interval: .48,
			delay: .6
		}]
	},
	{
		id: 9,
		name: "夜歸回援",
		line: "嵐戟：厚的一波交給槍林。彎道不要空著。",
		groups: [
			{
				kind: "shell",
				count: 7,
				interval: 1.1,
				delay: .25
			},
			{
				kind: "wisp",
				count: 12,
				interval: .38,
				delay: .4
			},
			{
				kind: "swift",
				count: 8,
				interval: .5,
				delay: 1.8
			}
		]
	},
	{
		id: 10,
		name: "焚扇既出",
		line: "熾謀：虛潮要現形了。現在省下的金幣，等一下會變成屍體。",
		groups: [{
			kind: "swift",
			count: 12,
			interval: .4,
			delay: .2
		}, {
			kind: "shell",
			count: 8,
			interval: 1,
			delay: .7
		}]
	},
	{
		id: 11,
		name: "城印解封",
		line: "潮汐：澄洲的頻率借你。潮心之前的這一陣，是試印。",
		groups: [
			{
				kind: "shell",
				count: 8,
				interval: .95,
				delay: .2
			},
			{
				kind: "swift",
				count: 10,
				interval: .4,
				delay: .45
			},
			{
				kind: "wisp",
				count: 12,
				interval: .32,
				delay: 1
			}
		]
	},
	{
		id: 12,
		name: "虛潮之核",
		line: "潮心之外還有錘骸。潮閘可以逼牠們繞，但別把唯一的路封死。",
		groups: [
			{
				kind: "swift",
				count: 6,
				interval: .5,
				delay: .2
			},
			{
				kind: "core",
				count: 1,
				interval: 1,
				delay: 3.2
			},
			{
				kind: "shell",
				count: 5,
				interval: 1.35,
				delay: 4.2
			}
		]
	}
];
var PROLOGUE = [
	{
		speaker: "澄洲",
		text: "悲潮之後，天空留下一條不會癒合的縫。縫裡走出的東西沒有心，只會沿著潮徑走向最大的活頻率——城。人們叫它們殘響。"
	},
	{
		speaker: "泠風",
		text: "你倒在外垛上，脈搏卻像一座城。我是斥候泠風。如果你真是旅律，就把我們的頻率編成樁，守住這條路。你的名字可以以後再想。"
	},
	{
		speaker: "焰雀",
		text: "城衛焰雀。潮徑上的捷徑可以立潮閘，殘響會改走還通的最短路。封死唯一的路就放不下去。漏進燈下的每一隻，城裡就少一盞燈。"
	}
];
var ENDING = {
	winTitle: "城門還亮著",
	win: "虛潮之核碎成無聲的鹽。潮徑暗下去，像一條終於閉口的河。泠風問你記不記得自己的名字。你搖頭。城主潮汐把印按回城磚：「名字先寄在澄洲。潮還會再來，而這座城已經學會你的節奏。」",
	loseTitle: "城燈滅了",
	lose: "殘響漫過門檻時，長街的燈一盞盞熄掉。泠風的風鈴只響了一半。她的聲音斷在風裡：頻率不會真的死。還能重來。",
	endlessTitle: "潮還沒有盡頭",
	endless: "這一潮沒有最後一波。城燈滅的時候，澄洲記住你守到的那一陣。頻率還在，還能再走深一點。"
};
function buildPath() {
	const pts = WAYPOINTS.map(([c, r]) => ({
		x: (c + .5) * 32,
		y: (r + .5) * 32
	}));
	const segLens = [];
	let total = 0;
	for (let i = 0; i < pts.length - 1; i++) {
		const len = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
		segLens.push(len);
		total += len;
	}
	const cells = /* @__PURE__ */ new Set();
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
	return {
		pts,
		segLens,
		total,
		cells
	};
}
buildPath();
function endlessWave(index) {
	const n = index + 1;
	const groups = [];
	if (n % 10 === 0) groups.push({
		kind: "shell",
		count: 4 + Math.floor(n / 5),
		interval: .85,
		delay: .25
	}, {
		kind: "hammer",
		count: 2,
		interval: 1.25,
		delay: .7
	}, {
		kind: "core",
		count: 1,
		interval: 1,
		delay: 2.6
	});
	else if (n % 5 === 0) groups.push({
		kind: "swift",
		count: 6,
		interval: .45,
		delay: .2
	}, {
		kind: "claw",
		count: 4 + Math.floor(n / 5),
		interval: .7,
		delay: .45
	}, {
		kind: "hammer",
		count: 2,
		interval: 1.2,
		delay: 1.5
	});
	else {
		groups.push({
			kind: "wisp",
			count: 6 + n,
			interval: Math.max(.32, .95 - n * .03),
			delay: .2
		});
		if (n >= 2) groups.push({
			kind: "swift",
			count: 3 + Math.floor(n / 2),
			interval: .55,
			delay: .55
		});
		if (n >= 4) groups.push({
			kind: "shell",
			count: 2 + Math.floor(n / 3),
			interval: 1.05,
			delay: 1
		});
	}
	return {
		id: n,
		name: n % 10 === 0 ? "潮心再臨" : n % 5 === 0 ? "近戰特攻" : "無盡潮",
		line: n % 5 === 0 ? "裂爪和錘骸會停下來砸樁、砸潮閘。先處理近戰。" : "沒有最後一波。活過這一潮，城就再借你一點頻率。",
		groups
	};
}
function waveScale(waveIndex) {
	return 1 + waveIndex * .15;
}
function scaledDamage(base, rank) {
	return base * Math.pow(1.36, rank);
}
function scaledRate(base, rank) {
	return base * Math.pow(1.26, rank);
}
function upgradeCost(base, rank) {
	if (rank >= 3) return null;
	return Math.round(base * [
		.62,
		.98,
		1.45
	][rank]);
}
var SELL_RATIO = .65;
var AIM_LABEL = {
	first: "最前",
	close: "最近",
	last: "最後",
	strong: "最厚"
};
var artReady = (img) => !!img && img.complete && img.naturalWidth > 0;
function draw(ctx, sim, art, time, view) {
	ctx.clearRect(view.camX - 4, view.camY - 4, view.viewW + 8, view.viewH + 8);
	ctx.save();
	if (sim.shake > 0 && !view.reduceMotion) {
		const m = sim.shake * 14;
		ctx.translate((Math.random() - .5) * m, (Math.random() - .5) * m);
	}
	paintGround(ctx, time, view);
	paintCells(ctx, sim, view);
	paintPath(ctx, sim, time);
	paintLandmarks(ctx, sim, time);
	const ghost = sim.buildType ? view.armed ?? view.hover : null;
	if (sim.buildType === "gate" && ghost) paintCellTint(ctx, ghost.c, ghost.r, sim.canBuild(ghost.c, ghost.r));
	else if (sim.buildType && ghost) paintRange(ctx, (ghost.c + .5) * 32, (ghost.r + .5) * 32, TOWER_BY_ID[sim.buildType].range, sim.canBuild(ghost.c, ghost.r));
	else if (sim.selectedId != null) {
		const tower = sim.towers.find((t) => t.id === sim.selectedId);
		if (tower && tower.role === "tower") {
			const def = TOWER_BY_ID[tower.typeId];
			paintRange(ctx, tower.x, tower.y, def.range, true);
		}
	}
	for (const tower of sim.towers) paintTower(ctx, tower, art, sim.selectedId === tower.id, time, view.reduceMotion);
	if (sim.buildType === "gate" && ghost && sim.canBuild(ghost.c, ghost.r)) paintGateShape(ctx, (ghost.c + .5) * 32, (ghost.r + .5) * 32, .55);
	else if (sim.buildType && ghost && sim.canBuild(ghost.c, ghost.r)) paintGhost(ctx, ghost.c, ghost.r, TOWER_BY_ID[sim.buildType], art);
	for (const enemy of sim.enemies) paintEnemy(ctx, enemy, art, time);
	for (const bolt of sim.bolts) paintBolt(ctx, bolt);
	for (const zap of sim.zaps) {
		ctx.save();
		ctx.globalAlpha = Math.max(0, zap.life / zap.max);
		ctx.strokeStyle = zap.color;
		ctx.lineWidth = 2.4;
		ctx.lineJoin = "round";
		ctx.beginPath();
		zap.pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
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
function bounds(view) {
	return {
		c0: Math.max(0, Math.floor(view.camX / 32) - 1),
		r0: Math.max(0, Math.floor(view.camY / 32) - 1),
		c1: Math.min(199, Math.ceil((view.camX + view.viewW) / 32) + 1),
		r1: Math.min(199, Math.ceil((view.camY + view.viewH) / 32) + 1)
	};
}
function paintGround(ctx, time, view) {
	ctx.fillStyle = "#101614";
	ctx.fillRect(view.camX, view.camY, view.viewW, view.viewH);
	const { c0, r0, c1, r1 } = bounds(view);
	if (!(view.viewW / 32 < 48)) return;
	ctx.strokeStyle = "rgba(42,56,52,0.85)";
	ctx.lineWidth = 1;
	for (let c = c0; c <= c1 + 1; c++) {
		ctx.beginPath();
		ctx.moveTo(c * 32 + .5, r0 * 32);
		ctx.lineTo(c * 32 + .5, (r1 + 1) * 32);
		ctx.stroke();
	}
	for (let r = r0; r <= r1 + 1; r++) {
		ctx.beginPath();
		ctx.moveTo(c0 * 32, r * 32 + .5);
		ctx.lineTo((c1 + 1) * 32, r * 32 + .5);
		ctx.stroke();
	}
	ctx.globalAlpha = .05;
	ctx.fillStyle = "#3ecfb2";
	for (let i = 0; i < 12; i++) {
		const x = view.camX + (i * 97 + time * 12) % view.viewW;
		const y = view.camY + i * 53 % view.viewH;
		ctx.fillRect(x, y, 2, 2);
	}
	ctx.globalAlpha = 1;
}
function paintCells(ctx, sim, view) {
	const { c0, r0, c1, r1 } = bounds(view);
	const road = new Set(sim.road.map((cell) => cell.r * 200 + cell.c));
	for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) {
		const kind = sim.grid.cells[r * 200 + c];
		const x = c * 32;
		const y = r * 32;
		if (kind === "wall") {
			ctx.fillStyle = "#1a1916";
			ctx.fillRect(x + 1, y + 1, 30, 30);
			continue;
		}
		if (kind === "pad") {
			ctx.fillStyle = "rgba(62,207,178,0.07)";
			ctx.fillRect(x + 2, y + 2, 28, 28);
			continue;
		}
		if (road.has(r * 200 + c)) continue;
	}
	const hover = view.armed ?? view.hover;
	if (!hover || !sim.buildType) return;
	paintCellTint(ctx, hover.c, hover.r, sim.canBuild(hover.c, hover.r));
}
function paintCellTint(ctx, c, r, ok) {
	ctx.fillStyle = ok ? "rgba(62,207,178,0.16)" : "rgba(225,93,108,0.18)";
	ctx.fillRect(c * 32 + 2, r * 32 + 2, 28, 28);
}
function paintPath(ctx, sim, time) {
	for (const cell of sim.road) {
		const x = cell.c * 32;
		const y = cell.r * 32;
		ctx.fillStyle = "#142226";
		round(ctx, x + 3, y + 3, 26, 26, 6);
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
			const x = (cell.c + .5) * 32;
			const y = (cell.r + .5) * 32;
			if (i === 0) ctx.moveTo(x, y);
			else ctx.lineTo(x, y);
		});
		ctx.stroke();
	}
	ctx.setLineDash([]);
}
function paintLandmarks(ctx, sim, time) {
	sim.grid.spawns.forEach((cell, index) => {
		const x = (cell.c + .5) * 32;
		const y = (cell.r + .5) * 32;
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
		const x = (cell.c + .5) * 32;
		const y = (cell.r + .5) * 32;
		ctx.save();
		ctx.translate(x, y);
		if (sim.gateFlash > 0) {
			ctx.fillStyle = `rgba(225,93,108,${.25 + sim.gateFlash})`;
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
function paintRange(ctx, x, y, range, ok) {
	ctx.beginPath();
	ctx.arc(x, y, range, 0, Math.PI * 2);
	ctx.fillStyle = ok ? "rgba(62,207,178,0.08)" : "rgba(225,93,108,0.08)";
	ctx.fill();
	ctx.strokeStyle = ok ? "rgba(62,207,178,0.7)" : "rgba(225,93,108,0.75)";
	ctx.lineWidth = 1.5;
	ctx.stroke();
}
function paintTower(ctx, tower, art, selected, time, reduce) {
	if (tower.role === "gate") {
		paintStructure(ctx, tower, time, reduce, selected);
		return;
	}
	const def = TOWER_BY_ID[tower.typeId];
	const breathe = reduce ? 1 : 1 + Math.sin(time * 2.2 + tower.id) * .025;
	const kick = reduce ? 0 : tower.recoil * 6;
	ctx.save();
	ctx.translate(tower.x - Math.cos(tower.angle) * kick, tower.y - Math.sin(tower.angle) * kick);
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
	if (artReady(img)) drawCover(ctx, img, 36);
	else {
		ctx.fillStyle = def.color;
		ctx.fillRect(-18, -18, 36, 36);
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
		const a = -Math.PI / 2 + i * .45 - (pips - 1) * .22;
		ctx.fillStyle = i < tower.dmgRank ? "#e07848" : "#3ecfb2";
		ctx.beginPath();
		ctx.arc(Math.cos(a) * 24, Math.sin(a) * 24, 2.3, 0, Math.PI * 2);
		ctx.fill();
	}
	if (selected) {
		ctx.globalAlpha = .35 + Math.sin(time * 4) * .15;
		ctx.strokeStyle = "#e7f0ea";
		ctx.beginPath();
		ctx.arc(0, 0, 26, 0, Math.PI * 2);
		ctx.stroke();
	}
	ctx.restore();
	paintHp(ctx, tower);
}
function paintStructure(ctx, tower, time, reduce, selected) {
	const jolt = !reduce && tower.hitFlash > 0 ? Math.sin(time * 40) * 2 : 0;
	ctx.save();
	ctx.globalAlpha = .95;
	paintGateShape(ctx, tower.x + jolt, tower.y, 1);
	if (selected) {
		ctx.strokeStyle = "#e7f0ea";
		ctx.lineWidth = 2;
		ctx.strokeRect(tower.x - 22, tower.y - 22, 44, 44);
	}
	ctx.restore();
	paintHp(ctx, tower);
}
function paintGateShape(ctx, x, y, alpha) {
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
function paintHp(ctx, tower) {
	if (tower.hp >= tower.maxHp && tower.role !== "gate") return;
	const w = 28;
	const x = tower.x - w / 2;
	const y = tower.y + 22;
	ctx.fillStyle = "rgba(0,0,0,0.55)";
	ctx.fillRect(x, y, w, 4);
	ctx.fillStyle = tower.hp > tower.maxHp * .35 ? "#e3c36a" : "#e15d6c";
	ctx.fillRect(x, y, w * Math.max(0, tower.hp / tower.maxHp), 4);
}
function drawCover(ctx, img, size) {
	const iw = img.naturalWidth || 1;
	const ih = img.naturalHeight || 1;
	const scale = Math.max(size / iw, size / ih);
	const dw = iw * scale;
	const dh = ih * scale;
	const focus = ih > iw * 1.15 ? .22 : .5;
	ctx.drawImage(img, -dw / 2, -dh * focus, dw, dh);
}
function paintGhost(ctx, c, r, def, art) {
	ctx.save();
	ctx.globalAlpha = .55;
	ctx.translate((c + .5) * 32, (r + .5) * 32);
	ctx.beginPath();
	ctx.arc(0, 0, 18, 0, Math.PI * 2);
	ctx.clip();
	const img = art[def.art];
	if (artReady(img)) drawCover(ctx, img, 36);
	ctx.restore();
}
function paintEnemy(ctx, enemy, art, time) {
	const def = ENEMIES[enemy.kind];
	const bob = Math.sin(time * 6 + enemy.id) * 2.2;
	const lunge = enemy.swing * 7;
	ctx.save();
	ctx.translate(enemy.x + Math.cos(enemy.facing) * lunge, enemy.y + bob);
	const img = !enemy.customId && def.art ? art[def.art] : void 0;
	if (enemy.customId || enemy.color) {
		ctx.fillStyle = enemy.color || "#d2b48c";
		ctx.globalAlpha = enemy.skills.includes("stealth") && enemy.hp >= enemy.maxHp * .98 ? .45 : 1;
		ctx.beginPath();
		ctx.arc(0, 0, enemy.radius * .72, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = 1;
		if (enemy.barrier > 0) {
			ctx.strokeStyle = "#9fd4e8";
			ctx.stroke();
		}
	} else if (artReady(img)) drawCover(ctx, img, enemy.kind === "swift" ? 62 : 54);
	else if (enemy.kind === "shell") {
		ctx.rotate(Math.sin(time * 2 + enemy.id) * .08);
		drawShell(ctx, enemy.radius);
	} else if (enemy.kind === "core") drawCore(ctx, enemy.radius, time);
	else if (enemy.kind === "claw") drawClaw(ctx, enemy.radius, time, enemy.swing);
	else if (enemy.kind === "hammer") drawHammer(ctx, enemy.radius, enemy.swing);
	else {
		ctx.fillStyle = "#3ecfb2";
		ctx.beginPath();
		ctx.arc(0, 0, enemy.radius * .6, 0, Math.PI * 2);
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
		ctx.globalAlpha = .85;
		ctx.beginPath();
		ctx.arc(-6, enemy.radius * .2, 3, 0, Math.PI * 2);
		ctx.arc(5, enemy.radius * .05, 2.2, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalAlpha = 1;
	}
	if (enemy.rootT > 0) {
		ctx.strokeStyle = "#e3c36a";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(-10, enemy.radius * .55);
		ctx.lineTo(10, enemy.radius * .55);
		ctx.moveTo(-6, enemy.radius * .55);
		ctx.lineTo(-6, enemy.radius * .55 + 7);
		ctx.moveTo(6, enemy.radius * .55);
		ctx.lineTo(6, enemy.radius * .55 + 7);
		ctx.stroke();
	}
	ctx.restore();
	const w = enemy.kind === "core" ? 46 : 28;
	const x = enemy.x - w / 2;
	const y = enemy.y - enemy.radius - 10;
	ctx.fillStyle = "rgba(0,0,0,0.55)";
	ctx.fillRect(x, y, w, 4);
	const pct = Math.max(0, enemy.hp / enemy.maxHp);
	ctx.fillStyle = pct > .4 ? "#3ecfb2" : "#e15d6c";
	ctx.fillRect(x, y, w * pct, 4);
	if (enemy.armor > 0) {
		ctx.strokeStyle = "#e3c36a";
		ctx.strokeRect(x - .5, y - .5, w + 1, 5);
	}
}
function paintBolt(ctx, bolt) {
	ctx.save();
	ctx.strokeStyle = bolt.color;
	ctx.fillStyle = bolt.color;
	ctx.lineWidth = bolt.splash > 0 ? 4 : 2.5;
	ctx.lineCap = "round";
	ctx.beginPath();
	ctx.moveTo(bolt.x - bolt.vx * .04, bolt.y - bolt.vy * .04);
	ctx.lineTo(bolt.x, bolt.y);
	ctx.stroke();
	ctx.beginPath();
	ctx.arc(bolt.x, bolt.y, bolt.splash > 0 ? 5.5 : 3.2, 0, Math.PI * 2);
	ctx.fill();
	ctx.restore();
}
function drawClaw(ctx, r, time, swing) {
	ctx.fillStyle = "#6a3a28";
	ctx.beginPath();
	ctx.ellipse(0, 2, r * .55, r * .4, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = "#e3c36a";
	ctx.lineWidth = 2;
	ctx.lineCap = "round";
	for (let i = -1; i <= 1; i++) {
		ctx.beginPath();
		ctx.moveTo(i * 5, 0);
		ctx.lineTo(i * 7 + Math.sin(time * 10 + i) * 2, -r * .7 - swing * 6);
		ctx.stroke();
	}
}
function drawHammer(ctx, r, swing) {
	ctx.fillStyle = "#4a4038";
	ctx.beginPath();
	ctx.arc(0, 4, r * .46, 0, Math.PI * 2);
	ctx.fill();
	ctx.save();
	ctx.rotate(-.6 + swing * .9);
	ctx.fillStyle = "#8a6230";
	ctx.fillRect(-3, -r, 6, r * .8);
	ctx.fillStyle = "#e3c36a";
	ctx.fillRect(-r * .55, -r - 4, r * 1.1, 10);
	ctx.restore();
}
function drawShell(ctx, r) {
	ctx.fillStyle = "#221c16";
	ctx.beginPath();
	ctx.ellipse(0, 6, r * .72, r * .42, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.lineWidth = 3;
	ctx.lineCap = "round";
	for (let i = 0; i < 3; i++) {
		ctx.strokeStyle = i === 1 ? "#e3c36a" : "#a56b3c";
		ctx.beginPath();
		ctx.arc(0, 8 - i * 7, r * (.62 - i * .08), Math.PI * 1.12, Math.PI * 1.88);
		ctx.stroke();
	}
	ctx.fillStyle = "#3ecfb2";
	ctx.fillRect(-2, -4, 4, 9);
}
function drawCore(ctx, r, time) {
	const pulse = 1 + Math.sin(time * 2.4) * .05;
	ctx.save();
	ctx.scale(pulse, pulse);
	ctx.fillStyle = "#160f18";
	ctx.beginPath();
	for (let i = 0; i < 8; i++) {
		const a = -Math.PI / 2 + i / 8 * Math.PI * 2;
		const rad = r * (i % 2 === 0 ? 1 : .72);
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
	ctx.fillRect(-2, -r * .42, 4, r * .84);
	ctx.restore();
}
function round(ctx, x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}
function inBounds(c, r) {
	return c >= 0 && r >= 0 && c < 200 && r < 200;
}
function isBorder(c, r) {
	return c === 0 || r === 0 || c === 199 || r === 199;
}
function blankWalls() {
	return new Array(4e4).fill("wall");
}
function carve(cells, c, r, kind = "open") {
	if (!inBounds(c, r) || isBorder(c, r)) return;
	cells[r * 200 + c] = kind;
}
function raster(cells, a, b, kind = "open") {
	let c = a.c;
	let r = a.r;
	carve(cells, c, r, kind);
	while (c !== b.c || r !== b.r) {
		if (c !== b.c) c += Math.sign(b.c - c);
		else r += Math.sign(b.r - r);
		carve(cells, c, r, kind);
	}
}
function addPads(cells) {
	const marks = [];
	for (let r = 1; r < 199; r++) for (let c = 1; c < 199; c++) {
		const kind = cells[r * 200 + c];
		if (kind !== "open" && kind !== "spawn" && kind !== "goal") continue;
		for (const [dc, dr] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1]
		]) {
			const nc = c + dc;
			const nr = r + dr;
			if (isBorder(nc, nr)) continue;
			if (cells[nr * 200 + nc] === "wall") marks.push({
				c: nc,
				r: nr
			});
		}
	}
	for (const cell of marks) if (cells[cell.r * 200 + cell.c] === "wall") cells[cell.r * 200 + cell.c] = "pad";
}
function gridFromCells(cells) {
	const spawns = [];
	const goals = [];
	for (let r = 0; r < 200; r++) for (let c = 0; c < 200; c++) {
		const kind = cells[r * 200 + c];
		if (isBorder(c, r) && kind !== "wall") return null;
		if (kind === "spawn") spawns.push({
			c,
			r
		});
		if (kind === "goal") goals.push({
			c,
			r
		});
	}
	if (spawns.length === 0 || goals.length === 0) return null;
	return {
		cells,
		spawns,
		goals
	};
}
function walkable(kind) {
	return kind === "open" || kind === "spawn" || kind === "goal";
}
var Heap = class {
	dist;
	data = [];
	constructor(dist) {
		this.dist = dist;
	}
	get size() {
		return this.data.length;
	}
	push(value) {
		const data = this.data;
		data.push(value);
		let i = data.length - 1;
		while (i > 0) {
			const p = i - 1 >> 1;
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
		if (data.length && last !== void 0) {
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
};
function routeTo(grid, blocked, costly, from, goals) {
	if (goals.length === 0 || !inBounds(from.c, from.r)) return null;
	const n = 4e4;
	const dist = new Float64Array(n);
	const prev = new Int32Array(n);
	dist.fill(Number.POSITIVE_INFINITY);
	prev.fill(-1);
	const start = from.r * 200 + from.c;
	const goalSet = new Set(goals.map((cell) => cell.r * 200 + cell.c));
	dist[start] = 0;
	const heap = new Heap(dist);
	heap.push(start);
	const seen = new Uint8Array(n);
	let found = -1;
	const dirs = [
		1,
		0,
		-1,
		0,
		0,
		1,
		0,
		-1
	];
	while (heap.size) {
		const u = heap.pop();
		if (seen[u]) continue;
		seen[u] = 1;
		if (goalSet.has(u)) {
			found = u;
			break;
		}
		const c = u % 200;
		const r = u / 200 | 0;
		for (let d = 0; d < 4; d++) {
			const nc = c + dirs[d * 2];
			const nr = r + dirs[d * 2 + 1];
			if (!inBounds(nc, nr)) continue;
			const nk = nr * 200 + nc;
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
	const path = [];
	let cursor = found;
	while (cursor >= 0) {
		path.push({
			c: cursor % 200,
			r: cursor / 200 | 0
		});
		if (cursor === start) break;
		cursor = prev[cursor];
	}
	path.reverse();
	if (path[0]?.c !== from.c || path[0]?.r !== from.r) return null;
	return {
		path,
		goal: {
			c: found % 200,
			r: found / 200 | 0
		}
	};
}
function shortest(grid, blocked, costly, from, to) {
	return routeTo(grid, blocked, costly, from, [to])?.path ?? null;
}
function carveLane(cells, y, dip) {
	const row = Math.max(12, Math.min(187, y));
	const deep = Math.max(row + 6, Math.min(196, row + dip));
	raster(cells, {
		c: 2,
		r: row
	}, {
		c: 197,
		r: row
	});
	raster(cells, {
		c: 24,
		r: row
	}, {
		c: 24,
		r: deep
	});
	raster(cells, {
		c: 24,
		r: deep
	}, {
		c: 176,
		r: deep
	});
	raster(cells, {
		c: 176,
		r: deep
	}, {
		c: 176,
		r: row
	});
	carve(cells, 2, row, "spawn");
	carve(cells, 197, row, "goal");
}
function buildGrid(lanes, links = []) {
	const cells = blankWalls();
	for (const lane of lanes) carveLane(cells, lane.y, lane.dip);
	for (const link of links) for (let i = 0; i < link.length - 1; i++) raster(cells, link[i], link[i + 1]);
	addPads(cells);
	const grid = gridFromCells(cells);
	if (!grid) throw new Error("關卡地圖沒有入口或終點");
	return grid;
}
function idx(n) {
	return Array.from({ length: n }, (_, i) => i);
}
function group(kind, count, interval, delay, spawns, goals) {
	return {
		kind,
		count,
		interval,
		delay,
		spawns,
		goals
	};
}
function generated(count, spawns, goals, title) {
	const doors = idx(spawns);
	const ends = idx(goals);
	const waves = [];
	for (let i = 0; i < count; i++) {
		const n = i + 1;
		const groups = [];
		let name = `${title} ${n}`;
		let line = doors.length > 1 ? "這一波會平均拆進每一個入口。" : "潮徑很長。先把樁立在你守得住的那一段。";
		if (n === count) {
			name = "潮心";
			groups.push(group("swift", 8 + spawns, .42, .2, doors, ends));
			groups.push(group("core", 1, 1, 3.2, [0], [0]));
			groups.push(group("hammer", Math.max(2, spawns), 1.15, 4.4, doors, ends));
			line = "潮心走第一個入口。錘骸會平均砸向每個入口上的潮閘。";
		} else if (n % 5 === 0) {
			name = "近戰特攻";
			groups.push(group("claw", 3 + spawns, .72, .25, doors, ends));
			groups.push(group("hammer", 1 + Math.floor(spawns / 2), 1.15, 1.3, doors, ends));
			groups.push(group("shell", 3, 1, .4, doors, ends));
			line = "裂爪和錘骸會停下來砸樁、砸潮閘。多入口時牠們被平均拆開。";
		} else if (n % 4 === 2 && spawns > 1) {
			const only = (Math.floor(n / 2) - 1) % spawns;
			name = `入口 ${only + 1}`;
			groups.push(group("swift", 6 + n, .46, .2, [only], ends));
			groups.push(group("wisp", 8, .55, .35, [only], ends));
			line = `這一波只從入口 ${only + 1} 進來，終點仍會平均分配。`;
		} else {
			groups.push(group("wisp", 6 + n, Math.max(.32, .82 - n * .02), .18, doors, ends));
			if (n >= 3) groups.push(group("swift", 3 + Math.floor(n / 2), .5, .55, doors, ends));
			if (n >= 6) groups.push(group("shell", 2 + Math.floor(n / 5), 1.05, .9, doors, ends));
		}
		waves.push({
			id: n,
			name,
			line,
			groups
		});
	}
	return waves;
}
var LEVELS = [
	{
		id: "levee",
		name: "長堤",
		blurb: "一條橫貫澄洲的長堤，中段有一條繞遠的退路。故事十二波。",
		gold: 240,
		lives: 20,
		story: true,
		waves: WAVES,
		grid: buildGrid([{
			y: 100,
			dip: 18
		}])
	},
	{
		id: "twin",
		name: "雙潮口",
		blurb: "南北兩個入口，終點各一。大多數波次會把兵平均拆開。",
		gold: 280,
		lives: 22,
		story: false,
		waves: generated(12, 2, 2, "雙潮"),
		grid: buildGrid([{
			y: 70,
			dip: 14
		}, {
			y: 130,
			dip: 14
		}])
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
			{
				y: 48,
				dip: 12
			},
			{
				y: 100,
				dip: 12
			},
			{
				y: 152,
				dip: 12
			}
		])
	},
	{
		id: "ford",
		name: "對岸",
		blurb: "兩條互不相連的潮徑。守住你指定的那個終點。",
		gold: 300,
		lives: 22,
		story: false,
		waves: generated(14, 2, 2, "對岸"),
		grid: buildGrid([{
			y: 60,
			dip: 16
		}, {
			y: 150,
			dip: 16
		}])
	},
	{
		id: "conflux",
		name: "匯流",
		blurb: "兩條潮徑在地圖中段有一座橋。閘門可以把兵逼去另一條。",
		gold: 340,
		lives: 24,
		story: false,
		waves: generated(16, 2, 2, "匯流"),
		grid: buildGrid([{
			y: 68,
			dip: 14
		}, {
			y: 132,
			dip: 14
		}], [[{
			c: 100,
			r: 68
		}, {
			c: 100,
			r: 132
		}]])
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
			{
				y: 36,
				dip: 10
			},
			{
				y: 78,
				dip: 10
			},
			{
				y: 122,
				dip: 10
			},
			{
				y: 164,
				dip: 10
			}
		])
	}
];
function levelById(id) {
	return LEVELS.find((level) => level.id === id) ?? LEVELS[0];
}
var DefenseSim = class {
	phase = "prep";
	gold = 200;
	lives = 20;
	waveIndex = 0;
	paused = false;
	speed = 1;
	kills = 0;
	leaks = 0;
	shield = 0;
	mode = "story";
	grid = LEVELS[0].grid;
	road = [];
	lanes = [];
	levelName = LEVELS[0].name;
	buildType = null;
	selectedId = null;
	toast = "";
	toastT = 0;
	banner = "";
	bannerT = 0;
	shake = 0;
	gateFlash = 0;
	fightT = 0;
	log = [];
	towers = [];
	enemies = [];
	bolts = [];
	zaps = [];
	floaters = [];
	particles = [];
	rev = 1;
	onSfx = null;
	onSettle = null;
	nextId = 1;
	queue = [];
	qIndex = 0;
	settled = false;
	pending = [];
	script = LEVELS[0].waves;
	monsters = [];
	storyExtras = true;
	constructor() {
		this.reset();
	}
	reset(mode = "story", grid, extra) {
		this.phase = "prep";
		this.mode = mode;
		this.grid = grid ?? LEVELS[0].grid;
		this.script = extra?.waves ?? (grid ? WAVES : LEVELS[0].waves);
		this.monsters = extra?.monsters ?? [];
		this.levelName = extra?.levelName ?? LEVELS[0].name;
		this.storyExtras = extra?.story ?? false;
		this.gold = extra?.gold ?? 200;
		this.lives = extra?.lives ?? 20;
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
	currentWave() {
		if (this.mode === "endless") {
			const wave = endlessWave(this.waveIndex);
			const doors = this.grid.spawns.map((_, i) => i);
			const ends = this.grid.goals.map((_, i) => i);
			return {
				...wave,
				groups: wave.groups.map((group) => ({
					...group,
					spawns: doors,
					goals: ends
				}))
			};
		}
		const wave = this.script[Math.min(this.waveIndex, Math.max(0, this.script.length - 1))];
		if (!this.storyExtras) return wave;
		if (wave.id === 4) return {
			...wave,
			groups: [...wave.groups, {
				kind: "claw",
				count: 3,
				interval: 1.15,
				delay: 2.2
			}]
		};
		if (wave.id === 8) return {
			...wave,
			groups: [
				...wave.groups,
				{
					kind: "claw",
					count: 4,
					interval: .8,
					delay: 1.2
				},
				{
					kind: "hammer",
					count: 2,
					interval: 1.35,
					delay: 2.2
				}
			]
		};
		if (wave.id === 12) return {
			...wave,
			groups: [...wave.groups, {
				kind: "hammer",
				count: 2,
				interval: 1.3,
				delay: 5.4
			}]
		};
		return wave;
	}
	notePrep() {
		const wave = this.currentWave();
		this.log.push(`—— 第 ${wave.id} 波 · ${wave.name} ——`);
		this.log.push(wave.line);
		if (this.mode === "story" && wave.id > 1) {
			for (const t of TOWERS) if (t.unlockWave === wave.id) this.log.push(`${t.name}入陣。${t.join}`);
		}
		if (this.log.length > 48) this.log.splice(0, this.log.length - 48);
	}
	bump() {
		this.rev++;
	}
	say(text) {
		this.toast = text;
		this.toastT = 1.6;
		this.bump();
	}
	unlocked(id) {
		if (id === "gate") return true;
		const def = TOWER_BY_ID[id];
		if (!def) return false;
		return this.waveIndex + 1 >= def.unlockWave;
	}
	cellKind(c, r) {
		if (c < 0 || r < 0 || c >= 200 || r >= 200) return "wall";
		return this.grid.cells[r * 200 + c];
	}
	blockedSet(extra) {
		const blocked = /* @__PURE__ */ new Set();
		for (const tower of this.towers) if (tower.role === "gate") blocked.add(`${tower.c},${tower.r}`);
		if (extra) blocked.add(extra);
		return blocked;
	}
	costlySet() {
		const costly = /* @__PURE__ */ new Set();
		for (const tower of this.towers) if (tower.role === "tower") costly.add(`${tower.c},${tower.r}`);
		return costly;
	}
	refreshRoad() {
		const blocked = this.blockedSet();
		const costly = this.costlySet();
		const lanes = [];
		const road = [];
		const seen = /* @__PURE__ */ new Set();
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
	foot(enemy) {
		if (enemy.seg >= .5 && enemy.path[1]) return enemy.path[1];
		return enemy.path[0] ?? this.grid.spawns[0];
	}
	repathAll() {
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
			enemy.x = (route[0].c + .5) * 32;
			enemy.y = (route[0].r + .5) * 32;
		}
	}
	canBuild(c, r) {
		if (this.buildType === "gate") return this.canPlaceGate(c, r);
		if (!this.buildType) return false;
		return this.canPlaceTower(c, r);
	}
	occupied(c, r) {
		return this.towers.some((tower) => tower.c === c && tower.r === r);
	}
	canPlaceTower(c, r) {
		return this.cellKind(c, r) === "pad" && !this.occupied(c, r);
	}
	canPlaceGate(c, r) {
		if (this.cellKind(c, r) !== "open" || this.occupied(c, r)) return false;
		for (const enemy of this.enemies) {
			if (enemy.dead) continue;
			const foot = this.foot(enemy);
			if (foot.c === c && foot.r === r) return false;
		}
		const blocked = this.blockedSet(`${c},${r}`);
		const costly = this.costlySet();
		for (const spawn of this.grid.spawns) if (!routeTo(this.grid, blocked, costly, spawn, this.grid.goals)) return false;
		for (const enemy of this.enemies) {
			if (enemy.dead) continue;
			if (!shortest(this.grid, blocked, costly, this.foot(enemy), enemy.goal)) return false;
		}
		return true;
	}
	arm(id) {
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
	place(c, r) {
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
		const hp = Math.round(70 + def.cost * .35);
		const tower = {
			id: this.nextId++,
			typeId: def.id,
			role: "tower",
			c,
			r,
			x: (c + .5) * 32,
			y: (r + .5) * 32,
			dmgRank: 0,
			rateRank: 0,
			spent: def.cost,
			cd: .15,
			angle: 0,
			mode: "first",
			hp,
			maxHp: hp,
			recoil: 0,
			hitFlash: 0
		};
		this.towers.push(tower);
		this.onSfx?.("place");
		this.burst(tower.x, tower.y, def.color, 8);
		this.repathAll();
		this.bump();
		return true;
	}
	placeGate(c, r) {
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
			x: (c + .5) * 32,
			y: (r + .5) * 32,
			dmgRank: 0,
			rateRank: 0,
			spent: GATE.cost,
			cd: 0,
			angle: 0,
			mode: "first",
			hp: GATE.hp,
			maxHp: GATE.hp,
			recoil: 0,
			hitFlash: 0
		});
		this.onSfx?.("place");
		this.burst((c + .5) * 32, (r + .5) * 32, "#e3c36a", 8);
		this.repathAll();
		this.bump();
		return true;
	}
	selectAt(c, r) {
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
	selectedTower() {
		if (this.selectedId == null) return null;
		return this.towers.find((t) => t.id === this.selectedId) ?? null;
	}
	upgrade(path) {
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
	setAim(mode) {
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
			for (let i = 0; i < g.count; i++) this.queue.push({
				t: g.delay + i * g.interval,
				kind: g.kind,
				customId: g.customId,
				spawn: doors[i % doors.length],
				goal: ends[i % ends.length]
			});
		}
		this.queue.sort((a, b) => a.t - b.t);
		this.qIndex = 0;
		this.banner = wave.name;
		this.bannerT = 1.7;
		this.onSfx?.("wave");
		this.bump();
	}
	tick(dt) {
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
			for (const tower of this.towers) if (tower.role === "tower") this.aimAndFire(tower, dt);
			this.stepBolts(dt);
		}
		this.enemies = this.enemies.filter((e) => !e.dead);
		this.decayFx(dt);
		if (this.phase === "fight" && this.qIndex >= this.queue.length && this.enemies.length === 0) {
			const bonus = 16 + this.waveIndex * 6;
			this.gold += bonus;
			this.log.push(`潮徑清空，城裡補上 ${bonus} 金幣。`);
			if (this.mode === "endless") {
				this.waveIndex += 1;
				this.phase = "prep";
				this.notePrep();
				this.bump();
			} else if (this.waveIndex >= this.script.length - 1) this.finish("victory");
			else {
				this.waveIndex += 1;
				this.phase = "prep";
				this.notePrep();
				this.bump();
			}
		}
	}
	finish(phase) {
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
	spawn(kind, at, goal, hpMul, goldOverride, customId, summoned = false) {
		const custom = customId ? this.monsters.find((item) => item.id === customId) : void 0;
		const def = custom ?? ENEMIES[kind];
		const skills = custom?.skills ?? [];
		const route = shortest(this.grid, this.blockedSet(), this.costlySet(), at, goal);
		if (!route || route.length < 2) return;
		const scale = waveScale(this.waveIndex) * (this.mode === "endless" ? 1 + this.waveIndex * .04 : 1);
		const hp = Math.round(def.hp * scale * hpMul);
		const pay = goldOverride == null ? def.gold : goldOverride;
		const gold = Math.round(pay * (1 + this.waveIndex * .2));
		const enemy = {
			id: this.nextId++,
			kind,
			hp,
			maxHp: hp,
			speed: def.speed * 2 * (1 + this.waveIndex * .012),
			armor: def.armor,
			gold,
			leak: def.leak,
			radius: def.radius,
			progress: 0,
			x: (route[0].c + .5) * 32,
			y: (route[0].r + .5) * 32,
			slow: 1,
			slowT: 0,
			burnDps: 0,
			burnT: 0,
			rootT: 0,
			rootCd: 0,
			path: route,
			seg: 0,
			meleeCd: .35,
			swing: 0,
			facing: 0,
			spawnT: kind === "core" && !custom ? 4 : 0,
			dead: false,
			goal,
			skills,
			barrier: skills.includes("shield") ? Math.round(hp * .3) : 0,
			sprintT: 0,
			sprintCd: 2.5,
			summoned,
			color: custom?.color ?? "",
			customId: customId ?? ""
		};
		this.pending.push(enemy);
		if (kind === "core" && !custom) {
			this.banner = "虛潮之核";
			this.bannerT = 2.3;
			this.shake = .5;
			this.onSfx?.("boss");
		}
	}
	stepEnemy(enemy, dt) {
		if (enemy.skills.includes("regen") && enemy.hp < enemy.maxHp && enemy.hp > 0) enemy.hp = Math.min(enemy.maxHp, enemy.hp + enemy.maxHp * .02 * dt);
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
				this.spawn("wisp", enemy.path[0] ?? this.foot(enemy), enemy.goal, .62, 14);
			}
		}
		const spec = enemy.customId ? this.monsters.find((item) => item.id === enemy.customId) : void 0;
		const melee = spec?.melee ?? ENEMIES[enemy.kind].melee;
		const meleeEvery = spec?.meleeEvery ?? ENEMIES[enemy.kind].meleeEvery;
		if (melee > 0) {
			const victim = this.nearestStructure(enemy, 40);
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
		const len = Math.hypot((to.c - from.c) * 32, (to.r - from.r) * 32) || 32;
		enemy.facing = Math.atan2(to.r - from.r, to.c - from.c);
		enemy.seg += speed * dt / len;
		if (enemy.seg >= 1) {
			enemy.seg = 0;
			enemy.path.shift();
			if (enemy.path.length < 2) {
				const last = enemy.path[0];
				if (last) {
					enemy.x = (last.c + .5) * 32;
					enemy.y = (last.r + .5) * 32;
				}
				this.leak(enemy);
				return;
			}
		}
		const a = enemy.path[0];
		const b = enemy.path[1];
		const ax = (a.c + .5) * 32;
		const ay = (a.r + .5) * 32;
		const bx = (b.c + .5) * 32;
		const by = (b.r + .5) * 32;
		enemy.x = ax + (bx - ax) * enemy.seg;
		enemy.y = ay + (by - ay) * enemy.seg;
		this.markProgress(enemy);
	}
	markProgress(enemy) {
		enemy.progress = 1e4 - (enemy.path.length - 1 - enemy.seg);
	}
	nearestStructure(enemy, range) {
		const pick = (list) => {
			let best = null;
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
	hurtStructure(tower, amount) {
		tower.hp -= amount;
		tower.hitFlash = .18;
		if (tower.hp > 0) return;
		this.float(tower.x, tower.y - 16, "摧毀", "#e15d6c");
		this.burst(tower.x, tower.y, "#e3c36a", 10);
		if (this.selectedId === tower.id) this.selectedId = null;
		this.towers = this.towers.filter((item) => item.id !== tower.id);
		this.repathAll();
		this.bump();
	}
	leak(enemy) {
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
			this.gateFlash = .45;
			this.shake = Math.max(this.shake, enemy.kind === "core" ? .55 : .28);
			this.float(enemy.x, enemy.y - 12, `-${cost}`, "#e15d6c");
			this.onSfx?.("leak");
			if (this.lives <= 0) this.finish("defeat");
		} else {
			this.gateFlash = .22;
			this.bump();
		}
	}
	aimAndFire(tower, dt) {
		const def = TOWER_BY_ID[tower.typeId];
		const target = this.pick(tower, def.range);
		if (target) tower.angle = Math.atan2(target.y - tower.y, target.x - tower.x);
		tower.cd -= dt;
		if (!target || tower.cd > 0) return;
		const damage = scaledDamage(def.damage, tower.dmgRank);
		tower.cd = 1 / scaledRate(def.rate, tower.rateRank);
		if (def.style === "chain") this.castChain(tower, def, target, damage);
		else this.castBolt(tower, def, target, damage);
		tower.recoil = 1;
	}
	pick(tower, range) {
		const r2 = range * range;
		let best = null;
		let bestKey = 0;
		for (const e of this.enemies) {
			if (e.dead) continue;
			const dx = e.x - tower.x;
			const dy = e.y - tower.y;
			const dist2 = dx * dx + dy * dy;
			if (dist2 > r2) continue;
			if (e.skills.includes("stealth") && e.hp >= e.maxHp * .98 && dist2 > 9216) continue;
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
	castBolt(tower, def, target, damage) {
		const dx = target.x - tower.x;
		const dy = target.y - tower.y;
		const len = Math.hypot(dx, dy) || 1;
		const speed = def.splash > 0 ? 250 : 340;
		this.bolts.push({
			id: this.nextId++,
			x: tower.x + dx / len * 18,
			y: tower.y + dy / len * 18,
			vx: dx / len * speed,
			vy: dy / len * speed,
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
			speed
		});
	}
	castChain(tower, def, primary, damage) {
		const hits = [primary];
		let dmg = damage;
		this.hurt(primary, dmg, def.pierce, def.halfArmor, def.execute, def.slow, def.slowDur);
		this.stamp(primary, def.burn * damage, def.burnDur, def.root);
		let guard = 0;
		while (hits.length <= def.chain && guard < 8) {
			guard++;
			dmg *= def.chainFalloff;
			const from = hits[hits.length - 1];
			let next = null;
			let best = 13924;
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
		const pts = [{
			x: tower.x,
			y: tower.y
		}];
		for (let i = 0; i < hits.length; i++) {
			const a = i === 0 ? {
				x: tower.x,
				y: tower.y
			} : {
				x: hits[i - 1].x,
				y: hits[i - 1].y
			};
			const b = {
				x: hits[i].x,
				y: hits[i].y
			};
			const steps = 4;
			for (let s = 1; s <= steps; s++) {
				const t = s / steps;
				pts.push({
					x: a.x + (b.x - a.x) * t + (s === steps ? 0 : (Math.random() - .5) * 16),
					y: a.y + (b.y - a.y) * t + (s === steps ? 0 : (Math.random() - .5) * 16)
				});
			}
		}
		this.zaps.push({
			pts,
			life: .18,
			max: .18,
			color: def.color
		});
		if (def.shieldOnHit > 0) {
			this.shield = Math.min(12, this.shield + def.shieldOnHit);
			this.bump();
		}
	}
	stepBolts(dt) {
		for (const b of this.bolts) {
			const target = this.enemies.find((e) => e.id === b.targetId && !e.dead);
			if (target) {
				const dx = target.x - b.x;
				const dy = target.y - b.y;
				const len = Math.hypot(dx, dy) || 1;
				b.vx = dx / len * b.speed;
				b.vy = dy / len * b.speed;
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
	impact(b, x, y) {
		const touched = [];
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
	hurt(e, amount, pierce, halfArmor, execute, slow, slowDur) {
		if (e.dead) return;
		let dmg = amount;
		if (execute > 1 && e.hp / e.maxHp < .22) dmg *= execute;
		if (!pierce && e.armor > 0) {
			const arm = halfArmor ? e.armor * .5 : e.armor;
			dmg = Math.max(1, dmg - arm);
		}
		for (const other of this.enemies) {
			if (other.dead || other.id === e.id || !other.skills.includes("aura")) continue;
			const dx = other.x - e.x;
			const dy = other.y - e.y;
			if (dx * dx + dy * dy <= 1e4) {
				dmg *= .8;
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
	stamp(e, burnDps, burnDur, root) {
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
	slay(e) {
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
			this.spawn("wisp", at, e.goal, .42, 6, void 0, true);
			this.spawn("wisp", at, e.goal, .42, 6, void 0, true);
		}
		this.bump();
	}
	float(x, y, text, color) {
		this.floaters.push({
			x,
			y,
			text,
			life: .8,
			max: .8,
			color
		});
		if (this.floaters.length > 30) this.floaters.splice(0, this.floaters.length - 30);
	}
	burst(x, y, color, n) {
		for (let i = 0; i < n; i++) {
			const a = Math.random() * Math.PI * 2;
			const s = 20 + Math.random() * 70;
			this.particles.push({
				x,
				y,
				vx: Math.cos(a) * s,
				vy: Math.sin(a) * s,
				life: .35 + Math.random() * .25,
				max: .6,
				color,
				size: 1.5 + Math.random() * 2.2
			});
		}
		if (this.particles.length > 180) this.particles.splice(0, this.particles.length - 180);
	}
	decayFx(dt) {
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
	snapshot() {
		const tower = this.selectedTower();
		let selected = null;
		if (tower?.role === "gate") selected = {
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
			nextRate: null
		};
		else if (tower) {
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
				nextDamage: tower.dmgRank >= 3 ? null : Math.round(scaledDamage(def.damage, tower.dmgRank + 1)),
				nextRate: tower.rateRank >= 3 ? null : Math.round(scaledRate(def.rate, tower.rateRank + 1) * 100) / 100
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
			selected
		};
	}
};
var AIM_ORDER = [
	"first",
	"close",
	"last",
	"strong"
];
function cn(...v) {
	return twMerge(clsx(v));
}
var SAVE_KEY = "chengchao-defense-v1";
function loadRecord() {
	try {
		const raw = localStorage.getItem(SAVE_KEY);
		if (!raw) return {
			bestWave: 0,
			wins: 0,
			endlessBest: 0
		};
		const parsed = JSON.parse(raw);
		return {
			bestWave: typeof parsed.bestWave === "number" ? parsed.bestWave : 0,
			wins: typeof parsed.wins === "number" ? parsed.wins : 0,
			endlessBest: typeof parsed.endlessBest === "number" ? parsed.endlessBest : 0
		};
	} catch {
		return {
			bestWave: 0,
			wins: 0,
			endlessBest: 0
		};
	}
}
var Sfx = class {
	ctx = null;
	muted = false;
	lastKill = 0;
	resume() {
		if (this.muted) return;
		if (!this.ctx) this.ctx = new AudioContext();
		if (this.ctx.state === "suspended") this.ctx.resume();
	}
	play(name) {
		if (this.muted) return;
		if (!this.ctx) this.ctx = new AudioContext();
		const ctx = this.ctx;
		if (ctx.state === "suspended") ctx.resume();
		if (name === "kill") {
			const now = performance.now();
			if (now - this.lastKill < 70) return;
			this.lastKill = now;
		}
		if (name === "win") {
			[
				523,
				659,
				784
			].forEach((freq, i) => this.tone(ctx, freq, ctx.currentTime + i * .11, .16, "sine", .04));
			return;
		}
		const [freq, dur, type, gain] = {
			place: [
				620,
				.07,
				"triangle",
				.035
			],
			kill: [
				880,
				.06,
				"sine",
				.03
			],
			leak: [
				98,
				.22,
				"sawtooth",
				.028
			],
			wave: [
				246,
				.12,
				"square",
				.02
			],
			upgrade: [
				540,
				.09,
				"triangle",
				.04
			],
			boss: [
				78,
				.32,
				"sawtooth",
				.035
			],
			lose: [
				130,
				.36,
				"triangle",
				.04
			],
			sell: [
				360,
				.07,
				"triangle",
				.03
			]
		}[name];
		this.tone(ctx, freq, ctx.currentTime, dur, type, gain);
	}
	tone(ctx, freq, when, dur, type, gain) {
		const osc = ctx.createOscillator();
		const amp = ctx.createGain();
		osc.type = type;
		osc.frequency.setValueAtTime(freq, when);
		amp.gain.setValueAtTime(gain, when);
		amp.gain.exponentialRampToValueAtTime(1e-4, when + dur);
		osc.connect(amp);
		amp.connect(ctx.destination);
		osc.start(when);
		osc.stop(when + dur + .02);
	}
};
function DefenseGame() {
	const simRef = (0, import_react.useRef)(null);
	if (!simRef.current) simRef.current = new DefenseSim();
	const sim = simRef.current;
	const canvasRef = (0, import_react.useRef)(null);
	const artRef = (0, import_react.useRef)({});
	const hoverRef = (0, import_react.useRef)(null);
	const armedRef = (0, import_react.useRef)(null);
	const sfxRef = (0, import_react.useRef)(null);
	if (!sfxRef.current) sfxRef.current = new Sfx();
	const logRef = (0, import_react.useRef)(null);
	const camRef = (0, import_react.useRef)({
		x: 0,
		y: 0,
		scale: 1.4,
		ready: false
	});
	const keysRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const miniRef = (0, import_react.useRef)({
		x: 12,
		y: 12,
		s: 148
	});
	const dragRef = (0, import_react.useRef)(null);
	const [hud, setHud] = (0, import_react.useState)(() => sim.snapshot());
	const [screen, setScreen] = (0, import_react.useState)("menu");
	const [prologue, setPrologue] = (0, import_react.useState)(0);
	const [tab, setTab] = (0, import_react.useState)("build");
	const [record, setRecord] = (0, import_react.useState)({
		bestWave: 0,
		wins: 0,
		endlessBest: 0
	});
	const [muted, setMuted] = (0, import_react.useState)(false);
	const [coarse, setCoarse] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setRecord(loadRecord());
		setCoarse(window.matchMedia("(pointer: coarse)").matches);
		const urls = /* @__PURE__ */ new Set();
		for (const tower of TOWERS) urls.add(tower.art);
		for (const enemy of Object.values(ENEMIES)) if (enemy.art) urls.add(enemy.art);
		const bag = {};
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
			if (sim.mode === "endless") next.endlessBest = Math.max(prev.endlessBest, sim.waveIndex + 1);
			else {
				const reached = phase === "victory" ? WAVES.length : sim.waveIndex + 1;
				next.bestWave = Math.max(prev.bestWave, reached);
				next.wins = prev.wins + (phase === "victory" ? 1 : 0);
			}
			localStorage.setItem(SAVE_KEY, JSON.stringify(next));
			setRecord(next);
		};
	}, [sim]);
	(0, import_react.useEffect)(() => {
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
			return {
				cssW,
				cssH,
				scale,
				viewW: cssW / scale,
				viewH: cssH / scale
			};
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
			const spawn = sim.grid.spawns[0] ?? {
				c: 2,
				r: 100
			};
			camRef.current.scale = Math.min(2.4, Math.max(minScale() * 1.02, canvas.clientWidth / 896));
			const { viewW, viewH } = viewOf();
			camRef.current.x = (spawn.c + 7) * 32 - viewW * .32;
			camRef.current.y = (spawn.r + .5) * 32 - viewH * .5;
			clampCam();
			camRef.current.ready = true;
		};
		const loop = (now) => {
			const dt = Math.min(.05, (now - last) / 1e3);
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
				const step = 720 / camRef.current.scale * dt;
				camRef.current.x += vx / len * step;
				camRef.current.y += vy / len * step;
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
				draw(ctx, sim, artRef.current, now / 1e3, {
					hover: hoverRef.current,
					armed: coarse ? armedRef.current : null,
					reduceMotion: reduce,
					camX: camRef.current.x,
					camY: camRef.current.y,
					viewW,
					viewH
				});
				const mini = 148;
				const mx = 12;
				const my = cssH - mini - 12;
				miniRef.current = {
					x: mx,
					y: my,
					s: mini
				};
				ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
				ctx.fillStyle = "rgba(12,18,16,0.88)";
				ctx.fillRect(mx, my, mini, mini);
				ctx.strokeStyle = "#2a3834";
				ctx.lineWidth = 1;
				ctx.strokeRect(12.5, my + .5, 147, 147);
				const sx = mini / 200;
				ctx.fillStyle = "#18343a";
				for (const cell of sim.road) ctx.fillRect(mx + cell.c * sx, my + cell.r * sx, Math.max(1.2, sx), Math.max(1.2, sx));
				ctx.fillStyle = "#3ecfb2";
				for (const cell of sim.grid.spawns) ctx.fillRect(mx + cell.c * sx - 1.5, my + cell.r * sx - 1.5, 4, 4);
				ctx.fillStyle = "#e3c36a";
				for (const cell of sim.grid.goals) ctx.fillRect(mx + cell.c * sx - 1.5, my + cell.r * sx - 1.5, 4, 4);
				ctx.strokeStyle = "#e7f0ea";
				ctx.lineWidth = 1.5;
				ctx.strokeRect(mx + camRef.current.x / 32 * sx, my + camRef.current.y / 32 * sx, Math.max(6, viewW / 32 * sx), Math.max(6, viewH / 32 * sx));
			}
			ui += dt;
			if (ui > .2) {
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
		const onKeyDown = (e) => {
			const target = e.target;
			if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) return;
			keysRef.current.add(e.key.toLowerCase());
			if (e.code === "Space") {
				e.preventDefault();
				if (!e.repeat && sim.phase === "prep" && prologue >= PROLOGUE.length) sim.startWave();
			} else if (e.key === "Escape") {
				sim.cancelArm();
				armedRef.current = null;
			} else if (e.key === "9") sim.arm("gate");
			else if (e.key >= "1" && e.key <= "8") {
				const tower = TOWERS[Number(e.key) - 1];
				if (tower) sim.arm(tower.id);
			} else if ([
				"arrowleft",
				"arrowright",
				"arrowup",
				"arrowdown",
				"a",
				"d",
				"w",
				"s"
			].includes(e.key.toLowerCase())) {
				e.preventDefault();
				return;
			} else return;
			setHud(sim.snapshot());
		};
		const onKeyUp = (e) => {
			keysRef.current.delete(e.key.toLowerCase());
		};
		const onWheel = (e) => {
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
	}, [
		screen,
		sim,
		prologue,
		coarse
	]);
	(0, import_react.useEffect)(() => {
		if (tab === "log" && logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
	}, [hud.log.length, tab]);
	function sync() {
		setHud(sim.snapshot());
	}
	function worldFrom(e) {
		const rect = e.currentTarget.getBoundingClientRect();
		const scale = camRef.current.scale || 1;
		return {
			x: camRef.current.x + (e.clientX - rect.left) / scale,
			y: camRef.current.y + (e.clientY - rect.top) / scale,
			localX: e.clientX - rect.left,
			localY: e.clientY - rect.top
		};
	}
	function cellFrom(e) {
		const p = worldFrom(e);
		return {
			c: Math.floor(p.x / 32),
			r: Math.floor(p.y / 32)
		};
	}
	function jumpMini(localX, localY) {
		const mini = miniRef.current;
		if (localX < mini.x || localY < mini.y || localX > mini.x + mini.s || localY > mini.y + mini.s) return false;
		const canvas = canvasRef.current;
		if (!canvas) return true;
		const gx = (localX - mini.x) / mini.s * WORLD_W;
		const gy = (localY - mini.y) / mini.s * WORLD_H;
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
	function act(cell) {
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
					if (sim.towers.some((t) => t.c === cell.c && t.r === cell.r)) {
						sim.place(cell.c, cell.r);
						armedRef.current = null;
					}
				}
			} else sim.place(cell.c, cell.r);
		} else sim.selectAt(cell.c, cell.r);
		sync();
	}
	function onPointerDown(e) {
		sfxRef.current?.resume();
		const localX = e.clientX - e.currentTarget.getBoundingClientRect().left;
		const localY = e.clientY - e.currentTarget.getBoundingClientRect().top;
		if (e.button === 0 && jumpMini(localX, localY)) return;
		const cell = cellFrom(e);
		hoverRef.current = cell;
		try {
			e.currentTarget.setPointerCapture(e.pointerId);
		} catch {}
		dragRef.current = {
			id: e.pointerId,
			x: e.clientX,
			y: e.clientY,
			camX: camRef.current.x,
			camY: camRef.current.y,
			moved: e.button === 1 || e.button === 2,
			cell
		};
	}
	function onPointerMove(e) {
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
	function onPointerUp(e) {
		const drag = dragRef.current;
		if (!drag || drag.id !== e.pointerId) return;
		dragRef.current = null;
		if (!drag.moved && e.button === 0) act(drag.cell);
	}
	function look(mode) {
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
	function beginLevel(id, mode) {
		const level = levelById(id);
		sfxRef.current?.resume();
		sim.reset(mode, level.grid, {
			waves: level.waves,
			levelName: level.name,
			gold: level.gold,
			lives: level.lives,
			story: mode === "story" && level.story
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
			story: sim.mode === "story" && level.story
		});
		setPrologue(PROLOGUE.length);
		armedRef.current = null;
		camRef.current.ready = false;
		sync();
	}
	const playing = screen === "play";
	const wave = {
		id: hud.waveNumber,
		name: hud.waveName,
		line: hud.waveLine
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-bg text-fg",
		children: [
			!playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
				record,
				onStart: (id) => beginLevel(id, "story"),
				onEndless: (id) => beginLevel(id, "endless")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex min-h-dvh max-w-6xl flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "flex flex-wrap items-center gap-2 border-b border-line bg-surface px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-none",
							children: "澄潮守城"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								hud.levelName,
								" · ",
								hud.mode === "endless" ? `無盡第 ${wave.id} 潮` : `第 ${wave.id} / ${hud.waveCount} 波`,
								" · ",
								wave.name
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-4" }),
									label: "生命",
									value: hud.lives,
									danger: hud.lives <= 5
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-4" }),
									label: "護盾",
									value: hud.shield
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, { className: "size-4" }),
									label: "金幣",
									value: hud.gold,
									gold: true
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex w-full items-center gap-2 sm:w-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-line bg-surface-2 px-3",
									onClick: () => {
										sim.paused = !sim.paused;
										sync();
									},
									"aria-label": hud.paused ? "繼續" : "暫停",
									children: hud.paused ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: cn("inline-flex min-h-11 items-center gap-1 rounded-xl border border-line px-3 text-sm", hud.speed === 2 ? "bg-primary text-bg" : "bg-surface-2 text-fg"),
									onClick: () => {
										sim.speed = sim.speed === 1 ? 2 : 1;
										sync();
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FastForward, { className: "size-4" }), hud.speed === 2 ? "兩倍" : "原速"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-line bg-surface-2",
									onClick: () => {
										const next = !muted;
										setMuted(next);
										if (sfxRef.current) sfxRef.current.muted = next;
									},
									"aria-label": muted ? "開啟音效" : "關閉音效",
									children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "inline-flex min-h-11 items-center gap-1 rounded-xl border border-line bg-surface-2 px-3 text-sm",
									onClick: restart,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), "重開"]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_22rem]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-[calc(100dvh-8.75rem)] min-h-80 bg-bg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
								ref: canvasRef,
								className: "block h-full w-full touch-none",
								"aria-label": "200 乘 200 的澄洲。拖曳移動視角，點小地圖跳到別處，點格子放樁。",
								onPointerDown,
								onPointerMove,
								onPointerUp,
								onPointerCancel: onPointerUp,
								onPointerLeave: () => {
									hoverRef.current = null;
								},
								onContextMenu: (e) => e.preventDefault()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute right-3 top-3 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "min-h-11 rounded-xl border border-line bg-surface/90 px-3 text-sm",
									onClick: () => look("entrance"),
									children: "回到入口"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "min-h-11 rounded-xl border border-line bg-surface/90 px-3 text-sm",
									onClick: () => look("all"),
									children: "看全圖"
								})]
							}),
							hud.toast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 rounded-full bg-surface px-3 py-1 text-sm text-gold",
								children: hud.toast
							}) : null,
							hud.phase === "prep" && prologue >= PROLOGUE.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "absolute bottom-3 left-44 right-3 text-sm text-muted",
								children: coarse && hud.buildType ? "拖曳看別處。點一次看射程，同一格再點一次才放樁。" : "拖曳或 WASD 移動視角，滾輪縮放。左下小地圖可跳到別的入口。點一下才放樁。"
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "flex flex-col border-t border-line bg-surface lg:border-t-0 lg:border-l",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b border-line p-3",
								children: [hud.phase === "prep" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-bg",
									onClick: () => {
										sfxRef.current?.resume();
										sim.startWave();
										sync();
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Swords, { className: "size-4" }),
										"派出第 ",
										wave.id,
										" 波"
									]
								}) : hud.phase === "fight" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										"交戰中 · 場上 ",
										hud.enemyCount,
										" · 未登場 ",
										hud.queueLeft,
										hud.paused ? " · 已暫停" : ""
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: hud.phase === "victory" ? "城門守住了" : "城燈滅了"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 border-l-2 border-primary pl-3 text-sm leading-relaxed",
									children: wave.line
								})]
							}),
							hud.selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inspector, {
								hud,
								onUpgrade: (path) => {
									sim.upgrade(path);
									sync();
								},
								onAim: (mode) => {
									sim.setAim(mode);
									sync();
								},
								onSell: () => {
									sim.sell();
									sync();
								}
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex border-b border-line",
								children: [
									["build", "布陣"],
									["log", "戰報"],
									["cast", "人物"]
								].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn("min-h-11 flex-1 text-sm", tab === id ? "text-primary" : "text-muted"),
									onClick: () => setTab(id),
									children: label
								}, id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-h-0 flex-1 overflow-y-auto p-3",
								children: [
									tab === "build" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [hud.buildType ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArmedTraits, { id: hud.buildType }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-3 text-sm text-muted",
										children: "點一張卡看屬性，再點地圖放樁。越強的殘響掉越多金幣。"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 gap-2",
										children: TOWERS.map((tower) => {
											const open = hud.waveIndex + 1 >= tower.unlockWave;
											const armed = hud.buildType === tower.id;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												disabled: !open || hud.phase === "victory" || hud.phase === "defeat",
												onClick: () => {
													sim.arm(tower.id);
													armedRef.current = null;
													sync();
												},
												className: cn("flex min-h-11 gap-2 rounded-xl border p-2 text-left", armed ? "border-primary bg-surface-2" : "border-line bg-bg", !open && "opacity-50"),
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: tower.art,
													alt: "",
													className: "size-12 shrink-0 rounded-full object-cover"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "min-w-0",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "flex items-center gap-1 text-sm font-medium",
															children: [tower.name, !open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3" }) : null]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: cn("block text-sm", hud.gold < tower.cost ? "text-danger" : "text-gold"),
															children: open ? `${tower.cost} 金` : `第 ${tower.unlockWave} 波`
														}),
														open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraitChips, { ids: tower.traits }) : null
													]
												})]
											}, tower.id);
										})
									})] }) : null,
									tab === "log" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										ref: logRef,
										className: "max-h-80 space-y-2 overflow-y-auto text-sm leading-relaxed",
										children: hud.log.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted",
											children: line
										}, `${i}-${line.slice(0, 8)}`))
									}) : null,
									tab === "cast" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Codex, {}) : null
								]
							})
						]
					})]
				})]
			}),
			playing && prologue < PROLOGUE.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryCard, {
				speaker: PROLOGUE[prologue].speaker,
				text: PROLOGUE[prologue].text,
				step: `${prologue + 1} / ${PROLOGUE.length}`,
				primary: prologue === PROLOGUE.length - 1 ? "踏上城垛" : "繼續",
				onNext: () => setPrologue((n) => n + 1),
				onSkip: () => setPrologue(PROLOGUE.length)
			}) : null,
			playing && (hud.phase === "victory" || hud.phase === "defeat") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryCard, {
				speaker: hud.phase === "victory" ? ENDING.winTitle : ENDING.loseTitle,
				text: hud.phase === "victory" ? ENDING.win : ENDING.lose,
				step: `擊殺 ${hud.kills} · 漏網 ${hud.leaks} · 餘金 ${hud.gold}`,
				primary: "重新開始",
				onNext: restart
			}) : null
		]
	});
}
function Menu({ record, onStart, onEndless }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/art/chaoxi.png",
				alt: "",
				className: "pointer-events-none absolute right-0 top-0 h-full w-auto max-w-none object-cover opacity-90"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-r from-bg via-bg/92 to-bg/25" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-5 px-5 py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm tracking-widest text-primary",
						children: "200 × 200 澄洲"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl text-fg",
						children: "澄潮守城"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-xl text-base leading-relaxed text-muted",
						children: "潮徑拉得很長，視角不再鎖在地圖中間。拖曳、滾輪或 WASD 都能看向別的入口。多個入口的波次會把兵平均拆開。"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: LEVELS.map((level) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "rounded-2xl border border-line bg-surface/80 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-xl",
									children: level.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-relaxed text-muted",
									children: level.blurb
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-sm text-gold",
									children: [
										level.grid.spawns.length,
										" 入口 · ",
										level.grid.goals.length,
										" 終點 · ",
										level.waves.length,
										" 波"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-primary px-3 text-sm font-medium text-bg",
										onClick: () => onStart(level.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "mr-1 size-4" }), level.story ? "故事" : "進入"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-3 text-sm",
										onClick: () => onEndless(level.id),
										children: "無盡"
									})]
								})
							]
						}, level.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [record.bestWave > 0 ? `最遠第 ${record.bestWave} 波 · 守成 ${record.wins} 次` : "尚無守城紀錄", record.endlessBest > 0 ? ` · 無盡到第 ${record.endlessBest} 潮` : ""]
					})
				]
			})
		]
	});
}
function Stat({ icon, label, value, gold, danger }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-bg px-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: gold ? "text-gold" : danger ? "text-danger" : "text-primary",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("text-base font-medium", danger && "text-danger", gold && "text-gold"),
				children: value
			})
		]
	});
}
function Inspector({ hud, onUpgrade, onAim, onSell }) {
	const sel = hud.selected;
	if (!sel) return null;
	const def = TOWERS.find((t) => t.id === sel.typeId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 border-b border-line p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [def ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: def.art,
					alt: "",
					className: "size-12 rounded-full object-cover"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg leading-none",
					children: sel.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: sel.title
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"傷害 ",
					sel.damage,
					" · 射速 ",
					sel.rate,
					"/秒 · 射程 ",
					Math.round(sel.range / 32 * 10) / 10,
					" 格"
				]
			}),
			def ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraitList, { ids: def.traits }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpgradeButton, {
					label: "傷害",
					rank: sel.dmgRank,
					cost: sel.dmgCost,
					next: sel.nextDamage == null ? null : String(sel.nextDamage),
					gold: hud.gold,
					onClick: () => onUpgrade("dmg")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UpgradeButton, {
					label: "射速",
					rank: sel.rateRank,
					cost: sel.rateCost,
					next: sel.nextRate == null ? null : `${sel.nextRate}/秒`,
					gold: hud.gold,
					onClick: () => onUpgrade("rate")
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-1",
				children: AIM_ORDER.map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("min-h-11 rounded-lg text-sm", sel.mode === mode ? "bg-primary text-bg" : "bg-surface-2 text-fg"),
					onClick: () => onAim(mode),
					children: AIM_LABEL[mode]
				}, mode))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "min-h-11 w-full rounded-xl border border-line text-sm text-muted",
				onClick: onSell,
				children: [
					"出售，返還 ",
					sel.sell,
					" 金"
				]
			})
		]
	});
}
function UpgradeButton({ label, rank, cost, next, gold, onClick }) {
	const maxed = cost == null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		disabled: maxed || gold < (cost ?? 0),
		onClick,
		className: "min-h-11 rounded-xl border border-line bg-surface-2 px-2 text-sm disabled:opacity-40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "block",
			children: [
				label,
				" ",
				rank,
				"/3"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-gold",
			children: maxed ? "已滿" : `${cost} 金 → ${next}`
		})]
	});
}
function TraitChips({ ids }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mt-1 flex flex-wrap gap-1",
		children: ids.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "rounded-full bg-surface-2 px-1.5 py-0.5 text-xs text-primary",
			children: TRAITS[id].name
		}, id))
	});
}
function TraitList({ ids }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-1",
		children: ids.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "text-sm leading-relaxed text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-primary",
				children: TRAITS[id].name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" · ", TRAITS[id].hint] })]
		}, id))
	});
}
function ArmedTraits({ id }) {
	const tower = TOWERS.find((item) => item.id === id);
	if (!tower) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 rounded-xl border border-line bg-bg p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-base",
				children: tower.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-sm text-muted",
				children: tower.blurb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraitList, { ids: tower.traits })
		]
	});
}
function Codex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			TOWERS.map((tower) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: tower.art,
					alt: "",
					className: "size-14 shrink-0 rounded-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-base",
						children: [tower.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-sm text-muted",
							children: tower.title
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TraitList, { ids: tower.traits }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed text-muted",
						children: tower.story
					})
				] })]
			}, tower.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "flex items-center gap-2 font-display text-base",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4 text-primary" }), "殘響"]
			}),
			[
				"wisp",
				"swift",
				"shell",
				"core"
			].map((kind) => {
				const enemy = ENEMIES[kind];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm leading-relaxed text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-fg",
							children: [enemy.name, "。"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-gold",
							children: [
								" 基礎 ",
								enemy.gold,
								" 金，波次越後越高。"
							]
						}),
						enemy.blurb
					]
				}, kind);
			})
		]
	});
}
function StoryCard({ speaker, text, step, primary, onNext, onSkip }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-30 flex items-end justify-center bg-bg/70 p-4 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-lg rounded-2xl border border-line bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-primary",
					children: speaker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-base leading-relaxed",
					children: text
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: step
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-primary text-sm font-medium text-bg",
						onClick: onNext,
						children: primary
					}), onSkip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "inline-flex min-h-11 items-center justify-center rounded-xl border border-line px-4 text-sm text-muted",
						onClick: onSkip,
						children: "跳過"
					}) : null]
				})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefenseGame, {});
}
//#endregion
export { Home as component };
