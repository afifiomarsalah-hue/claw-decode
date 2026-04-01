#!/usr/bin/env node

// src/sprites.ts
var SPECIES = [
  "duck",
  "goose",
  "blob",
  "cat",
  "dragon",
  "octopus",
  "owl",
  "penguin",
  "turtle",
  "snail",
  "ghost",
  "axolotl",
  "capybara",
  "cactus",
  "robot",
  "rabbit",
  "mushroom",
  "chonk"
];
var EYES = ["\xB7", "\u2726", "\xD7", "\u25C9", "@", "\xB0"];
var HATS = ["none", "crown", "tophat", "propeller", "halo", "wizard", "beanie", "tinyduck"];
var RARITIES = ["common", "uncommon", "rare", "epic", "legendary"];
var RARITY_WEIGHTS = {
  common: 60,
  uncommon: 25,
  rare: 10,
  epic: 4,
  legendary: 1
};
var RARITY_STARS = {
  common: "\u2605",
  uncommon: "\u2605\u2605",
  rare: "\u2605\u2605\u2605",
  epic: "\u2605\u2605\u2605\u2605",
  legendary: "\u2605\u2605\u2605\u2605\u2605"
};
var STAT_NAMES = ["DEBUGGING", "PATIENCE", "CHAOS", "WISDOM", "SNARK"];
var BODIES = {
  duck: [
    ["            ", "    __      ", "  <({E} )___  ", "   (  ._>   ", "    `--\xB4    "],
    ["            ", "    __      ", "  <({E} )___  ", "   (  ._>   ", "    `--\xB4~   "]
  ],
  goose: [
    ["            ", "     ({E}>    ", "     ||     ", "   _(__)_   ", "    ^^^^    "],
    ["            ", "    ({E}>     ", "     ||     ", "   _(__)_   ", "    ^^^^    "]
  ],
  blob: [
    ["            ", "   .----.   ", "  ( {E}  {E} )  ", "  (      )  ", "   `----\xB4   "],
    ["            ", "  .------.  ", " (  {E}  {E}  ) ", " (        ) ", "  `------\xB4  "]
  ],
  cat: [
    ["            ", "   /\\_/\\    ", "  ( {E}   {E})  ", "  (  \u03C9  )   ", '  (")_(")   '],
    ["            ", "   /\\_/\\    ", "  ( {E}   {E})  ", "  (  \u03C9  )   ", '  (")_(")~  ']
  ],
  dragon: [
    ["            ", "  /^\\  /^\\  ", " <  {E}  {E}  > ", " (   ~~   ) ", "  `-vvvv-\xB4  "],
    ["            ", "  /^\\  /^\\  ", " <  {E}  {E}  > ", " (        ) ", "  `-vvvv-\xB4  "]
  ],
  octopus: [
    ["            ", "   .----.   ", "  ( {E}  {E} )  ", "  (______)  ", "  /\\/\\/\\/\\  "],
    ["            ", "   .----.   ", "  ( {E}  {E} )  ", "  (______)  ", "  \\/\\/\\/\\/  "]
  ],
  owl: [
    ["            ", "   /\\  /\\   ", "  (({E})({E}))  ", "  (  ><  )  ", "   `----\xB4   "],
    ["            ", "   /\\  /\\   ", "  (({E})({E}))  ", "  (  ><  )  ", "   .----.   "]
  ],
  penguin: [
    ["            ", "  .---.     ", "  ({E}>{E})     ", " /(   )\\    ", "  `---\xB4     "],
    ["            ", "  .---.     ", "  ({E}>{E})     ", " |(   )|    ", "  `---\xB4     "]
  ],
  turtle: [
    ["            ", "   _,--._   ", "  ( {E}  {E} )  ", " /[______]\\ ", "  ``    ``  "],
    ["            ", "   _,--._   ", "  ( {E}  {E} )  ", " /[______]\\ ", "   ``  ``   "]
  ],
  snail: [
    ["            ", " {E}    .--.  ", "  \\  ( @ )  ", "   \\_`--\xB4   ", "  ~~~~~~~   "],
    ["            ", "  {E}   .--.  ", "  |  ( @ )  ", "   \\_`--\xB4   ", "  ~~~~~~~   "]
  ],
  ghost: [
    ["            ", "   .----.   ", "  / {E}  {E} \\  ", "  |      |  ", "  ~`~``~`~  "],
    ["            ", "   .----.   ", "  / {E}  {E} \\  ", "  |      |  ", "  `~`~~`~`  "]
  ],
  axolotl: [
    ["            ", "}~(______)~{", "}~({E} .. {E})~{", "  ( .--. )  ", "  (_/  \\_)  "],
    ["            ", "~}(______){~", "~}({E} .. {E}){~", "  ( .--. )  ", "  (_/  \\_)  "]
  ],
  capybara: [
    ["            ", "  n______n  ", " ( {E}    {E} ) ", " (   oo   ) ", "  `------\xB4  "],
    ["            ", "  n______n  ", " ( {E}    {E} ) ", " (   Oo   ) ", "  `------\xB4  "]
  ],
  cactus: [
    ["            ", " n  ____  n ", " | |{E}  {E}| | ", " |_|    |_| ", "   |    |   "],
    ["            ", "    ____    ", " n |{E}  {E}| n ", " |_|    |_| ", "   |    |   "]
  ],
  robot: [
    ["            ", "   .[||].   ", "  [ {E}  {E} ]  ", "  [ ==== ]  ", "  `------\xB4  "],
    ["            ", "   .[||].   ", "  [ {E}  {E} ]  ", "  [ -==- ]  ", "  `------\xB4  "]
  ],
  rabbit: [
    ["            ", "   (\\__/)   ", "  ( {E}  {E} )  ", " =(  ..  )= ", '  (")__(")  '],
    ["            ", "   (|__/)   ", "  ( {E}  {E} )  ", " =(  ..  )= ", '  (")__(")  ']
  ],
  mushroom: [
    ["            ", " .-o-OO-o-. ", "(__________)", "   |{E}  {E}|   ", "   |____|   "],
    ["            ", " .-O-oo-O-. ", "(__________)", "   |{E}  {E}|   ", "   |____|   "]
  ],
  chonk: [
    ["            ", "  /\\    /\\  ", " ( {E}    {E} ) ", " (   ..   ) ", "  `------\xB4  "],
    ["            ", "  /\\    /|  ", " ( {E}    {E} ) ", " (   ..   ) ", "  `------\xB4  "]
  ]
};
var HAT_LINES = {
  none: "",
  crown: "   \\^^^/    ",
  tophat: "   [___]    ",
  propeller: "    -+-     ",
  halo: "   (   )    ",
  wizard: "    /^\\     ",
  beanie: "   (___)    ",
  tinyduck: "    ,>      "
};
function renderSprite(bones2, frame = 0) {
  const frames = BODIES[bones2.species];
  const body = frames[frame % frames.length].map(
    (line) => line.replaceAll("{E}", bones2.eye)
  );
  const lines = [...body];
  if (bones2.hat !== "none" && !lines[0].trim()) {
    lines[0] = HAT_LINES[bones2.hat];
  }
  if (!lines[0].trim() && frames.every((f) => !f[0].trim())) lines.shift();
  return lines;
}

