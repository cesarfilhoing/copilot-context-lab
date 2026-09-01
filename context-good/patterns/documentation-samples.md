---
pattern: documentation-samples
verdict_when_matched: false_positive
detectors: [payment-card-number, national-id-pattern]
last_validated: 2026-08-15
owner: privacy-operations
related_cases: [CASE-003, CASE-004]
---

# Sample data in documentation and training material

Engineering docs and training decks deliberately contain example identifiers so people can learn or test. These are published, intentional, and refer to no real person or account.

## Signals

- The match is on a page/deck whose purpose is documentation or training (DocPortal engineering spaces, NW-Academy materials), **and** the matched value is one of the known sample identities below, or an industry-standard test value.

## Known sample values at Nordwind

- Payment cards: the industry test PANs `4111 1111 1111 1111` (Visa) and `5555 5555 5555 4444` (Mastercard). These pass Luhn checks by design and charge nothing.
- The reserved training identity **"Anna Andersson, 19850412-1234, anna.andersson@example.test"** used in privacy training material. The number has a valid checksum on purpose (so detectors fire during demos) but is reserved by the training team and allocated to no real person.

## Counterexamples — when this is NOT a false positive

- A *real-looking* identity in documentation that is not on the sample list above (e.g. a pasted real customer record used "as an example"). Real data used as sample data is a true positive — see CASE-008, where a real support transcript was pasted into training material.
- Sample values found in *production data flows* rather than documentation.

## Historical basis

See CASE-003 (test PAN in integration guide) and CASE-004 (training deck identity).
