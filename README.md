# AURELIS AAI — AI Change & Release Assurance

AURELIS AAI is positioned broadly as AI Assurance Infrastructure, with the current product wedge focused on **AI Change & Release Assurance**.

## Current workflow

`CHANGE → IDENTITY → IMPACT → POLICY → EVALUATION → CONTROL → EVIDENCE`

Release outcomes: **ALLOW / CONSTRAIN / ESCALATE / DENY**.

The public site uses synthetic data for its demonstration. It does not claim that a real customer system has been assessed.

## Deploy

The Pages configuration explicitly declares:

```toml
pages_build_output_dir = "public"
```

Deploy with:

```powershell
npx.cmd wrangler pages deploy public --project-name aurelis-aai --commit-dirty=true
```

If you use the D1 binding in `wrangler.toml`, replace `REPLACE_WITH_D1_DATABASE_ID` with the UUID of the **Aurelis AAI** D1 database. Do not substitute the old Aurelis ACI database ID.

## Public site

- `index.html` — public assurance/release site
- `access.html` — access request surface
- `client.html` — client surface
- `operator.html` — operator surface
- `aurelis-mark.svg` — circular cool-blue wave mark

The logo is an original abstract wave mark inside a circle; it is not a copy of Hokusai's *The Great Wave*.
