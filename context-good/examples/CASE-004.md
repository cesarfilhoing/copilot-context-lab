---
case: CASE-004
label: false_positive
pattern: documentation-samples
detector: national-id-pattern
closed: 2026-06-02
reviewed_by: privacy-operations
---

# CASE-004 — Reserved training identity in onboarding material

Sentinel flagged a personal identity number in a GDPR training deck.

**Facts:** The identity was "Anna Andersson, 19850412-1234", the reserved sample identity maintained by the privacy training team. The checksum is deliberately valid so detectors fire during live demos.

**Rationale:** Documentation-samples pattern: known sample value on the maintained list, in training material. Verified against the training team's register of reserved identities; allocated to no real person.