// src/roll.ts
function mulberry32(seed) {
  let a = seed >>> 0;
  return function() {
    a |= 0;
    a = a + 1831565813 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function hashString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length)];
}
function rollRarity(rng) {
  const total = Object.values(RARITY_WEIGHTS).reduce((a, b) => a + b, 0);
  let roll2 = rng() * total;
  for (const rarity of RARITIES) {
    roll2 -= RARITY_WEIGHTS[rarity];
    if (roll2 < 0) return rarity;
  }
  return "common";
}
var RARITY_FLOOR = {
  common: 5,
  uncommon: 15,
  rare: 25,
  epic: 35,
  legendary: 50
};
function rollStats(rng, rarity) {
  const floor = RARITY_FLOOR[rarity];
  const peak = pick(rng, STAT_NAMES);
  let dump = pick(rng, STAT_NAMES);
  while (dump === peak) dump = pick(rng, STAT_NAMES);
  const stats = {};
  for (const name of STAT_NAMES) {
    if (name === peak) {
      stats[name] = Math.min(100, floor + 50 + Math.floor(rng() * 30));
    } else if (name === dump) {
      stats[name] = Math.max(1, floor - 10 + Math.floor(rng() * 15));
    } else {
      stats[name] = floor + Math.floor(rng() * 40);
    }
  }
  return stats;
}
var SALT = "friend-2026-401";
function roll(userId2) {
  const key = userId2 + SALT;
  const rng = mulberry32(hashString(key));
  const rarity = rollRarity(rng);
  return {
    rarity,
    species: pick(rng, SPECIES),
    eye: pick(rng, EYES),
    hat: rarity === "common" ? "none" : pick(rng, HATS),
    shiny: rng() < 0.01,
    stats: rollStats(rng, rarity)
  };
}

