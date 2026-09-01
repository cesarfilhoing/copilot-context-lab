# How to architect context for a generative AI agent

This is the theory behind the workshop. It is deliberately tool-agnostic: everything here applies whether your agent runs in GitHub Copilot, a RAG pipeline, or a future platform.

## 1. Why context matters

A large language model knows the world. It does not know your organization: your systems, your naming conventions, your policies, your history of what turned out to be noise. Every wrong verdict in the baseline run of this workshop comes from that gap, not from model weakness.

The corollary: **accuracy on your problems is mostly a context problem, not a model problem.** Upgrading the model does not teach it that `TST-` means test data at your company. Only your context does.

## 2. Choosing a file format

| Format | Verdict | Why |
|---|---|---|
| **Markdown + YAML frontmatter** | Default choice | Readable by humans and models, diffable and reviewable in git, frontmatter gives you structured metadata (owner, dates, labels) without sacrificing prose. |
| **JSON / CSV** | For record-like data | Labeled example sets, lookup tables. Pair with a Markdown file explaining the schema — a model guesses schemas badly. |
| **PDF, DOCX, PPTX** | Avoid | Extraction is lossy, diffs are impossible, nobody reviews changes. If knowledge lives in a deck, extract it into Markdown. |
| **Screenshots** | Never | Invisible to text search, ages instantly, unreviewable. |
| **Chat/email pastes** | Never as-is | Raw discussion is not knowledge. Distill the conclusion, date it, discard the thread. |

Rule of thumb: **if a human reviewer cannot diff it in a pull request, it does not belong in your context base.**

## 3. Organizing the files

- **One concern per file.** One false-positive pattern per file, one case per file. Small files let the model (and retrieval, later) load only what is relevant, and let humans review changes in isolation.
- **Name files by content**, not by date or author: `lookalike-identifiers.md`, not `notes-marcus-v2.md`.
- **Separate types of knowledge**: rules (`patterns/`), evidence (`examples/`), vocabulary (`glossary.md`). Rules say *what to decide*; examples show *decisions actually made*; the glossary defines terms the model cannot know.
- **Frontmatter on everything**: `owner`, `last_validated`, `label`, `pattern`. Metadata is what lets you audit and expire knowledge instead of hoarding it.
- **A README as the map.** The agent's first read should tell it what exists and how to use it.

## 4. What makes context *good* — the five properties

1. **Labeled.** Every example carries its verdict. Unlabeled examples teach nothing.
2. **Reasoned.** Every rule and every case states *why*. The rationale is what generalizes; the verdict alone does not.
3. **Bounded.** Every pattern states its counterexamples — the conditions under which it does NOT apply. A rule without boundaries becomes a blanket excuse (see: the agent closing a real incident because "test data exists").
4. **Current.** Everything is dated and owned. Stale knowledge is worse than no knowledge, because it arrives with confidence attached.
5. **Consistent.** Contradictions are resolved before merging, not recorded side by side. A model given two contradictory rules will pick one — you don't control which.

Compare `context-bad/knowledge-dump.md` against this list. It fails all five.

## 5. Anti-patterns (what the bad example demonstrates)

- **The dump.** Pasting emails, chat threads and meeting notes "so the AI has everything". Volume without curation adds noise, and noise costs accuracy.
- **Contradictions preserved as history.** "Marcus thinks X but Beatriz remembers Y" forces the model to guess.
- **Undated, unowned facts.** "Pretty sure this was superseded" is a decision nobody made.
- **Hedged non-rules.** "Usually fine", "probably", "check each one" — a model amplifies your ambiguity.
- **Personal data in the knowledge base.** The dump contains employee names, national IDs and salaries pasted from an incident tracker. The moment that file feeds an AI agent, you have created a new processing activity with real people's data — unnoticed, unminimized, unretained. **A context store is a data store: data minimisation, purpose limitation and retention apply to it like to any other system.** Record cases with roles and facts, never identities.

## 6. Manual first, automate later

It is tempting to skip curation: point a pipeline at your wiki, your tickets, your chat history, and "let the AI figure it out". This workshop shows what that produces — the bad run *is* that pipeline's output, just smaller.

Curate manually first, because:

1. **Writing forces criteria.** If you cannot write down why an alert is a false positive, you do not have a rule — you have a habit. And you cannot automate a decision you cannot articulate.
2. **Manual curation produces ground truth.** Your labeled examples become the test set for every future iteration: change the context, re-run, count. Without ground truth you cannot even measure whether automation helped.
3. **Automation scales whatever exists.** Automating ingestion of an uncurated source scales its noise, its contradictions and its embedded personal data.

The sequence that works: **curate by hand → stabilize the criteria → automate ingestion into the structure you designed → keep humans reviewing what enters.** Automate the *pipeline*, never the *judgment*, until the judgment is written down and tested.

## 7. From folder to production

This workshop uses a folder of Markdown read by Copilot. The same architecture carries over when you grow:

- The `patterns/` + `examples/` + `glossary` split maps directly onto RAG chunking: small, focused, self-contained files retrieve well.
- Frontmatter becomes retrieval metadata and filters.
- The answer-key discipline becomes your evaluation set.
- The curation rules become your ingestion review gate.

Design the context first. The plumbing is the easy part.
