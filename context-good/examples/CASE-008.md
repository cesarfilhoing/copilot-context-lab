---
case: CASE-008
label: true_positive
pattern: null
detector: customer-data-public-exposure
closed: 2026-05-14
reviewed_by: privacy-operations
---

# CASE-008 — Real customer data used as training material

Sentinel flagged customer personal data on an internal wiki page used for support training.

**Facts:** A support lead pasted a *real* customer interaction (name, address, complaint) as a "good example". Intent was educational; the data was still real.

**Rationale:** True positive. Documentation-samples applies only to values on the reserved sample list. Real data used as sample data is an incident: the customer never agreed to become training material, and page visibility multiplied the exposure. Outcome: page redacted, incident logged, anonymized-example guideline issued.
