---
pattern: synthetic-test-data
verdict_when_matched: false_positive
detectors: [national-id-pattern, bulk-personal-data]
last_validated: 2026-08-15
owner: privacy-operations
related_cases: [CASE-001, CASE-002]
---

# Synthetic test data

TestForge generates fully synthetic customer records for testing. They look exactly like real personal data to a DLP detector, but no real person is behind them.

## Signals (all must hold)

- Record IDs carry the `TST-` prefix, **and**
- Email addresses use the reserved domain `example.test`, **and**
- The data lives in a test system (TestForge buckets, repository fixture/test folders) or was written by a TestForge service account.

## Counterexamples — when this is NOT a false positive

- Records mix `TST-` IDs with non-`TST-` IDs, or mix `example.test` with real email domains: possible production data contamination. Escalate.
- `TST-` data found *inside CustomerHub production*: test data does not belong there; something is writing across environments. Escalate.
- Note: the 2019 migration incident in which production records received `TST-` prefixes was fully remediated in 2020, and the `example.test` domain rule was introduced precisely so that the prefix alone is never the deciding signal. That is why this pattern requires all three signals together.

## Historical basis

See CASE-001 (TestForge bucket export) and CASE-002 (repository seed fixtures).
