-- Replace the sample access-code hashes before production.
INSERT OR IGNORE INTO organizations(id,name) VALUES('org-demo','Aurelis Demonstration Tenant');
-- SHA-256("Aurelis-Client-2026") and SHA-256("Aurelis-Operator-2026")
INSERT OR IGNORE INTO access_users(id,organization_id,email,role,access_code_hash,created_at) VALUES
('usr-client','org-demo','client@example.com','client','REPLACE_CLIENT_HASH',datetime('now')),
('usr-operator','org-demo','operator@example.com','operator','REPLACE_OPERATOR_HASH',datetime('now'));
