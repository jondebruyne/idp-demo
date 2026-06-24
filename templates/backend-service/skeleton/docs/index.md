# ${{ values.name }}

${{ values.description }}

Owned by **${{ values.owner }}**. Created from the platform's *New Backend Service* golden path.

## Local dev

```bash
npm ci
npm run dev    # http://localhost:8080
```

## Endpoints

| Path        | Purpose              |
|-------------|----------------------|
| `/`         | service info         |
| `/healthz`  | liveness probe       |
| `/readyz`   | readiness probe      |

## What you get for free

Observability (OpenTelemetry), CI/CD with security scanning, a hardened
non-root container, Kubernetes manifests with probes and resource limits,
and cost-allocation tags. You didn't configure any of it — the platform did.
