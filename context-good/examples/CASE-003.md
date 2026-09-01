---
case: CASE-003
label: false_positive
pattern: documentation-samples
detector: payment-card-number
closed: 2026-03-18
reviewed_by: security-engineering
---

# CASE-003 — Test card number in an integration guide

Sentinel flagged a Luhn-valid card number in a DocPortal engineering page about payment testing.

**Facts:** The number was `4111 1111 1111 1111`, the industry-standard Visa test PAN, presented as staging instructions.

**Rationale:** Documentation-samples pattern: industry test value, on a documentation page, published intentionally. Test PANs pass Luhn checks by design; Luhn validity alone proves nothing.
