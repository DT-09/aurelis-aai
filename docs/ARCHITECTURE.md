# AURELIS AAI 2.0

AURELIS is an AI change-assurance engine exposed through a public explanatory site, a restricted client plane, and an operator plane.

## Assurance loop
1. Register system state.
2. Establish baseline.
3. Submit proposed change.
4. Compute structured diff.
5. Map changed surfaces to controls.
6. Select targeted validations and historical regressions.
7. Execute deterministic validations.
8. Record findings and remediation.
9. Retest the remediated state.
10. Produce APPROVED/BLOCKED decision and integrity hash.

The public demo is a controlled demonstration of the same decision logic. It is not a claim that AURELIS is testing the visitor's infrastructure.

## Access
Client APIs require an active credential and active `change-assurance` entitlement. Operator APIs require `X-AURELIS-OPERATOR-KEY` supplied as a Cloudflare secret. Credentials are hashed at rest and can be revoked.
