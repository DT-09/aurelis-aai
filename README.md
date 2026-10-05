# AURELIS AAI

AI Assurance Infrastructure: a change-centric assurance engine that maps AI-system changes to impacted controls, targeted validations, findings, remediation and release decisions.

## Deployment model
- Cloudflare Pages for the public/client/operator web application.
- Cloudflare Pages Functions for API routes.
- Cloudflare D1 for tenants, entitlements, credentials, systems, assessments, audit logs and prospect contacts.
- Client engine endpoints require an authenticated tenant credential and an active `change-assurance` entitlement.
- Public demo is explicitly a controlled demonstration; it does not test visitor infrastructure.

## Setup
1. Create a Pages project named `aurelis-aai`.
2. Create a D1 database named `aurelis-aai` and put its ID into `wrangler.toml`.
3. Apply `migrations/0001_init.sql` to D1.
4. Configure secrets: `AURELIS_OPERATOR_SECRET` and `AURELIS_SESSION_SECRET`.
5. Deploy the repository as a Pages project.

The repository intentionally does not contain live credentials, payment secrets, customer credentials, or invented customer data.
