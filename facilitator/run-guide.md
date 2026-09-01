# Facilitator run guide

Target: 60–90 minutes, groups of 2–4, each group with at least one laptop running VS Code + Copilot with this repo open.

## Timing

| Block | Time | What happens |
|---|---|---|
| Intro | 10 min | The premise: same model, three context setups, count the score. Introduce Nordwind Home and the triage task. |
| Run 1 — baseline | 10 min | `triager-baseline` mode, the triage prompt from the README. Groups record verdicts. |
| Run 2 — bad context | 10 min | `triager-bad`. Before running, have groups *open* `knowledge-dump.md` and skim it for 2 minutes. Ask: "would YOU triage well from this?" |
| Run 3 — good context | 10 min | `triager-good`. Have groups open one pattern file first and notice the structure: signals, counterexamples, cases. |
| Scoring + debrief | 15 min | Open the answer key, fill the scoring sheet, discuss (talking points below). |
| Build your own | 20–30 min | Each group writes 2–3 patterns for their own area using the template, points a custom agent at their folder, tests with 2–3 invented alerts. |

## Expected outcomes (calibrate, don't promise)

- **Baseline**: typically 4–7 /12. Models flag most things as violations (everything *looks* sensitive without org knowledge) — expect the four TPs right but most FPs wrong. Occasionally it guesses a test PAN or `example.test` correctly; that's fine, general knowledge covers a few industry conventions. The org-specific ones (1001 prefix rule, 1004 order refs, 1011 reserved identity, 1012 SARBox) it cannot know.
- **Bad context**: similar score or worse, but *differently* wrong, and with misplaced confidence. Watch for it citing the 2019 "you can't trust the prefix" anecdote to escalate 1001, the obsolete 2019 "escalate everything" procedure, or the "IT knows about gmail backups" rumor to excuse 1003. If it excuses 1003, you have the best teaching moment of the day: bad context can *manufacture* false negatives.
- **Good context**: typically 11–12 /12, citing pattern files by name.

Results vary between runs — that is itself worth naming (non-determinism is another reason you need a ground-truth test set, not vibes).

## Debrief talking points

1. **Same model, three scores.** Nobody fine-tuned anything. The delta is pure context quality.
2. **The dump is not a strawman.** It is what "just point the AI at our wiki/tickets/chat" produces. Automating ingestion without curation builds `knowledge-dump.md` at scale.
3. **Counterexamples carried the good run.** 1003 vs the "backup" excuse; CASE-008 vs "it's training material". Rules without boundaries become blanket excuses.
4. **The privacy trap.** Ask who noticed that `knowledge-dump.md` contains employee names, national IDs and salaries — and that every bad-context run just processed them through an AI tool. A context store is a data store: minimisation applies. (The good context records the same incidents with roles only.)
5. **Manual first.** The good context is ~10 small files that took a human afternoon. That afternoon is what makes any future automation measurable and safe.

## Practical notes

- If custom agents don't show in the Copilot agent dropdown: `Developer: Reload Window`, and check the agents are in `.github/agents/`.
- If a model answers from memory of a previous run, start a new chat per run.
- Keep groups from opening `facilitator/` early; the custom agents are instructed to refuse it, but humans are curious.
- If short on time, cut the build-your-own block to writing one pattern on paper with the template and sharing it aloud.
