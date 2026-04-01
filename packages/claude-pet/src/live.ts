#!/usr/bin/env node
// claude-pet --live: Terminal sidebar companion
// Runs in a tmux split-pane, watches your files, reacts to changes

import { roll } from './roll.js';
import { renderSprite, RARITY_STARS, RARITY_WEIGHTS, STAT_NAMES, type CompanionBones } from './sprites.js';
import { watch } from 'fs';
import { execSync } from 'child_process';
import { homedir } from 'os';
import { readFileSync, existsSync } from 'fs';
import { join, basename, extname } from 'path';

// ─── Colors ───
const R = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const ITALIC = '\x1b[3m';
const COLORS: Record<string, string> = {
  common: '\x1b[37m', uncommon: '\x1b[32m', rare: '\x1b[36m',
  epic: '\x1b[35m', legendary: '\x1b[33m',
};

const SPECIES_EMOJI: Record<string, string> = {
  duck:'🦆', goose:'🪿', blob:'🫧', cat:'🐱', dragon:'🐉', octopus:'🐙',
  owl:'🦉', penguin:'🐧', turtle:'🐢', snail:'🐌', ghost:'👻', axolotl:'🦎',
  capybara:'🐹', cactus:'🌵', robot:'🤖', rabbit:'🐰', mushroom:'🍄', chonk:'😺',
};

const HAT_NAMES: Record<string, string> = {
  none:'', crown:'👑', tophat:'🎩', propeller:'🧢', halo:'😇',
  wizard:'🧙', beanie:'🧶', tinyduck:'🐤',
};

// ─── Reactions ───
const FILE_REACTIONS: Record<string, string[]> = {
  '.ts':  ['TypeScript? Fancy.', 'Types are your friend.', 'Another .ts file...', 'Nice types!'],
  '.tsx': ['React time!', 'Components everywhere.', 'JSX goes brrr.'],
  '.js':  ['Classic JavaScript.', 'No types? Brave.', 'JS never dies.'],
  '.css': ['Making it pretty?', 'CSS is art.', 'Flexbox or grid?', 'More CSS? Bold.'],
  '.py':  ['Python! 🐍', 'Indentation matters.', 'import antigravity'],
  '.md':  ['Documentation! Rare.', 'Words, not code. Nice.', 'README update?'],
  '.json':['Config change?', 'JSON is fine.', 'Another config file...'],
};

const IDLE_QUIPS = [
  '...', '*yawn*', '*fidget*', 'Waiting...', '*blink*',
  'Still here!', '*stretch*', 'Need coffee?', '*hum*',
  'Ship it!', 'Looks good to me.', '*nap*', 'You got this!',
  'Refactor time?', '*peek*', 'Almost there...', 'Nice progress.',
];

const COMMIT_REACTIONS = [
  'Shipped! 🚀', 'Another commit!', 'Git push?', 'Clean commit.',
  'Nice message.', 'History grows.', 'Committed!',
];

const HEARTS = ['   ♥    ♥   ', '  ♥  ♥   ♥  ', ' ♥   ♥  ♥   ', '♥  ♥      ♥ ', '·    ·   ·  '];

// ─── State ───
let bones: CompanionBones;
let color: string;
let frame = 0;
let bubble = '';
let bubbleTicks = 0;
let petTicks = 0;
let idleCount = 0;
const BUBBLE_DURATION = 20; // ticks (500ms each = 10s)
const TICK_MS = 500;

