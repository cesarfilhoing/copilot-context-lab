---
case: CASE-001
label: false_positive
pattern: synthetic-test-data
detector: national-id-pattern
closed: 2026-04-10
reviewed_by: privacy-operations
---

# CASE-001 — National IDs in TestForge export bucket

Sentinel flagged ~2,000 personal-number matches in a CSV in a TestForge bucket.

**Facts:** All record IDs prefixed `TST-`, all emails on `example.test`, file written by the TestForge loader service account into a TestForge-owned bucket.

**Rationale:** All three synthetic-test-data signals present. Confirmed with the TestForge team that the generator produced the batch. No real individuals involved.
