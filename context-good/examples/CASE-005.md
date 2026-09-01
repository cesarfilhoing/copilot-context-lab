---
case: CASE-005
label: false_positive
pattern: lookalike-identifiers
detector: national-id-pattern
closed: 2026-02-27
reviewed_by: privacy-operations
---

# CASE-005 — Order references matched as personal numbers

Sentinel flagged hundreds of personal-number matches in the nightly CustomerHub order export.

**Facts:** Every match sat inside `SE-ORD-##########` values in the `order_ref` column. Schema contained only order line data; no identity columns.

**Rationale:** Lookalike-identifiers pattern. Confirmed with the data model owner that order reference digits are sequence numbers. Free-text columns of the same export were spot-checked and clean.
