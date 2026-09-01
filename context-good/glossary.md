---
type: glossary
last_validated: 2026-08-15
owner: privacy-operations
---

# Glossary — Nordwind Home systems and terms

| Term | Meaning |
|---|---|
| **Sentinel DLP** | Nordwind's data loss prevention tool. Scans storage, email, endpoints and code repositories. |
| **CustomerHub** | Production CRM. Holds real customer personal data (~6M customers). Any CustomerHub *production* data outside sanctioned systems is a serious incident. |
| **TestForge** | Isolated test-data environment. Generates fully synthetic records. All TestForge-generated records carry IDs prefixed `TST-` and email addresses on the reserved domain `example.test`. |
| **DocPortal** | Internal documentation wiki. Spaces suffixed `-Public` are readable without authentication. |
| **StoreNet** | CMS feeding the public website, including the store finder. Store contact details (switchboard phone, store email) are public business data. |
| **PeopleDesk** | HR system. Salary and performance data must never be readable outside HR and the employee's management line. |
| **SARBox** | System for fulfilling data subject access requests (DSARs). Exporting an individual's personal data to the *verified requester* is its intended function. |
| **Backup vault** | The only sanctioned location for production database backups. Encrypted, access-logged. |
| **Sanctioned storage** | Nordwind-managed systems only. Personal cloud services (Dropbox, personal Gmail, etc.) are not sanctioned for any corporate data. There is no "backup to personal account" exception process. |
| **`${VAULT:...}`** | A reference to a secret stored in the secrets manager. It is a pointer, not a credential. The Vault migration was completed in 2026-03; remaining hardcoded credentials are treated as incidents. |
