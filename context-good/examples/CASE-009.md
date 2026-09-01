---
case: CASE-009
label: true_positive
pattern: null
detector: bulk-data-egress-endpoint
closed: 2026-04-03
reviewed_by: security-engineering
---

# CASE-009 — Corporate data copied to personal cloud storage

The endpoint agent flagged a large export from a corporate device to a personal cloud sync folder.

**Facts:** An employee copied a CustomerHub extract to a personal Google Drive "as a backup before annual leave".

**Rationale:** True positive. Personal cloud services are not sanctioned storage for any corporate data, regardless of intent. Informal "everyone does it before laptop swaps" practice is not an approved workflow; no such exception process exists. Outcome: file removed, access review completed, reminder issued to the team.
