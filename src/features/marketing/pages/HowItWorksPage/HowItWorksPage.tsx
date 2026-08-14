import { Bot, Cloud, Database, GitBranch, HardDrive, Network, Server, Zap } from "lucide-react";

import { GradientText } from "../../motion/GradientText";
import { Reveal } from "../../motion/Reveal";
import { CTA } from "../../sections/CTA";
import { CodeBlock } from "../../sections/CodeBlock";
import { Hero } from "../../sections/Hero";
import { SectionHeader } from "../../sections/SectionHeader";
import { Split } from "../../sections/Split";
import { Screenshot } from "../../visuals/Screenshot";

const LAYERS = [
  {
    name: "Ingest",
    label: "Layer 01",
    icon: Cloud,
    body: "Stateless HTTP and gRPC receivers supporting OTLP, Prometheus, and Vector.",
  },
  {
    name: "Routing",
    label: "Layer 02",
    icon: GitBranch,
    body: "Dynamic per-source quotas, sampling, and automated PII redaction.",
  },
  {
    name: "Stream buffer · Kafka",
    label: "Layer 03",
    icon: Zap,
    body: "Decouples ingest spikes from storage writes and powers stream replay.",
  },
  {
    name: "Columnar store · ClickHouse",
    label: "Layer 04",
    icon: Database,
    body: "High-performance columnar storage for petabyte-scale telemetry scans.",
    grad: true,
  },
  {
    name: "Metadata · MySQL",
    label: "Layer 05",
    icon: HardDrive,
    body: "ACID storage for workspaces, RBAC, alerts, and topology graphs.",
  },
  {
    name: "Live tail + cache · Redis",
    label: "Layer 06",
    icon: Network,
    body: "Sub-millisecond query caching and real-time live tail fan-out.",
  },
  {
    name: "AI SRE",
    label: "Layer 07",
    icon: Bot,
    body: "Reasoning engine analyzing the telemetry graph for automated incident diagnostics.",
    grad: true,
  },
  {
    name: "API + apps",
    label: "Layer 08",
    icon: Server,
    body: "Unified GraphQL, REST, and WebSocket APIs powering UI and terminal clients.",
  },
];

