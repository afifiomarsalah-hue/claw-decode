# 📋 Claude Code Cheatsheet — Everything in One Page

> One-page reference for everything found in Claude Code's leaked source.

---

## 🔧 All 43 Tools

| # | Tool | Category | What It Does |
|---|------|----------|-------------|
| 1 | `FileRead` | Core | Read file contents with line ranges |
| 2 | `FileWrite` | Core | Create or overwrite files |
| 3 | `FileEdit` | Core | Surgical text replacement |
| 4 | `Glob` | Core | Pattern-based file search |
| 5 | `Grep` | Core | Content search across files |
| 6 | `NotebookEdit` | Core | Jupyter notebook cell editing |
| 7 | `Bash` | Exec | Shell command execution |
| 8 | `PowerShell` | Exec | Windows PowerShell |
| 9 | `REPL` | Exec | Interactive REPL mode *(internal)* |
| 10 | `Agent` | Agent | Spawn subagents |
| 11 | `TeamCreate` | Agent | Create multi-agent teams |
| 12 | `TeamDelete` | Agent | Remove teams |
| 13 | `SendMessage` | Agent | Cross-session messaging |
| 14 | `TaskCreate` | Agent | Create coordination tasks |
| 15 | `TaskGet` | Agent | Get task details |
| 16 | `TaskList` | Agent | List all tasks |
| 17 | `TaskUpdate` | Agent | Update task state |
| 18 | `TaskStop` | Agent | Stop running tasks |
| 19 | `TaskOutput` | Agent | Collect task results |
| 20 | `TodoWrite` | Agent | Manage todo items |
| 21 | `WebSearch` | Web | Search the web |
| 22 | `WebFetch` | Web | Fetch & extract web content |
| 23 | `MCPTool` | MCP | Model Context Protocol integration |
| 24 | `McpAuth` | MCP | MCP authentication |
| 25 | `ListMcpResources` | MCP | List MCP server resources |
| 26 | `ReadMcpResource` | MCP | Read MCP resources |
| 27 | `LSP` | IDE | Language Server Protocol |
| 28 | `Sleep` | Session | Wait (user-interruptible) |
| 29 | `ScheduleCron` | Session | Schedule recurring tasks |
| 30 | `RemoteTrigger` | Session | Manage remote triggers via API |
| 31 | `SendUserMessage` | Session | Send proactive messages *(KAIROS)* |
| 32 | `EnterPlanMode` | Nav | Switch to planning mode |
| 33 | `ExitPlanMode` | Nav | Exit planning mode |
| 34 | `EnterWorktree` | Nav | Create isolated git worktree |
| 35 | `ExitWorktree` | Nav | Leave git worktree |
| 36 | `ConfigTool` | Config | Manage configuration |
| 37 | `SkillTool` | Config | Execute skills |
| 38 | `ToolSearchTool` | Config | Search available tools |
| 39 | `DiscoverSkillsTool` | Config | AI-powered skill search *(internal)* |
| 40 | `AskUserQuestion` | UX | Prompt user for input |
| 41 | `SyntheticOutputTool` | UX | Generate synthetic output |
| 42 | `BriefTool` | UX | Send messages to user *(KAIROS)* |
| 43 | `TodoWrite` | Planning | Write and manage todos |

---

## 🎭 Feature Flags (Unreleased)

| Flag | What It Enables | Status |
|------|----------------|--------|
| `BUDDY` | Virtual pet companion | Unreleased |
| `KAIROS` | Full proactive persistent assistant | Unreleased |
| `KAIROS_BRIEF` | SendUserMessage tool only | Partial |
| `PROACTIVE` | Earlier proactive iteration | Unreleased |
| `CACHED_MICROCOMPACT` | Context compression | Internal |
| `VERIFICATION_AGENT` | Auto-verification subagent | Unreleased |
| `EXPERIMENTAL_SKILL_SEARCH` | Skill discovery | Experimental |
| `TOKEN_BUDGET` | Token budget management | Unreleased |
| `UDS_INBOX` | Unix Domain Socket messaging | Unreleased |
| `AGENT_TRIGGERS` | Remote trigger API | Partial (/loop) |

---

## 🐾 Buddy Species & Rarity

| Species | Rarity |
|---------|--------|
| Duck, Goose, Blob, Cat | Common |
| Dragon, Octopus, Owl | Uncommon |
| Penguin, Turtle, Snail | Rare |
| Ghost, Axolotl | Epic |
| Capybara, Cactus, Robot | Legendary |

- 5 lines tall, 12 chars wide per sprite
- Multiple animation frames per species
- Hats are equipped on line 0
- Mutable via `companionMuted` config

---

## 🧠 Memory System (memdir)

```
Memory Directory/
├── ENTRYPOINT.md     ← Index file (< 25KB, < max lines)
├── topic-1.md        ← Topic files
├── topic-2.md
└── logs/
    └── YYYY/MM/
        └── YYYY-MM-DD.md  ← Daily logs
```

**Dream Mode 4 Phases:**
1. **Orient** — `ls` memory dir, read index, skim topics
2. **Gather** — Check daily logs → drifted memories → grep transcripts
3. **Consolidate** — Merge, fix dates (relative → absolute), delete contradictions
4. **Prune** — Keep index under limits, remove stale pointers

---

## 📡 Agent Communication

| Protocol | Format | Scope |
|----------|--------|-------|
| Local UDS | `uds:/path/to.sock` | Same machine |
| Bridge | `bridge:session_01AbCd...` | Cross-machine |

Messages arrive as `<cross-session-message from="...">`.
Discovery via `ListPeers`.

---

## 🔐 Internal vs External Build

| Feature | External (Public) | Internal (Anthropic) |
|---------|-------------------|---------------------|
| Code comments | Not mentioned | "Default to NO comments" |
| Output length | "Be concise" | "≤25 words between tools, ≤100 words final" |
| Verification | None | Mandatory for 3+ file edits |
| REPL mode | Opt-in | Default on |
| Undercover | N/A | Auto-enabled for public repos |
| Feature flags | Stripped (DCE) | All enabled |
| False claim guard | Basic | Explicit: "never claim all tests pass when output shows failures" |

---

## 🔑 Model Codenames (Leaked)

| Codename | Evidence |
|----------|---------|
| **Capybara** | Referenced in code style comments, buddy species, model name obfuscation |
| **Tengu** | Feature flag prefix: `tengu_kairos_cron`, `tengu_hive_evidence` |
| **Numbat** | Referenced in output efficiency section: "Remove this section when we launch numbat" |

**Unreleased versions:** `claude-opus-4-6`, `claude-sonnet-4-6` (referenced as "most recent")
**Knowledge cutoffs:** Opus 4.6 = May 2025, Sonnet 4.6 = August 2025

---

## 📂 Key Source Paths

| Path | Contents |
|------|----------|
| `src/constants/prompts.ts` | Main system prompt assembly (914 lines) |
| `src/constants/cyberRiskInstruction.ts` | Safety boundaries |
| `src/tools/*/prompt.ts` | Individual tool prompts |
| `src/buddy/` | Virtual pet system |
| `src/tasks/DreamTask/` | Dream mode UI |
| `src/services/autoDream/` | Memory consolidation |
| `src/utils/undercover.ts` | Identity protection |
| `src/coordinator/` | Multi-agent orchestration |
| `src/memdir/` | Memory file system |
| `src/proactive/` | KAIROS proactive mode |

---

*This cheatsheet covers Claude Code v2.1.88 as exposed on March 31, 2026.*
