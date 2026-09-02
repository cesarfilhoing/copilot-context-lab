# Guardrails for AI agents

Rules alone are not guardrails. A guardrail is only as strong as its enforcement, and most "AI guardrails" people write are polite requests to a language model. This document gives you a framework to tell the difference, and a five-layer model to design real ones.

## The enforcement ladder

Every guardrail sits on one of three rungs. Always know which rung yours is on.

| Level | What it is | Example in this repo | Can the agent bypass it? |
|---|---|---|---|
| **1. Instructed** | A rule written in the prompt or agent instructions | "Never open `facilitator/`" in the chat modes | **Yes.** A determined user, a cleverly phrased request, or plain model error walks through it. Instructions shape behavior; they do not bound it. |
| **2. Configured** | A capability the agent simply does not have | The `tools:` list in each chat mode grants read/search only, no edit, no terminal, no web | Only by a tooling bug. The agent cannot act outside its granted tools, no matter what the prompt says. |
| **3. Enforced** | A control outside the agent entirely | Repo permissions, branch protection, DLP scanning the repo itself, network egress rules | No. It holds even if the model is fully compromised or replaced. |

**Design rule: state it at level 1, remove the capability at level 2, verify at level 3.** If a guardrail matters and it exists only at level 1, you do not have a guardrail — you have a hope. Try it yourself: ask a triager mode nicely, then insistently, to open the answer key. That is the demo.

## The five layers

### Layer 1 — Data (what goes in)

The agent's context, prompts and test data are a processing activity like any other.

- **No real personal data.** Synthetic or fictional only, marked as such (this repo: `TST-` prefixes, `example.test` domain, a reserved training identity). Minimisation, purpose limitation and retention apply to a context store exactly as to a database.
- **No secrets, no confidential data.** Not in context files, not in prompts, not in commit history. History counts: a secret committed and deleted is still exposed.
- **Provenance.** Every context file has an owner and a validation date, so you can answer "who put this here and is it still true".
- Enforcement: pre-commit secret scanning, DLP coverage on repositories, curation review before anything enters the context base (level 3), plus the curation rules in `context-good/README.md` (level 1).

### Layer 2 — Access (what it can reach)

- **Least-privilege context.** Each agent reads only the folders its task needs. The three chat modes here are mutually excluded from each other's folders and from `facilitator/`.
- **Least-privilege tools.** Grant capabilities, don't subtract them: start from nothing and add read/search. No edit, no terminal, no network for a triage task.
- **Sanctioned platforms only.** Corporate Copilot licence, corporate repos. Personal AI accounts with company data are Layer 1's problem wearing a different hat.
- Enforcement: `tools:` frontmatter (level 2), repo and workspace permissions (level 3).

### Layer 3 — Behavior (how it reasons)

- **Grounding required.** Every verdict must cite the pattern or source applied. No source, no verdict. Ungrounded confidence is the failure signature of the bad-context run.
- **Bounded rules.** Every pattern carries counterexamples: the conditions under which it does NOT apply. Rules without boundaries become blanket excuses (watch the bad run wave through a real exfiltration because "backups happen").
- **Defined output.** Fixed format, fixed verdict set (TRUE POSITIVE / FALSE POSITIVE, confidence, rationale). A constrained output is easier to validate, log and score.
- **Scope refusal.** Out-of-scope requests get declined, not improvised.
- Enforcement: mostly level 1 (instructions), hardened by level 2 (a read-only agent can only ever *say* things) and by Layer 4.

### Layer 4 — Output (what happens with the answer)

- **AI drafts, humans decide.** The agent proposes; a named person disposes and owns the outcome. The agent closes no alerts, sends no emails, changes no permissions.
- **No autonomous actions.** If an agent must act, each action class is explicitly granted (level 2) and the irreversible ones require human confirmation.
- **Measured before trusted.** Score the agent against a ground-truth set (the answer key) before its output influences real decisions, and re-score after every context change. Trust is a number, not a feeling.
- Enforcement: withholding action tools (level 2), workflow design where the human step is structurally required, not optional (level 3).

### Layer 5 — Oversight (how you keep it honest)

- **Version everything.** Context in git means every knowledge change has an author, a diff and a rollback. Context changes are reviewed like code changes.
- **Log the runs.** Which agent, which context version, which verdicts. You cannot investigate what you did not record.
- **Expire knowledge.** `last_validated` older than 12 months means re-validate or remove. Stale context fails silently, with confidence.
- **An incident path.** Wrong verdict acted on, personal data found in context, secret in history: people must know where to report it and who owns the response. Same muscle as any security incident.
- Enforcement: git + review gates (level 3), scheduled re-validation (level 3), logging in the platform (level 3).

## The one-slide version

> 1. **Data:** synthetic only; no personal data, no secrets. A context store is a data store.
> 2. **Access:** least privilege for folders and tools; sanctioned platforms only.
> 3. **Behavior:** grounded, bounded, structured. No source, no verdict.
> 4. **Output:** AI drafts, humans decide. Measured against ground truth before trusted.
> 5. **Oversight:** versioned, logged, expiring, with an incident path.
>
> And under all five: **instructions shape, capabilities bound, external controls enforce.** Know which one each of your guardrails is.
