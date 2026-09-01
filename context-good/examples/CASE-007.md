---
case: CASE-007
label: false_positive
pattern: business-contact-data
detector: phone-number-bulk
closed: 2026-01-30
reviewed_by: privacy-operations
---

# CASE-007 — Store switchboard numbers on the public website

Sentinel flagged ~200 phone numbers in the store-finder dataset published by StoreNet.

**Facts:** All numbers mapped to store switchboards; all emails were store mailboxes (`city.store@nordwindhome.example`). A 10% sample was verified against the store directory.

**Rationale:** Business-contact-data pattern: published business contact information. The sampling step exists because of the 2021 incident where personal mobiles slipped into this dataset — the counterexample check, not the pattern name, closes the case.
