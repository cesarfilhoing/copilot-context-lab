---
pattern: lookalike-identifiers
verdict_when_matched: false_positive
detectors: [national-id-pattern]
last_validated: 2026-08-15
owner: privacy-operations
related_cases: [CASE-005]
---

# Business identifiers that look like national IDs

Several Nordwind identifier formats embed 10-digit sequences that match the Swedish personal identity number regex.

## Known lookalike formats

- Order references: `SE-ORD-` followed by 10 digits (e.g. `SE-ORD-8402159933`).
- Legacy article batch codes: `NW` + 10 digits (rare, phased out 2024).

## Signals

- The match is inside a value with one of the prefixes above, **and**
- The match comes from a structured export whose schema is order/article data (columns like `order_ref`, `article_no`, `qty`, `store_id`), with no identity columns (name, address, email) alongside.

## Counterexamples — when this is NOT a false positive

- 10-digit matches in *free-text* or identity-bearing columns of the same export: real personal numbers do occasionally end up in wrong fields. The prefix rule applies only to values carrying the prefix.
- Exports that join order data with customer identity data: assess the identity columns on their own merits.

## Historical basis

See CASE-005 (nightly order export). Validated with the CustomerHub data model owner: `order_ref` digits are sequence numbers, not derived from any personal identifier.
