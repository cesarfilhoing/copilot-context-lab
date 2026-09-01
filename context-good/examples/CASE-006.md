---
case: CASE-006
label: false_positive
pattern: placeholder-secrets
detector: credentials-in-code
closed: 2026-07-09
reviewed_by: security-engineering
---

# CASE-006 — Vault reference flagged as hardcoded password

Sentinel flagged `password:` with an assigned value in a committed service configuration.

**Facts:** The value was `${VAULT:secret/orders/db-password}`, a secrets-manager reference. No literal fallback present.

**Rationale:** Placeholder-secrets pattern: a Vault reference is a pointer, not a credential. Post-migration (March 2026), references are the norm; the file was checked for literal values and had none.
