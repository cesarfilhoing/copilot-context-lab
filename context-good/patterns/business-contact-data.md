---
pattern: business-contact-data
verdict_when_matched: false_positive
detectors: [phone-number-bulk]
last_validated: 2026-08-15
owner: privacy-operations
related_cases: [CASE-007]
---

# Public business contact data

Store switchboard numbers and store mailbox addresses are business contact data that Nordwind publishes on purpose. Bulk detections of these on public-website datasets are expected.

## Signals

- The matched numbers/emails belong to *stores or functions*, not individuals (pattern: store name + switchboard number + store mailbox like `city.store@nordwindhome.example`), **and**
- The location is a public-website data source (StoreNet CMS datasets, store-finder pages).

## Counterexamples — when this is NOT a false positive

- Personal mobile numbers or personal mailboxes of employees in the same dataset. This has happened: in 2021 store managers' personal mobiles were accidentally included in the store-finder dataset (remediated; a schema check now blocks fields named outside the approved list — but the check validates field *names*, not contents).
- Customer phone numbers appearing in any public dataset.

Spot-check a sample: numbers must map to store switchboards, not to named individuals.

## Historical basis

See CASE-007 (store-finder dataset).
