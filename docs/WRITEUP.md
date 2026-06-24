# I built a tiny Internal Developer Platform to understand why most of them fail

> The portfolio narrative for `idp-demo`. Adapt the voice to your own and post it on your blog / LinkedIn / Medium. A repo plus this story is a stronger platform-engineering signal than any certification.

Platform engineering is the fastest-growing discipline in infrastructure right now — Gartner expects 80% of large software orgs to have platform teams by 2026. But there's a strange gap: most teams that *announce* a platform never ship one their developers actually use. They burn 6–18 months, launch something impressive, and watch internal adoption stall around 10%.

I wanted to understand that failure mode from the inside, so I built a minimal Internal Developer Platform and paid attention to where the value actually comes from. Here's what I learned.

## What I built

Not a Backstage app from scratch — the *platform content* that makes Backstage useful:

- a **software catalog** with real ownership (every service maps to an accountable team),
- one **golden path**: a "New Backend Service" template whose skeleton bakes in CI/CD, a hardened non-root Dockerfile, Kubernetes manifests with probes and resource limits, OpenTelemetry, cost-allocation tags, and TechDocs,
- **policy-as-code guardrails** (Kyverno at admission, OPA/Conftest in CI) so the secure, cost-tagged choice is the *only* choice.

The whole thing is in this repo. It's deliberately small.

## Lesson 1 — The catalog is worth it before anything else

Before templates, before plugins, just answering *"what services exist and who owns each one?"* removed a class of recurring time-waste. A catalog entry without a real owner is worse than none — it creates false confidence — so I enforced `spec.owner` on everything and used auto-discovery so it can't rot.

## Lesson 2 — The golden path is where the "wow" lives

The first time I generated a fully production-ready service in under a minute — instead of copying boilerplate and forgetting half the setup — the value clicked. Every standard I baked into the skeleton (scanning, limits, observability, tags) now ships with *every* new service automatically, instead of living on a checklist people skip. That's compounding leverage, and it's the moment a platform earns trust.

## Lesson 3 — Why they fail is mostly not technical

Installing Backstage is easy. The failure modes are organizational:

1. **Built as a tech project, not a product.** Teams build for a year without talking to a developer, then ship something nobody asked for.
2. **No adoption strategy.** "If we build it they'll come" gets you 10% adoption. The golden path has to be *obviously* easier than the status quo.
3. **Maintenance burnout.** Self-hosted Backstage plus plugin sprawl drowns small teams before they deliver features.
4. **Mandates instead of magnetism.** Forcing teams on breeds workarounds. You win on developer experience, not policy.
5. **No value metric.** Without a number, funding evaporates.

The antidote to all five is the same: treat developers as customers, ship the smallest useful path early, measure adoption, and iterate.

## Lesson 4 — Platform engineering is how FinOps and security actually scale

The cleanest insight: cost discipline and security don't scale as quarterly cleanups — they scale when good defaults are the *only* path. My template stamps `team` and `cost-center` on every resource (you can't allocate what you can't attribute) and ships non-root containers that a Kyverno policy enforces at admission. Finance and security set the goals; the platform makes the compliant choice the default choice.

## How I'd measure it for real

Adoption rate, time-to-first-deploy for a new service, developer satisfaction, support-ticket volume, and org-wide DORA metrics. The single most damning signal: developers quietly routing *around* the platform. If that happens, no dashboard matters — go ask them why, in person.

## Takeaway

Platform engineering isn't "DevOps renamed." It's product management applied to internal infrastructure. The tools (Backstage, Crossplane, Argo, OPA) are the easy part. The hard, valuable part is making the right way the easy way — and proving developers agree.

*Repo: `idp-demo`. Built to learn in public.*
