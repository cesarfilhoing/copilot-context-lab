---
case: CASE-010
label: true_positive
pattern: null
detector: sensitive-hr-data-exposure
closed: 2025-11-20
reviewed_by: privacy-operations
---

# CASE-010 — HR data exposed by a permissions change

Sentinel flagged an HR file readable by a broad internal group.

**Facts:** A salary file became visible to a whole department after a well-intentioned folder permission change during budget planning.

**Rationale:** True positive. Salary data must never be readable outside HR and the employee's management line; the *reason* for the permission change does not reduce the exposure. Internal exposure is still exposure. Outcome: permissions reverted within the hour, affected employees informed per internal procedure.
