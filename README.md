# Copilot Context Lab

**A hands-on workshop: build an AI agent in VS Code with GitHub Copilot, and learn why the quality of your agent depends on the quality of its context.**

You will build an alert-triage agent for **Nordwind Home**, a fictional European home-furnishing retailer. The agent's job: look at Data Loss Prevention (DLP) alerts and decide whether each one is a **true positive** (a real data protection problem) or a **false positive** (noise).

The twist: you will run the same agent three times, with three different context setups, and count how many alerts it gets right each time. The model never changes. Only the context does.

> Everything in this repository is fictional. Company, systems, people, identifiers and alerts are invented for training purposes. No real personal data is used anywhere, and none should ever be added.

## Prerequisites

- VS Code with the GitHub Copilot extension, signed in
- This repository cloned and opened as your workspace folder
- 60–90 minutes

## Repository map

```
alerts/            12 unclassified DLP alerts — this is the test set
context-bad/       the WRONG way to build a context base (one giant dump)
context-good/      the RIGHT way (curated patterns, labeled examples, glossary)
docs/              the theory: how to architect context for generative AI
templates/         a template to build patterns for YOUR own area
facilitator/       answer key and run guide — DO NOT open until the end
.github/agents/    three pre-built agents (baseline / bad / good)
```

## The three agents

Open Copilot Chat in VS Code and pick an agent from the agent dropdown:

| Mode | Context it uses | What it demonstrates |
|---|---|---|
| `triager-baseline` | none | what the model can do on general knowledge alone |
| `triager-bad` | `context-bad/` | why "just dump everything in a file" fails |
| `triager-good` | `context-good/` | what curated, structured context buys you |

If the custom agents don't appear, reload the VS Code window (`Developer: Reload Window`). The agents live in `.github/agents/`.

## Workshop flow

### Step 1 — Baseline (no context)

Select the `triager-baseline` agent and ask:

```
Triage all alerts in the alerts/ folder. For each one, output a table row:
alert ID | TRUE POSITIVE or FALSE POSITIVE | confidence | one-line rationale.
```

Write down its verdicts. Notice how confident it sounds.

### Step 2 — The wrong way

Select the `triager-bad` agent and ask the exact same question. The agent now "has context": a 200-line knowledge dump full of pasted emails, contradictions, stale rules and noise. Watch what happens to its answers — and notice that it also just ingested a file containing (fictional) employee personal data that should never have been in a context store.

### Step 3 — The right way

Select the `triager-good` agent and ask the same question again. Same model, same alerts, same prompt. The only difference is that the context is curated: one file per false-positive pattern, labeled historical examples with rationale, and a glossary of internal systems.

### Step 4 — Score it

Open `facilitator/answer-key.md` and count correct verdicts for each run. Typical result: the baseline misses most false positives (everything looks like a violation when you don't know the org), the bad context barely helps or makes things worse, the good context gets most or all of them right.

### Step 5 — Build your own

The point of this workshop is not DLP. It is the method. Take `templates/pattern-template.md` and write 2–3 false-positive patterns from **your own area** (support tickets, security alerts, quality checks, invoice mismatches — anything where humans triage noise). Drop them into a folder, point an agent at them, and test.

## What you should take away

1. **The model knows the world, not your organization.** Accuracy on your alerts comes from your context, not from a bigger model.
2. **More context is not better context.** A dump of everything performs like a dump of everything.
3. **Curate manually before you automate.** If you cannot write down why an alert is a false positive, you cannot automate that decision either. Manual curation produces the ground truth; automation without it only scales noise.
4. **A context store is a data store.** Data minimisation applies. No real personal data in your knowledge base — the bad example shows how easily it creeps in.

Read `docs/context-architecture.md` for the full write-up: file formats, folder organization, anti-patterns, and when to automate.

## Facilitators

See `facilitator/run-guide.md` for timing, talking points and expected outcomes.
