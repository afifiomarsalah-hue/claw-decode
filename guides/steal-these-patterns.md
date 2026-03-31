# 🏗 5 Patterns You Can Steal From Claude Code Today

> Practical lessons from Claude Code's architecture that you can apply to your own AI agent projects right now.

---

## 1. Memory as Markdown Files (Not RAG)

**What Claude Code does:**
Instead of vector databases or RAG pipelines, Claude Code stores memory as plain markdown files in a directory with an index file.

**Why it works:**
- LLMs are great at reading/writing text files
- No infrastructure needed (no Pinecone, no Weaviate)
- Human-readable — you can inspect and edit memories manually
- The index file acts as a table of contents, keeping under 25KB

**Steal this pattern:**

```markdown
# memory/
├── index.md          # TOC with one-line summaries (< 25KB)
├── user-prefs.md     # What the user likes/dislikes
├── project-context.md # Current project state
└── logs/
    └── 2026-03-31.md # Daily activity log
```

**Key insight:** The sophistication isn't in storage — it's in maintenance. Claude Code's "Dream Mode" periodically consolidates, prunes, and resolves contradictions. Build the maintenance loop, not a better database.

---

## 2. Tool = Name + Prompt + Permission + Execute

**What Claude Code does:**
Every capability is a discrete "tool" with four parts:
1. **Name** — unique identifier
2. **Prompt** — instructions for when/how to use it
3. **Permission** — what approval is needed
4. **Execute** — the actual implementation

**Why it works:**
- Each tool is independently testable
- Permissions are granular (auto-approve, ask user, deny)
- The prompt teaches the model when to use each tool
- Tools can be dynamically enabled/disabled

**Steal this pattern:**

```typescript
interface Tool {
  name: string;
  description: string;      // One-line for model's tool list
  prompt: string;           // Detailed usage instructions
  permission: 'auto' | 'ask' | 'deny';
  execute(params: any): Promise<ToolResult>;
  isEnabled(): boolean;     // Dynamic enable/disable
}
```

**Key insight:** The prompt field is where the magic is. Claude Code's tool prompts are incredibly detailed — they tell the model not just what the tool does, but when to use it, when NOT to use it, and what to watch out for.

---

## 3. Multi-Agent via Shared Task Lists

**What Claude Code does:**
Agents don't call each other directly. They coordinate through shared task lists:
1. Create a team → creates a task list
2. Create tasks → agents pick them up
3. Update task state → others see progress
4. TaskOutput → collect results

**Why it works:**
- Decouples agent lifecycles from task state
- Any agent can pick up any task
- Progress is visible to all agents
- No complex message routing needed

**Steal this pattern:**

```
Team "feature-build" → TaskList
├── Task 1: "Research API design" → assigned to read-only agent
├── Task 2: "Implement backend" → assigned to full-capability agent
├── Task 3: "Write tests" → assigned to full-capability agent
└── Task 4: "Update docs" → assigned to read-only agent
```

**Key insight:** Role-based agents are more reliable than general-purpose ones. Claude Code distinguishes between read-only (Explore, Plan) and full-capability agents. A read-only agent physically cannot break your code.

---

## 4. The "Actions With Care" Framework

**What Claude Code does:**
Every action is classified by reversibility and blast radius:

| | Low blast radius | High blast radius |
|---|---|---|
| **Reversible** | ✅ Do freely | ⚠️ Proceed with note |
| **Irreversible** | ⚠️ Confirm first | 🛑 Always confirm |

**Why it works:**
- Prevents catastrophic mistakes without being annoying
- Users trust the agent more → give it more autonomy over time
- The framework is simple enough for an LLM to follow consistently

**Steal this pattern:**
Put this in your agent's system prompt:

```
Before any action, evaluate:
1. Is this reversible? (editing a file = yes, sending an email = no)
2. Does this affect shared state? (local change = no, git push = yes)
3. Could this destroy data? (read = no, rm -rf = yes)

If any answer raises concern, confirm with the user before proceeding.
Authorization for one instance does NOT authorize all future instances.
```

**Key insight:** "Measure twice, cut once" — Claude Code's exact words. The rule about authorization scope is crucial: approving one `git push` doesn't approve all future pushes.

---

## 5. Static + Dynamic Prompt Splitting

**What Claude Code does:**
The system prompt is split into two halves with an explicit boundary marker:

```
[Static content - same for everyone, cacheable]
__SYSTEM_PROMPT_DYNAMIC_BOUNDARY__
[Dynamic content - user/session specific, not cached]
```

**Why it works:**
- The static portion can be cached globally (prompt caching)
- Dynamic portions (memory, MCP servers, language) change per turn
- Massive cost savings — you only pay for the dynamic portion each turn

**Steal this pattern:**

```typescript
const systemPrompt = [
  // Static (cacheable across all users)
  identityAndRules,
  toolInstructions,
  codeStyleGuidelines,
  safetyBoundaries,
  
  // Boundary
  CACHE_BOUNDARY_MARKER,
  
  // Dynamic (per-user, per-session)
  userMemory,
  environmentInfo,
  activeIntegrations,
  sessionContext,
];
```

**Key insight:** Claude Code's prompt is ~914 lines of TypeScript that assembles the prompt. The static portion is massive and identical across users. With Anthropic's prompt caching, this means most of the prompt is free after the first call.

---

## Quick Reference: What to Build First

If you're building an AI agent, add these in order:

1. **Tool system** (Day 1) — Even 3-4 tools with good prompts beats a raw LLM
2. **Action safety** (Day 1) — Classify actions before executing
3. **Markdown memory** (Week 1) — Start simple, add consolidation later
4. **Prompt caching** (Week 1) — Split static/dynamic, save 50%+ on API costs
5. **Multi-agent** (Month 1) — Only when single-agent hits limits

---

*These patterns are extracted from Claude Code v2.1.88's architecture. They work with any LLM provider.*
