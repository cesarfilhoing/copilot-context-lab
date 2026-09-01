---
pattern: placeholder-secrets
verdict_when_matched: false_positive
detectors: [credentials-in-code]
last_validated: 2026-08-15
owner: security-engineering
related_cases: [CASE-006]
---

# Secret references and placeholders in configuration

Nordwind configuration files reference secrets through the secrets manager. A reference is a pointer, not a credential: leaking it exposes nothing.

## Signals

- The matched "secret" value is a `${VAULT:...}` reference, **or** an obvious template placeholder (`<your-password-here>`, `CHANGEME`, empty string).

## Counterexamples — when this is NOT a false positive

- Any literal value that is not a reference or placeholder — even if it "looks like a test password". Treat literal credentials in committed code as true positives.
- Vault references committed *alongside* a literal fallback value (e.g. `password: ${VAULT:...} # fallback: hunter2`). The fallback is a real credential.

## Status note

The Vault migration completed in March 2026. Since then, remaining literal credentials in config are treated as incidents, not as known debt. (Pre-2026 guidance saying "some services still have real passwords in config" is obsolete.)

## Historical basis

See CASE-006 (checkout-service config).
