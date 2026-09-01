# Nordwind Home — DLP triage context base

Curated organizational knowledge for triaging Sentinel DLP alerts. This folder is the agent's source of truth about Nordwind Home.

## How this folder is organized

```
patterns/    one file per known false-positive pattern
examples/    labeled historical cases (ground truth), one file per case
glossary.md  internal systems and terms the model cannot know
```

## How to use it

1. Read the alert.
2. Check `patterns/` for a matching false-positive pattern. A pattern applies only when its **signals** match AND none of its **counterexample** conditions are present.
3. Cross-check against similar labeled cases in `examples/`.
4. If no false-positive pattern applies, treat the alert as a true positive by default: Sentinel's detectors fire on real risk categories.

## Curation rules for this folder

- One pattern per file. Small files, descriptive names.
- Every pattern states its signals, its counterexamples, and links to labeled cases.
- Every file carries frontmatter with `last_validated` and `owner`. Content older than 12 months must be re-validated or removed.
- No real personal data, ever. Historical cases are recorded with roles and case facts, never with names or identifiers of real people.
- Contradictions are resolved before merging, not documented side by side.
