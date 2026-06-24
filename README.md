# idp-demo — a minimal Internal Developer Platform

A small, honest reference implementation of the ideas in *Platform Engineering with Backstage*: a software catalog, one real **golden path** (a service template + skeleton), and the security/FinOps guardrails baked in. Built to demonstrate platform-engineering thinking, not to be production-complete.

> **Why this repo exists:** the best signal you can send for a platform role isn't a certification — it's *"I built an IDP with a working golden path, and here's what I learned about why they fail."* This repo is that artifact. See [`docs/WRITEUP.md`](docs/WRITEUP.md) for the story.

## What's here

```
idp-demo/
├── catalog/                 # the software catalog (source of truth)
│   ├── org.yaml             #   teams & users (ownership)
│   └── catalog-info.yaml    #   demo system + components + API + resource
├── templates/
│   └── backend-service/     # the golden path
│       ├── template.yaml    #   the "Create new service" form + steps
│       └── skeleton/        #   what every new service gets, by default
├── policies/                # policy-as-code guardrails
│   ├── require-nonroot.yaml #   Kyverno: pods must run as non-root
│   └── no-public-s3.rego    #   OPA/Conftest: block public buckets in IaC
├── app-config.snippet.yaml  # how Backstage discovers all of the above
└── docs/WRITEUP.md          # the portfolio narrative
```

## The golden path in one sentence

A developer opens Backstage, clicks **Create → New Backend Service**, answers three questions, and 60 seconds later has a new repo with CI/CD, a hardened Dockerfile, Kubernetes manifests with probes + resource limits, OpenTelemetry pre-wired, least-privilege defaults, cost tags, TechDocs, and an auto-registered catalog entry with an owner.

Everything good is the **default**. That's the whole point.

## Run it (with a Backstage app)

This repo holds the *platform content*, not a Backstage app itself. To see it live:

```bash
# 1. scaffold a Backstage app (one time)
npx @backstage/create-app@latest

# 2. point its app-config.yaml at this repo's catalog & template
#    (copy from app-config.snippet.yaml)

# 3. run it
yarn dev    # portal at http://localhost:3000
```

Then: **Create** shows the *New Backend Service* template; **Catalog** shows the demo services with owners and dependencies.

## What this demonstrates

- **Catalog + ownership** — every component has an accountable team owner, discovered automatically.
- **Golden path** — a real scaffolder template whose skeleton encodes org standards.
- **Secure by default** — non-root containers, scanning in CI, policy-as-code at admission.
- **FinOps by default** — mandatory cost tags stamped on every resource.
- **Product thinking** — see the WRITEUP for the failure modes this design avoids.

## License

MIT — use it, fork it, learn from it.
