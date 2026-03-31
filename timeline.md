# 📅 The Claude Code Leak — Complete Timeline & Resources

> Everything that happened on March 31, 2026, and every resource that emerged.

---

## ⏰ Timeline

### 🔴 00:21 UTC — The Discovery
Security researcher **Chaofan Shou** ([@shoucccc / @Fried_rice on X](https://x.com/shoucccc)) discovers that Anthropic's npm package `@anthropic-ai/claude-code@2.1.88` contains a 60MB source map file (`cli.js.map`) that references the complete, unobfuscated TypeScript source.

> "Claude code source code has been leaked via a map file in their npm registry!" — @Fried_rice

The source map pointed to a ZIP file on **Anthropic's own R2 storage bucket**, containing the full `src/` directory.

### 🟠 00:30 - 02:00 UTC — Mirrors Appear
Within hours, the code was archived on multiple public GitHub repositories. The first mirrors accumulated **22,000+ stars** before any takedown attempts.

### 🟡 02:00 - 03:29 UTC — npm Supply Chain Attack (Coincidence?)
In an unrelated but simultaneous incident, a malicious version of `axios` (1.14.1 / 0.30.4) appeared on npm. Anyone who installed Claude Code during this window may have pulled compromised dependencies. ([VentureBeat](https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know))

### 🟢 04:00 UTC — Clean-Room Rewrites Begin
**Sigrid Jin** ([@instructkr](https://github.com/instructkr)) begins a Python rewrite of Claude Code's agent harness, using OpenAI's Codex (oh-my-codex) to orchestrate the port. This would later be featured in discussions about clean-room reimplementation.

### 🔵 06:00 - 12:00 UTC — Media Explosion
Major tech outlets begin reporting:
- [VentureBeat](https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know) — "Claude Code's source code appears to have leaked"
- [The Register](https://www.theregister.com/2026/03/31/anthropic_claude_code_source_code/) — "Anthropic accidentally exposes Claude Code source code"
- [CyberNews](https://cybernews.com/security/anthropic-claude-code-source-leak/) — "Full source code for Anthropic's Claude Code leaks"
- [NDTV](https://www.ndtv.com/science/anthropics-ai-coding-tool-leaks-its-own-source-code-for-the-second-time-in-a-year-11291517) — "For the second time in a year"
- [Decrypt](https://decrypt.co/362917/anthropic-accidentally-leaked-claude-code-source-internet-keeping-forever) — "DMCA takedowns failed"
- [Economic Times](https://economictimes.indiatimes.com/news/international/us/claude-code-source-code-leak-did-anthropic-just-expose-its-ai-secrets-hidden-models-and-undercover-coding-strategy-to-the-world/articleshow/129930888.cms) — "$2.5 billion enterprise secrets"

### 🟣 12:00+ UTC — DMCA Attempts
Anthropic begins issuing DMCA takedown requests. Several mirrors are removed, but the code has already been forked hundreds of times. As Decrypt noted: **"Decentralized repos made the leak effectively permanent and uncontrollable."**

### ⚫ This is the Second Time
NDTV reports this mirrors a **similar incident in early 2025** when an earlier version briefly exposed a source map before Anthropic removed the affected versions.

---

## 📦 GitHub Repositories

### Source Code Mirrors

| Repository | Description | Notes |
|-----------|-------------|-------|
| [Kuberwastaken/claude-code](https://github.com/Kuberwastaken/claude-code) | Complete TS source + detailed analysis README | Most detailed writeup |
| [mehmoodosman/claude-code-source-code](https://github.com/mehmoodosman/claude-code-source-code) | Complete TS source | Early mirror |
| [hangsman/claude-code-source](https://github.com/hangsman/claude-code-source) | Complete source + original .map file (198MB) | Most complete, includes source map |
| [stozo04/claude-code-mirror](https://github.com/stozo04/claude-code-mirror) | Mirror | — |
| [deniseliu/claude-code-sourcemap](https://github.com/deniseliu/claude-code-sourcemap) | Full original source via sourcemap | — |
| [stormzhang/claude-code-sourcemap](https://github.com/stormzhang/claude-code-sourcemap) | Chinese developer community mirror | — |
| [Golden-forest/claude-code-sourcemap](https://github.com/Golden-forest/claude-code-sourcemap) | Research mirror | — |

### Clean-Room Rewrites & Tools

| Repository | Description | Language |
|-----------|-------------|----------|
| [instructkr/claw-code](https://github.com/instructkr/claw-code) | Python rewrite of agent harness | Python → Rust |
| [shipany-ai/open-agent-sdk](https://github.com/shipany-ai/open-agent-sdk) | Open Agent SDK inspired by claude-agent-sdk | TypeScript |
| [Piebald-AI/tweakcc](https://github.com/Piebald-AI/tweakcc) | Customize Claude Code's system prompts | CLI Tool |
| [Piebald-AI/claude-code-system-prompts](https://github.com/Piebald-AI/claude-code-system-prompts) | Extracted system prompts | Markdown |

### Analysis & Documentation

| Repository | Description |
|-----------|-------------|
| **[fattail4477/claw-decode](https://github.com/fattail4477/claw-decode)** | **This repo — analysis, tools, architecture, hidden features** |

---

## 📰 Key Articles & Analysis

| Source | Title | Link |
|--------|-------|------|
| dev.to | "Claude Code's Entire Source Code Was Just Leaked via npm Source Maps" | [Link](https://dev.to/gabrielanhaia/claude-codes-entire-source-code-was-just-leaked-via-npm-source-maps-heres-whats-inside-cjo) |
| lowcode.agency | "Claude Code Source Code Leaked? Here's what it contains" | [Link](https://www.lowcode.agency/blog/claude-code-source-code-leaked) |
| victorantos.com | "Claude Code Internals: An AI-Assisted Analysis" | [Link](https://victorantos.com/posts/i-pointed-claude-at-its-own-leaked-source-heres-what-it-found/) |
| penligent.ai | "Claude Code Source Map Leak: What Was Exposed" | [Link](https://www.penligent.ai/hackinglabs/claude-code-source-map-leak-what-was-exposed-and-what-it-means/) |
| apiyi.com | "Interpretation of the Claude Code source code leak" | [Link](https://help.apiyi.com/en/claude-code-source-leak-march-2026-impact-ai-agent-industry-en.html) |
| HuggingFace | "Production AI Architecture Patterns from 512,000 Lines" | [Link](https://discuss.huggingface.co/t/claude-code-source-leak-production-ai-architecture-patterns-from-512-000-lines/174846) |
| tinyash.com | "Claude Code 源码泄漏事件分析" (Chinese) | [Link](https://www.tinyash.com/blog/claude-code-source-leak-analysis/) |

---

## 🐦 Key Tweets

### The Original Discovery
> **@Fried_rice (Chaofan Shou):** "Claude code source code has been leaked via a map file in their npm registry!"
> 
> — March 31, 2026 · **3.1 million views**

### The Instructkr Response
> **@instructkr (Sigrid Jin):** Began Python rewrite within hours, using oh-my-codex for orchestration. Previously featured in Wall Street Journal for using 25 billion Claude Code tokens.

---

## 📊 By The Numbers

| Metric | Value |
|--------|-------|
| Lines of code exposed | 512,000+ |
| TypeScript files | 1,900+ |
| Tools discovered | 43 |
| Hidden features | 7+ |
| Feature flags | 10+ |
| Unreleased model codenames | 3 (Capybara, Tengu, Numbat) |
| Original tweet views | 3.1 million+ |
| GitHub mirrors (first 12 hours) | 20+ |
| Stars on top mirror | 22,000+ |
| Media outlets covering | 10+ major |
| This is the Nth time it happened | 2nd |

---

*Last updated: March 31, 2026*
*Maintained by [Avery Chai](https://linkedin.com/in/averychai/) — [clawdecode.net](https://clawdecode.net)*