export default function ArchitecturePage() {
  return (
    <>
      <Hero
        eyebrow="Architecture"
        title={
          <>
            Boring underneath. <GradientText>Fast on top.</GradientText>
          </>
        }
        subtitle="Built on proven high-throughput primitives: Kafka for streaming, ClickHouse for columnar queries, MySQL for metadata, and Redis for real-time caching."
        primaryCta={{ label: "Read the deep dive", path: "/opentelemetry", variant: "grad" }}
        secondaryCta={{ label: "Self-host options", path: "/self-host", variant: "secondary" }}
      />

      <section className="m-section">
        <div className="m-container">
          <SectionHeader
            eyebrow="The stack"
            title={
              <>
                Eight layers, <GradientText>each independently scalable.</GradientText>
              </>
            }
            lede="Every layer is replaceable, every layer is an off-the-shelf primitive. There is no proprietary store you can't operate yourself."
          />
          <Reveal>
            <div className="m-arch">
              {LAYERS.map((layer) => (
                <div key={layer.name} className={`m-arch-node${layer.grad ? " is-grad" : ""}`}>
                  <span>{layer.label}</span>
                  <strong>
                    <layer.icon size={16} style={{ verticalAlign: -2, marginRight: 6 }} />
                    {layer.name}
                  </strong>
                  <p>{layer.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="m-section m-section--warm">
        <div className="m-container">
          <Split
            eyebrow="Storage"
            title={
              <>
                ClickHouse, <GradientText>tuned for telemetry.</GradientText>
              </>
            }
            body="A sharded ClickHouse cluster with pre-built projection indexes optimized for sub-200ms analytical queries."
            list={[
              {
                title: "Vectorized scans",
                body: "Reads only requested columns to keep query latency minimal.",
              },
              {
                title: "Tenant isolation",
                body: "Dedicated database namespaces prevent noisy neighbor interference.",
              },
              {
                title: "Kafka pipeline",
                body: "Continuous buffered ingestion with replay capabilities.",
              },
            ]}
            visual={
              <CodeBlock
                tabs={[
                  {
                    label: "ClickHouse SQL",
                    content: `SELECT service, count() AS errors, quantile(0.99)(duration_ms) AS p99
FROM otel.spans
WHERE timestamp > now() - INTERVAL 30 MINUTE
  AND status_code = 'ERROR'
GROUP BY service
ORDER BY errors DESC
LIMIT 20`,
                  },
                  {
                    label: "Schema (excerpt)",
                    content: `CREATE TABLE otel.spans (
  trace_id        FixedString(16),
  span_id         FixedString(8),
  parent_span_id  FixedString(8),
  service         LowCardinality(String),
  name            LowCardinality(String),
  timestamp       DateTime64(9, 'UTC'),
  duration_ms     UInt32,
  status_code     LowCardinality(String),
  attributes      Map(LowCardinality(String), String),
  resource        Map(LowCardinality(String), String)
) ENGINE = ReplicatedMergeTree
PARTITION BY toYYYYMMDD(timestamp)
ORDER BY (service, timestamp, trace_id)
TTL timestamp + INTERVAL 30 DAY;`,
                  },
                ]}
              />
            }
          />
        </div>
      </section>

      <section className="m-section">
        <div className="m-container">
          <Split
            reverse
            eyebrow="Context graph"
            title={
              <>
                Telemetry, <GradientText>turned into a graph in MySQL.</GradientText>
              </>
            }
            body="Real-time topology graph mapping relationships between services, pods, and deployments."
            list={[
              {
                title: "Real-time extraction",
                body: "Entities and dependencies extracted continuously from span streams.",
              },
              {
                title: "Graph DSL",
                body: "Simple traversal queries to inspect service dependencies.",
              },
              {
                title: "Deploy versioning",
                body: "Historical topology tracking to compare architectures over time.",
              },
            ]}
            visual={
              <CodeBlock
                tabs={[
                  {
                    label: "Graph DSL",
                    content: `# Find every database reachable from checkout, as of yesterday
match
  (s:Service { name: "checkout-api" })
  -[:depends_on*]->
  (d:Database)
return s, d
at "2026-05-19T14:00Z"`,
                  },
                  {
                    label: "Underlying MySQL",
                    content: `SELECT d.kind, d.identifier, e.first_seen, e.last_seen
FROM entities s
JOIN edges     e ON e.from_id = s.id AND e.type = 'depends_on'
JOIN entities d ON d.id = e.to_id
WHERE s.kind = 'service'
  AND s.identifier = 'checkout-api'
  AND e.valid_at <= '2026-05-19 14:00:00'
  AND (e.invalid_at IS NULL OR e.invalid_at > '2026-05-19 14:00:00');`,
                  },
                ]}
              />
            }
          />
        </div>
      </section>

      <section className="m-section m-section--warm">
        <div className="m-container">
          <Split
            eyebrow="Real-time path"
            title={
              <>
                Redis carries the hot path, <GradientText>not ClickHouse.</GradientText>
              </>
            }
            body="In-memory Redis layer handling streaming subscriptions and alert state machines."
            list={[
              {
                title: "Live tail pub/sub",
                body: "Concurrent log tailing without burdening the analytical database.",
              },
              {
                title: "Stateful alerts",
                body: "Instant alert rule evaluation with cached state.",
              },
              {
                title: "Result caching",
                body: "Memoized queries for frequently viewed dashboards.",
              },
            ]}
            visual={
              <CodeBlock
                tabs={[
                  {
                    label: "Live tail wire",
                    content: `# Browser subscribes via WebSocket → API → Redis pub/sub channel
SUBSCRIBE livetail:tenant:acme:logs:service=checkout,level=ERROR

# Producer (Kafka consumer) publishes filtered events
PUBLISH livetail:tenant:acme:logs:service=checkout,level=ERROR {
  "ts": "2026-05-19T14:02:13.412Z",
  "service": "payment-svc",
  "level": "ERROR",
  "message": "Lock wait timeout exceeded; try restarting transaction"
}`,
                  },
                ]}
              />
            }
          />
        </div>
      </section>

      <section className="m-section">
        <div className="m-container">
          <SectionHeader
            eyebrow="In product"
            title={
              <>
                Operate the stack <GradientText>through the same UI your tenant uses.</GradientText>
              </>
            }
            lede="Every layer of the architecture shows up as a first-class view. No grafana sprawl, no separate Kafka UI to bookmark."
            align="center"
          />
          <Reveal className="m-bento">
            <article className="is-wide m-bento-card">
              <h3 className="m-h3">Database saturation</h3>
              <p className="m-body-sm">
                Query throughput, percentile latency, replication lag, and deadlocks are keyed to
                the ClickHouse + MySQL layers.
              </p>
              <Screenshot
                name="database"
                alt="Database saturation dashboard with QPS, p99 latency, and replication lag"
              />
            </article>
            <article className="is-wide m-bento-card">
              <h3 className="m-h3">Kafka broker fleet</h3>
              <p className="m-body-sm">
                Per-broker throughput, ISR shrinks, under-replicated partitions, and consumer lag
                are the full Kafka SRE surface.
              </p>
              <Screenshot
                name="kafka"
                alt="Kafka cluster dashboard with broker fleet heatmap and consumer lag chart"
              />
            </article>
            <article className="is-wide m-bento-card">
              <h3 className="m-h3">Service catalog</h3>
              <p className="m-body-sm">
                Every service the API + apps layer exposes, with golden signals and SLO burn at a
                glance.
              </p>
              <Screenshot
                name="services"
                alt="Service catalog listing 15 services with request rate, error %, and p99 latency"
              />
            </article>
            <article className="is-wide m-bento-card">
              <h3 className="m-h3">Service detail</h3>
              <p className="m-body-sm">
                Drill into one service to see requests, errors, latency, top endpoints, and top
                exceptions. One click from any alert.
              </p>
              <Screenshot
                name="service-detail"
                alt="Service detail view for payment-svc with golden signals and top endpoints table"
              />
            </article>
          </Reveal>
        </div>
      </section>

      <CTA
        title={
          <>
            See the engine in your own data.{" "}
            <span style={{ color: "#fdba74" }}>Bring an OTel collector.</span>
          </>
        }
        subtitle="Deploy on Kubernetes with our Helm chart to run entirely within your own infrastructure."
        primary={{ label: "Self-host options", path: "/self-host" }}
        secondary={{ label: "OpenTelemetry setup", path: "/opentelemetry", variant: "secondary" }}
      />
    </>
  );
}