// Idle sequence from Claude Code source
const IDLE_SEQ = [0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function clear() {
  process.stdout.write('\x1b[2J\x1b[H');
}

function moveTo(row: number, col: number) {
  process.stdout.write(`\x1b[${row};${col}H`);
}

function renderBar(val: number, w = 12): string {
  const filled = Math.round((val / 100) * w);
  return '█'.repeat(filled) + '░'.repeat(w - filled);
}

function render() {
  const cols = process.stdout.columns || 24;
  const rows = process.stdout.rows || 20;

  clear();

  let row = 1;

  // ─── Header ───
  moveTo(row++, 1);
  process.stdout.write(`${BOLD}${color}${SPECIES_EMOJI[bones.species] || '🐾'} ${bones.species.toUpperCase()}${R}`);
  moveTo(row++, 1);
  process.stdout.write(`${color}${RARITY_STARS[bones.rarity]} ${bones.rarity}${R} ${DIM}${HAT_NAMES[bones.hat]}${R}`);
  row++;

  // ─── Sprite ───
  let spriteFrame: number;
  let blink = false;

  if (bubble || petTicks > 0) {
    spriteFrame = frame % 2;
  } else {
    const step = IDLE_SEQ[frame % IDLE_SEQ.length]!;
    if (step === -1) { spriteFrame = 0; blink = true; }
    else spriteFrame = step % 2;
  }

  // Pet hearts
  if (petTicks > 0) {
    const heartLine = HEARTS[Math.min(petTicks - 1, HEARTS.length - 1)];
    moveTo(row++, 1);
    process.stdout.write(`\x1b[31m${heartLine}${R}`);
  }

  const sprite = renderSprite(bones, spriteFrame);
  for (const line of sprite) {
    moveTo(row++, 1);
    const rendered = blink ? line.replaceAll(bones.eye, '-') : line;
    process.stdout.write(`${color}${rendered}${R}`);
  }
  row++;

  // ─── Speech Bubble ───
  if (bubble && bubbleTicks > 0) {
    const fade = bubbleTicks <= 6;
    const bColor = fade ? DIM : '';
    const maxW = Math.min(cols - 2, 22);
    const words = bubble.split(' ');
    const lines: string[] = [];
    let cur = '';
    for (const w of words) {
      if (cur.length + w.length + 1 > maxW && cur) { lines.push(cur); cur = w; }
      else cur = cur ? `${cur} ${w}` : w;
    }
    if (cur) lines.push(cur);

    const boxW = Math.max(...lines.map(l => l.length)) + 2;
    moveTo(row++, 1);
    process.stdout.write(`${bColor}╭${'─'.repeat(boxW)}╮${R}`);
    for (const l of lines) {
      moveTo(row++, 1);
      process.stdout.write(`${bColor}│ ${ITALIC}${l.padEnd(boxW - 2)}${R}${bColor} │${R}`);
    }
    moveTo(row++, 1);
    process.stdout.write(`${bColor}╰${'─'.repeat(boxW)}╯${R}`);
    row++;
  }

  // ─── Stats ───
  if (!bubble && rows > 18) {
    moveTo(row++, 1);
    process.stdout.write(`${DIM}─── stats ───${R}`);
    for (const stat of STAT_NAMES) {
      const val = bones.stats[stat];
      const sColor = val >= 80 ? '\x1b[32m' : val >= 50 ? '\x1b[33m' : '\x1b[31m';
      moveTo(row++, 1);
      process.stdout.write(`${DIM}${stat.slice(0,4)}${R} ${sColor}${renderBar(val)}${R} ${DIM}${val}${R}`);
    }
    row++;
  }

  // ─── Help ───
  moveTo(rows - 1, 1);
  process.stdout.write(`${DIM}p:pet t:talk q:quit${R}`);
}

function say(text: string) {
  bubble = text;
  bubbleTicks = BUBBLE_DURATION;
}

function detectUserId(): string {
  const paths = [
    join(homedir(), '.claude', 'config.json'),
    join(homedir(), '.config', 'claude', 'config.json'),
  ];
  for (const p of paths) {
    try {
      if (existsSync(p)) {
        const c = JSON.parse(readFileSync(p, 'utf-8'));
        if (c.oauthAccount?.accountUuid) return c.oauthAccount.accountUuid;
        if (c.userID) return c.userID;
      }
    } catch {}
  }
  try {
    return execSync('git config --global user.email', { encoding: 'utf-8' }).trim() || 'anon';
  } catch { return 'anon'; }
}

// ─── Main ───
const args = process.argv.slice(2).filter(a => a !== '--live');
const userId = args[0] || detectUserId();

bones = roll(userId);
color = COLORS[bones.rarity] || '';

// Hide cursor
process.stdout.write('\x1b[?25l');
process.on('exit', () => process.stdout.write('\x1b[?25h'));
process.on('SIGINT', () => { process.stdout.write('\x1b[?25h'); process.exit(0); });
process.on('SIGTERM', () => { process.stdout.write('\x1b[?25h'); process.exit(0); });

// Initial greeting
say(`Hi! I'm your ${bones.rarity} ${bones.species}!`);

// ─── File Watcher ───
let watchDir = process.cwd();
try {
  const watcher = watch(watchDir, { recursive: true }, (event, filename) => {
    if (!filename || filename.includes('node_modules') || filename.includes('.git')) return;
    if (event !== 'change') return;
    if (bubbleTicks > 10) return; // don't interrupt active bubble

    const ext = extname(filename);
    const reactions = FILE_REACTIONS[ext] || [`${basename(filename)} changed.`];
    say(pick(reactions));
  });
  watcher.on('error', () => {}); // ignore watch errors
} catch {}

// ─── Git Watcher ───
let lastCommit = '';
try { lastCommit = execSync('git rev-parse HEAD 2>/dev/null', { encoding: 'utf-8' }).trim(); } catch {}

setInterval(() => {
  try {
    const head = execSync('git rev-parse HEAD 2>/dev/null', { encoding: 'utf-8' }).trim();
    if (head !== lastCommit && lastCommit) {
      lastCommit = head;
      say(pick(COMMIT_REACTIONS));
    }
    lastCommit = head;
  } catch {}
}, 5000);

// ─── Keyboard Input ───
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', (key: string) => {
    if (key === 'q' || key === '\x03') { // q or Ctrl+C
      process.stdout.write('\x1b[?25h');
      clear();
      process.exit(0);
    }
    if (key === 'p') { // pet
      petTicks = 5;
      say('❤️ *purrs happily*');
    }
    if (key === 't') { // talk (random quip for now)
      say(pick(IDLE_QUIPS));
    }
  });
}

// ─── Main Loop ───
setInterval(() => {
  frame++;

  if (bubbleTicks > 0) bubbleTicks--;
  if (bubbleTicks === 0 && bubble) bubble = '';

  if (petTicks > 0) petTicks--;

  // Idle quips every ~30-60 seconds
  idleCount++;
  if (!bubble && idleCount > 60 + Math.random() * 60) {
    say(pick(IDLE_QUIPS));
    idleCount = 0;
  }

  render();
}, TICK_MS);

// First render
render();
