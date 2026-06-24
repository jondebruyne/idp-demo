// OpenTelemetry must be imported first so it can instrument everything below.
import "./otel";
import express from "express";

const app = express();
const port = process.env.PORT ?? 8080;

// Kubernetes probes hit these — the golden path wires them into the manifests.
app.get("/healthz", (_req, res) => res.status(200).send("ok"));   // liveness
app.get("/readyz", (_req, res) => res.status(200).send("ready")); // readiness

app.get("/", (_req, res) => res.json({ service: "${{ values.name }}", status: "up" }));

app.listen(port, () => console.log(`${{ values.name }} listening on :${port}`));