// src/cli.ts
import { execSync } from "child_process";
import { homedir } from "os";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
var RESET = "\x1B[0m";
var BOLD = "\x1B[1m";
var DIM = "\x1B[2m";
var COLORS = {
  common: "\x1B[37m",
  // white
  uncommon: "\x1B[32m",
  // green
  rare: "\x1B[36m",
  // cyan
  epic: "\x1B[35m",
  // purple
  legendary: "\x1B[33m"
  // yellow/gold
};
var HAT_NAMES = {
  none: "\u2014",
  crown: "\u{1F451} Crown",
  tophat: "\u{1F3A9} Top Hat",
  propeller: "\u{1F9E2} Propeller",
  halo: "\u{1F607} Halo",
  wizard: "\u{1F9D9} Wizard",
  beanie: "\u{1F9F6} Beanie",
  tinyduck: "\u{1F424} Tiny Duck"
};
var SPECIES_EMOJI = {
  duck: "\u{1F986}",
  goose: "\u{1FABF}",
  blob: "\u{1FAE7}",
  cat: "\u{1F431}",
  dragon: "\u{1F409}",
  octopus: "\u{1F419}",
  owl: "\u{1F989}",
  penguin: "\u{1F427}",
  turtle: "\u{1F422}",
  snail: "\u{1F40C}",
  ghost: "\u{1F47B}",
  axolotl: "\u{1F98E}",
  capybara: "\u{1F439}",
  cactus: "\u{1F335}",
  robot: "\u{1F916}",
  rabbit: "\u{1F430}",
  mushroom: "\u{1F344}",
  chonk: "\u{1F63A}"
};
function detectUserId() {
  const configPaths = [
    join(homedir(), ".claude", "config.json"),
    join(homedir(), ".config", "claude", "config.json")
  ];
  for (const p of configPaths) {
    try {
      if (existsSync(p)) {
        const config = JSON.parse(readFileSync(p, "utf-8"));
        if (config.oauthAccount?.accountUuid) return config.oauthAccount.accountUuid;
        if (config.userID) return config.userID;
      }
    } catch {
    }
  }
  try {
    const email = execSync("git config --global user.email", { encoding: "utf-8" }).trim();
    if (email) return email;
  } catch {
  }
  return null;
}
function renderBar(value, width = 20) {
  const filled = Math.round(value / 100 * width);
  return "\u2588".repeat(filled) + "\u2591".repeat(width - filled);
}
function animate(bones2) {
  const color = COLORS[bones2.rarity] || "";
  const sprite0 = renderSprite(bones2, 0);
  const sprite1 = renderSprite(bones2, 1);
  let frame = 0;
  const interval = setInterval(() => {
    const sprite = frame % 2 === 0 ? sprite0 : sprite1;
    if (frame > 0) process.stdout.write(`\x1B[${sprite.length}A`);
    for (const line of sprite) {
      process.stdout.write(`${color}    ${line}${RESET}
`);
    }
    frame++;
    if (frame >= 6) {
      clearInterval(interval);
      printInfo(bones2);
    }
  }, 400);
}
function printInfo(bones2) {
  const color = COLORS[bones2.rarity] || "";
  const dropRate = RARITY_WEIGHTS[bones2.rarity];
  console.log();
  console.log(`  ${SPECIES_EMOJI[bones2.species] || "\u{1F43E}"} ${BOLD}${color}${bones2.species.toUpperCase()}${RESET}`);
  console.log(`  ${color}${RARITY_STARS[bones2.rarity]} ${bones2.rarity.toUpperCase()}${RESET} ${DIM}(${dropRate}% drop rate)${RESET}`);
  console.log(`  Hat: ${HAT_NAMES[bones2.hat]}  ${DIM}|${RESET}  Eyes: ${bones2.eye}  ${bones2.shiny ? `${DIM}|${RESET}  \u2728 SHINY!` : ""}`);
  console.log();
  console.log(`  ${BOLD}Stats${RESET}`);
  for (const stat of STAT_NAMES) {
    const val = bones2.stats[stat];
    const barColor = val >= 80 ? "\x1B[32m" : val >= 50 ? "\x1B[33m" : "\x1B[31m";
    console.log(`  ${stat.padEnd(10)} ${barColor}${renderBar(val)}${RESET} ${val}`);
  }
  console.log();
  const shareText = `I hatched a ${bones2.rarity} ${bones2.species} ${SPECIES_EMOJI[bones2.species] || "\u{1F43E}"} in Claude Code's hidden pet system! ${RARITY_STARS[bones2.rarity]}`;
  console.log(`  ${DIM}Share: "${shareText}"${RESET}`);
  console.log(`  ${DIM}https://clawdecode.net/hatch${RESET}`);
  console.log();
}
var args = process.argv.slice(2);
var userId = args[0];
if (!userId) {
  userId = detectUserId() ?? void 0;
  if (userId) {
    console.log(`
  ${DIM}Auto-detected identity: ${userId}${RESET}`);
  }
}
if (!userId) {
  console.log(`
  ${BOLD}\u{1F43E} claude-pet${RESET} \u2014 Hatch your hidden Claude Code companion

  ${DIM}Usage:${RESET}
    npx claude-pet                    ${DIM}# auto-detect from Claude Code config${RESET}
    npx claude-pet <github-username>  ${DIM}# use any identifier${RESET}
    npx claude-pet <email>            ${DIM}# use your email${RESET}

  ${DIM}This uses the exact same algorithm Claude Code uses internally
  to assign you a companion. Same hash, same PRNG, same salt.
  The pet system exists in the code \u2014 Anthropic just hasn't enabled it yet.${RESET}

  ${DIM}https://clawdecode.net${RESET}
`);
  process.exit(0);
}
console.log(`
  ${BOLD}\u{1F43E} Hatching your Claude Code companion...${RESET}
`);
var bones = roll(userId);
animate(bones);
