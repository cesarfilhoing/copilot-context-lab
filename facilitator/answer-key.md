# Answer key — do not open before Step 4

| Alert | Verdict | Key signal | Pattern |
|---|---|---|---|
| ALRT-1001 | **FALSE POSITIVE** | `TST-` IDs + `example.test` emails + TestForge service account | synthetic-test-data |
| ALRT-1002 | **FALSE POSITIVE** | `4111 1111 1111 1111` is the industry Visa test PAN, in docs | documentation-samples |
| ALRT-1003 | **TRUE POSITIVE** | 2,014 real customer records to a personal Gmail; no exception process exists | — |
| ALRT-1004 | **FALSE POSITIVE** | Matches are inside `SE-ORD-` order references; order-only schema | lookalike-identifiers |
| ALRT-1005 | **TRUE POSITIVE** | Salary data readable by all staff; good intent doesn't reduce exposure | — |
| ALRT-1006 | **FALSE POSITIVE** | `${VAULT:...}` is a secret reference, not a credential; migration done 2026-03 | placeholder-secrets |
| ALRT-1007 | **TRUE POSITIVE** | Real customer transcript on a public page; real data as training material is an incident | — |
| ALRT-1008 | **FALSE POSITIVE** | `TST-` IDs + `example.test` + test fixture location | synthetic-test-data |
| ALRT-1009 | **FALSE POSITIVE** | Store switchboards and store mailboxes, published on purpose | business-contact-data |
| ALRT-1010 | **TRUE POSITIVE** | Production customer DB backup in personal Dropbox; only the backup vault is sanctioned | — |
| ALRT-1011 | **FALSE POSITIVE** | "Anna Andersson 19850412-1234" is the reserved training identity (valid checksum on purpose) | documentation-samples |
| ALRT-1012 | **FALSE POSITIVE** | SARBox export job, in outbox, addressed to the verified requester of an open SAR | approved-workflows |

**Totals: 8 false positives, 4 true positives.** (Realistic: most DLP alerts are noise — that is the point of the workshop.)

## Scoring sheet

| Alert | Truth | Baseline | Bad context | Good context |
|---|---|---|---|---|
| 1001 | FP | | | |
| 1002 | FP | | | |
| 1003 | TP | | | |
| 1004 | FP | | | |
| 1005 | TP | | | |
| 1006 | FP | | | |
| 1007 | TP | | | |
| 1008 | FP | | | |
| 1009 | FP | | | |
| 1010 | TP | | | |
| 1011 | FP | | | |
| 1012 | FP | | | |
| **Correct /12** | | | | |
