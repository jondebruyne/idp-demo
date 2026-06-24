// Observability, pre-wired. Every service born from the golden path ships
// with traces + metrics out of the box — no team has to remember to add it.
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

const sdk = new NodeSDK({
  serviceName: "${{ values.name }}",
  instrumentations: [getNodeAutoInstrumentations()],
  // OTEL_EXPORTER_OTLP_ENDPOINT is injected by the platform; no per-service config.
});

sdk.start();
process.on("SIGTERM", () => sdk.shutdown().finally(() => process.exit(0)));
