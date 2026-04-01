# 🐾 claude-pet

**Hatch your hidden Claude Code companion.**

Claude Code has a complete virtual pet system hidden behind the `BUDDY` feature flag. 18 species, 5 rarity tiers, hats, personality stats — it's all there in the source code. Anthropic just hasn't enabled it yet.

This tool uses **the exact same algorithm** from Claude Code's source to reveal your assigned companion.

## Quick Start

```bash
npx claude-pet
```

That's it. It auto-detects your Claude Code identity and hatches your pet.

Or pass any identifier:

```bash
npx claude-pet your-github-username
npx claude-pet your@email.com
```

## What You Get

```
  🐾 Hatching your Claude Code companion...

      n______n
     ( ✦    ✦ )
     (   oo   )
      `------´

  🐹 CAPYBARA
  ★★★★★ LEGENDARY (1% drop rate)
  Hat: 👑 Crown  |  Eyes: ✦

  Stats
  DEBUGGING  ████████████████░░░░ 82
  PATIENCE   ██████░░░░░░░░░░░░░░ 31
  CHAOS      ████████████░░░░░░░░ 62
  WISDOM     ██████████████████░░ 91
  SNARK      ██████████░░░░░░░░░░ 48
```

## How It Works

Claude Code assigns each user a deterministic companion based on `hash(userId + salt)` → seeded PRNG → species, rarity, eye, hat, shiny, stats.

- **Hash:** FNV-1a (same as source)
- **PRNG:** Mulberry32 (same as source)
- **Salt:** `friend-2026-401` (same as source)
- **Drop rates:** Common 60%, Uncommon 25%, Rare 10%, Epic 4%, Legendary 1%

Your pet is the same one Claude Code would show you if the `BUDDY` flag were enabled.

## Species (18 total)

| Rarity | Species |
|--------|---------|
| 🟡 Legendary (1%) | Capybara, Cactus, Robot |
| 🟣 Epic (4%) | Ghost, Axolotl |
| 🔵 Rare (10%) | Penguin, Turtle, Snail |
| 🟢 Uncommon (25%) | Dragon, Octopus, Owl |
| ⚪ Common (60%) | Duck, Goose, Blob, Cat, Rabbit, Mushroom, Chonk |

## Hats

Crown, Top Hat, Propeller, Halo, Wizard, Beanie, Tiny Duck. Common pets don't get hats (sorry).

## Part of Claw Decode

Full analysis of Claude Code's 512K leaked source lines: [clawdecode.net](https://clawdecode.net)

GitHub: [github.com/fattail4477/claw-decode](https://github.com/fattail4477/claw-decode)

## License

MIT
