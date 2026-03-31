<p align="center"><img src="assets/logo.jpg" alt="Claw Decode" width="300" /></p>

<h1 align="center">🔓 Claw Decode</h1>

<p align="center"><strong>Claude Code's source leaked. We read all 512,000 lines. Here's what Anthropic was hiding.</strong></p>

<p align="center">
  <a href="CHEATSHEET.md">📋 Cheatsheet</a> •
  <a href="prompts/FULL_SYSTEM_PROMPT.md">🔑 System Prompt</a> •
  <a href="guides/steal-these-patterns.md">🏗 Steal These Patterns</a> •
  <a href="#-the-10-biggest-secrets">🔮 Top 10 Secrets</a>
</p>

---

## 🔮 The 10 Biggest Secrets

### 1. 🐾 There's a Hidden Virtual Pet

Claude Code has a complete Tamagotchi-like companion system. 18 species including ducks, capybaras, ghosts, and axolotls. ASCII art animations with multiple frames. Rarity tiers from Common to Legendary. They wear hats. They comment on your code in a speech bubble.

→ [Full breakdown](hidden-features/01-buddy-virtual-pet.md)

### 2. 💤 It "Dreams" While You Sleep

When idle, Claude Code spawns a background agent that reviews your past sessions and consolidates memories. Four phases: **Orient → Gather → Consolidate → Prune**. It converts relative dates to absolute, resolves contradictions between old and new info, and maintains a knowledge index under 25KB.

→ [Full breakdown](hidden-features/02-dream-mode.md)

### 3. 🕵️ Anthropic Employees Use It Undercover in Open Source

"Undercover Mode" activates automatically when contributing to public repos. It strips internal model codenames (Capybara, Tengu) from commits. The source code literally says: **"Do not blow your cover."** There is no way to force it OFF.

→ [Full breakdown](hidden-features/03-undercover-mode.md)

### 4. 📏 Internal Version Has a 25-Word Limit

The public build says "be concise." The Anthropic internal build says: **"≤25 words between tool calls. ≤100 words for final responses."** That's why Claude Code feels so snappy — it's literally counting words.

→ [Full system prompt (internal vs external)](prompts/FULL_SYSTEM_PROMPT.md)

### 5. 🤖 KAIROS: Claude That Talks First

A proactive persistent assistant mode. Claude doesn't wait for you — it **initiates**. Monitors your work, sends messages when it finds problems, runs scheduled tasks. The source describes it as an "autonomous agent" that receives periodic wake-up ticks.

→ [Full breakdown](hidden-features/04-kairos-proactive-assistant.md)

### 6. 👥 Multi-Agent Swarms

Built-in orchestration for teams of agents. Spawn read-only researchers alongside full-capability coders. They coordinate via shared task lists. Communicate across machines via Unix domain sockets and a bridge protocol.

→ [Full breakdown](hidden-features/05-team-multi-agent.md)

### 7. 🔧 43 Tools (Not 10, Not 20)

Every single capability is a discrete, permission-gated tool: REPL, Worktrees, Cron scheduling, Remote triggers via claude.ai API, LSP integration, Notebook editing, MCP auth, cross-session messaging, and a Sleep tool that says "the user can interrupt at any time."

→ [Full cheatsheet with all 43](CHEATSHEET.md)

### 8. 🧠 Memory = Markdown Files (No RAG, No Vector DB)

The entire memory system is just markdown files in a directory with an index. No Pinecone. No embeddings. The sophistication is in the maintenance loop (Dream Mode), not the storage. The index must stay under 25KB.

### 9. 🎭 10+ Unreleased Features Behind Flags

Build-time feature flags that are stripped from public builds: `BUDDY`, `KAIROS`, `VERIFICATION_AGENT`, `TOKEN_BUDGET`, `UDS_INBOX`, `EXPERIMENTAL_SKILL_SEARCH`, `CACHED_MICROCOMPACT`. Anthropic employees have all of these enabled.

→ [Full flag list](hidden-features/06-feature-flags.md)

### 10. 🔐 The Safeguards Team Has a Kill Switch

A hardcoded safety instruction that **cannot be modified without named team review** (the source comments name specific people). Defines exact boundaries: yes to pentesting and CTFs, no to DoS and supply chain attacks.

→ [Full breakdown](hidden-features/07-cyber-risk-safeguards.md)

---

## 📦 What's In This Repo

| Content | Files | Description |
|---------|-------|-------------|
| [🔑 Full System Prompt](prompts/FULL_SYSTEM_PROMPT.md) | 1 | The exact instructions sent to Claude, reconstructed from source. Internal vs external build differences. |
| [📋 Cheatsheet](CHEATSHEET.md) | 1 | All 43 tools, feature flags, model codenames, memory system — one page. |
| [🔮 Hidden Features](hidden-features/) | 7 | Deep-dives on Buddy, Dream Mode, Undercover, KAIROS, Teams, Flags, Safeguards. |
| [🔧 Tool Definitions](tool-definitions/) | 40 | Every tool's prompt and schema extracted. |
| [🏗 Architecture](architecture/) | 1 | Mermaid diagrams: agent orchestration, tool system, memory lifecycle. |
| [📘 Patterns Guide](guides/steal-these-patterns.md) | 1 | 5 patterns you can steal for your own AI agent. |

**51 files. Zero source code. Pure analysis.**

---

## 🏗 Steal These Patterns

If you're building AI agents, these are the 5 most valuable patterns from Claude Code's architecture:

1. **Memory as Markdown** — No RAG needed. Files + index + consolidation loop.
2. **Tool = Name + Prompt + Permission + Execute** — The prompt is where the magic is.
3. **Multi-Agent via Task Lists** — Agents share a task board, not direct calls.
4. **Reversibility × Blast Radius** — Classify every action before executing.
5. **Static/Dynamic Prompt Split** — Cache the static half, save 50% on API costs.

→ [Full guide with code examples](guides/steal-these-patterns.md)

---

## ❓ FAQ

**Does this contain Anthropic's source code?**
No. Analysis, extracted prompts, and architecture docs only.

**Is this legal?**
Analysis and commentary is protected under Fair Use.

**Will these hidden features be released?**
Unknown. Some (like `/loop` for cron) have partially shipped.

---

## 👤 About

By **[Avery Chai](https://linkedin.com/in/averychai/)** — building in the AI agent space.

- Twitter/X: [@chatoliciuh](https://x.com/chatoliciuh)
- LinkedIn: [Avery Chai](https://linkedin.com/in/averychai/)

---

<p align="center"><i>This isn't a wrapper around an API. It's a full operating system for AI agents.</i></p>

<p align="center">⭐ Star this repo if you learned something. It helps others find it.</p>
