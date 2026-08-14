import { Boxes, Cloud, Network, Server } from "lucide-react";

import { GradientText } from "../../motion/GradientText";
import { CTA } from "../../sections/CTA";
import { CodeBlock } from "../../sections/CodeBlock";
import { FeatureGrid } from "../../sections/FeatureGrid";
import { Hero } from "../../sections/Hero";
import { SectionHeader } from "../../sections/SectionHeader";
import { Split } from "../../sections/Split";

const SOURCES = [
  {
    icon: Boxes,
    title: "Kubernetes",
    body: "Pre-configured Helm chart for OpenTelemetry Collector with cluster auto-discovery.",
    link: { label: "Helm install", path: "#k8s" },
  },
  {
    icon: Cloud,
    title: "AWS / GCP / Azure",
    body: "Direct receivers for CloudWatch, Google Cloud, and Azure Monitor metrics.",
    link: { label: "Cloud receivers", path: "#cloud" },
  },
  {
    icon: Server,
    title: "Hosts & VMs",
    body: "Lightweight static binary collector for host metrics and system logs.",
    link: { label: "VM agent", path: "#host" },
  },
  {
    icon: Network,
    title: "Application SDKs",
    body: "Standard OpenTelemetry SDKs across all major programming languages.",
    link: { label: "SDKs", path: "#app" },
  },
];

const COLLECTOR_YAML = `exporters:
  otlp/optikk:
    endpoint: ingest.optikk.dev:4317
    headers:
      authorization: "Bearer \${OPTIKK_INGEST_TOKEN}"
    compression: zstd

service:
  pipelines:
    traces:  { receivers: [otlp], exporters: [otlp/optikk] }
    metrics: { receivers: [otlp], exporters: [otlp/optikk] }
    logs:    { receivers: [otlp], exporters: [otlp/optikk] }
`;

const NODE_SNIPPET = `import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: "https://ingest.optikk.dev/v1/traces",
    headers: {
      authorization: \`Bearer \${process.env.OPTIKK_INGEST_TOKEN}\`,
    },
  }),
}).start();
`;

const PYTHON_SNIPPET = `from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor

provider = TracerProvider()
exporter = OTLPSpanExporter(
    endpoint="ingest.optikk.dev:4317",
    headers=(("authorization", f"Bearer {token}"),),
)
provider.add_span_processor(BatchSpanProcessor(exporter))
trace.set_tracer_provider(provider)
`;

const GO_SNIPPET = `import (
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"
    sdktrace "go.opentelemetry.io/otel/sdk/trace"
)

exp, _ := otlptracegrpc.New(ctx,
    otlptracegrpc.WithEndpoint("ingest.optikk.dev:4317"),
    otlptracegrpc.WithHeaders(map[string]string{
        "authorization": "Bearer " + token,
    }),
)
otel.SetTracerProvider(sdktrace.NewTracerProvider(
    sdktrace.WithBatcher(exp),
))
`;

const CURL_SNIPPET = `curl -X POST https://ingest.optikk.dev/v1/traces \\
    -H "authorization: Bearer $OPTIKK_INGEST_TOKEN" \\
    -H "content-type: application/x-protobuf" \\
    --data-binary @trace.bin

# → 200 OK { "partialSuccess": {} }
`;

const HELM_SNIPPET = `$ helm repo add optikk https://charts.optikk.dev
$ helm install optikk-otelcol optikk/otel-collector \\
    --set token=$OPTIKK_INGEST_TOKEN \\
    --set region=us-east-1 \\
    --set k8s.events=true \\
    --set k8s.logs=true

# → 12 pods scheduled, scraping in <30s
`;

export default function OpenTelemetryPage() {
  return (
    <>
      <Hero
        eyebrow="OpenTelemetry"
        title={
          <>
            Point your collector at us. <GradientText>Be ingesting in 4 minutes.</GradientText>
          </>
        }
        subtitle="OpenTelemetry-native from day one. No proprietary agents or custom SDKs — point any standard OTLP collector to get started."
        primaryCta={{ label: "Self-host now", path: "/self-host", variant: "grad" }}
        secondaryCta={{ label: "View architecture", path: "/architecture", variant: "secondary" }}
        meta={["OTLP gRPC + HTTP", "Traces · metrics · logs", "All major SDKs"]}
      />

      <section className="m-section m-section--tight">
        <div className="m-container">
          <SectionHeader
            eyebrow="Quickstart"
            title={
              <>
                Three lines of config. <GradientText>One restart.</GradientText>
              </>
            }
            lede="Add our OTLP endpoint to your collector configuration. Keep your existing pipeline without changes."
          />
          <CodeBlock
            tabs={[
              { label: "collector.yaml", content: COLLECTOR_YAML },
              { label: "Node.js", content: NODE_SNIPPET },
              { label: "Python", content: PYTHON_SNIPPET },
              { label: "Go", content: GO_SNIPPET },
              { label: "curl", content: CURL_SNIPPET },
            ]}
          />
        </div>
      </section>

      <section className="m-section">
        <div className="m-container">
          <SectionHeader
            eyebrow="Data sources"
            title="Wire any source. We meet you where you are."
            lede="Every receiver in the OpenTelemetry contrib distribution works out of the box. We document the high-traffic ones first."
          />
          <FeatureGrid items={SOURCES} />
        </div>
      </section>

      <section className="m-section m-section--warm">
        <div className="m-container">
          <Split
            reverse
            eyebrow="Collector deep-dive"
            title={
              <>
                Hardened collector, <GradientText>100% upstream compatible.</GradientText>
              </>
            }
            body="Hardened OpenTelemetry Collector build with zstd compression, auto-retries, and disk-backed buffer queues."
            list={[
              {
                title: "Drop-in upstream",
                body: "Identical config schema. Swap to community builds any time.",
              },
              {
                title: "Hot-reload routes",
                body: "Update sampling and redaction rules without restarting.",
              },
              {
                title: "Disk-backed queues",
                body: "Persistent queues prevent data loss during network hiccups.",
              },
            ]}
            visual={<CodeBlock tabs={[{ label: "helm install", content: HELM_SNIPPET }]} />}
          />
        </div>
      </section>

      <CTA
        eyebrow="Try it"
        title={
          <>
            Start self-hosting today.{" "}
            <span style={{ color: "#fdba74" }}>4 minutes to first span.</span>
          </>
        }
        subtitle="Deploy Optikk in your private cloud or local infrastructure. Our Helm chart gets you up and running in under 5 minutes."
        primary={{ label: "Self-host now", path: "/self-host" }}
        secondary={{ label: "Architecture", path: "/architecture", variant: "secondary" }}
      />
    </>
  );
}
