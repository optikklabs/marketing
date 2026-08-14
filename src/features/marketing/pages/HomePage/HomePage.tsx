import { APP_URLS } from "@/shared/constants/app";
import { GradientText } from "../../motion/GradientText";
import { AgentTerminal } from "../../sections/AgentTerminal";
import { CTA } from "../../sections/CTA";
import { FeatureGrid } from "../../sections/FeatureGrid";
import { Hero } from "../../sections/Hero";
import { LogoStrip } from "../../sections/LogoStrip";
import { OpenSourceSection } from "../../sections/OpenSourceSection";
import { SectionHeader } from "../../sections/SectionHeader";
import { Split } from "../../sections/Split";
import { CliUiVisual } from "../../visuals/CliUiVisual";
import { PILLARS, STACK_LOGOS } from "./HomePageData";

const HERO_SESSION = `$ optikk services list --from 1h

SERVICE      REQUESTS  ERRORS  AVG ms  P95 ms  P99 ms
api-gateway  182304    21      38.2    91.4    142.7
checkout     41889     1743    112.9   840.1   2410.3
payment-svc  40112     1502    96.5    712.8   1988.4
inventory    78451     3       22.1    54.9    88.0`;

const METRICS_SESSION = `$ optikk metrics query --metric http.server.duration \\
    --aggregation p99 --group-by service --from 3h

{
  "series": [
    { "group": "checkout",
      "points": [["14:00", 312], ["14:05", 2410], ["14:10", 2395]] },
    { "group": "api-gateway",
      "points": [["14:00", 141], ["14:05", 139], ["14:10", 143]] }
  ]
}`;

const LOGS_SESSION = `$ optikk logs search \\
    -q "severity_text:ERROR service_name:payment-svc" --from 15m

TIMESTAMP     SERVICE      SEVERITY  BODY
14:23:51.412  payment-svc  ERROR     Lock wait timeout exceeded
14:23:47.098  payment-svc  ERROR     Lock wait timeout exceeded
14:23:40.771  payment-svc  ERROR     rolling back txn 8af14b`;

const TRACES_SESSION = `$ optikk traces search \\
    -q "service:checkout status:error" --from 15m --limit 3

TRACE ID          OPERATION              STATUS  DURATION
9f3c21ab44d0e817  POST /api/v2/checkout  error   2.41s
b82fe0c1a9d34771  POST /api/v2/checkout  error   2.18s
04d7c9ee52b1f3a0  POST /api/v2/checkout  error   1.97s`;

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="CLI-native observability"
        title={
          <>
            Observability for <GradientText>the AI era.</GradientText>
          </>
        }
        subtitle="Unified logs, metrics, and traces for your entire stack and LLM applications. OpenTelemetry-native, open source, and queryable from the terminal or by AI coding agents."
        primaryCta={{ label: "Start free", path: APP_URLS.signup }}
        secondaryCta={{ label: "Self-host now", path: "/self-host", variant: "secondary" }}
        meta={["Apache 2.0 licensed", "Built for coding agents", "5-minute setup"]}
        visual={
          <CliUiVisual
            session={HERO_SESSION}
            screenshot={{
              name: "services",
              alt: "Optikk services dashboard showing RED metrics for the same fleet in the web UI",
              mock: "metrics",
            }}
          />
        }
      />

      <LogoStrip label="Runs on the stack you already have" items={STACK_LOGOS} />

      <AgentTerminal />

      <section className="m-section">
        <div className="m-container">
          <SectionHeader
            eyebrow="The platform"
            title={
              <>
                Everything in one place, <GradientText>nothing forced into a box.</GradientText>
              </>
            }
            lede="Ingest, store, query, alert, explain, and act — unified in a single high-performance telemetry pipeline."
          />
          <FeatureGrid items={PILLARS} />
        </div>
      </section>

      <section className="m-section m-section--warm">
        <div className="m-container">
          <Split
            id="logs"
            eyebrow="Logs"
            title="The full stream, not just samples."
            body="Every line indexed in a high-speed columnar store with sub-200ms queries and 30 days of hot retention."
            list={[
              {
                title: "Sub-second queries",
                body: "Optimized projection indexes for instant filtering and aggregations.",
              },
              {
                title: "Live tail streaming",
                body: "Stream filtered logs directly to your browser or terminal in real time.",
              },
              {
                title: "Automated pattern clustering",
                body: "Group billions of log lines into templates to spot anomalies instantly.",
              },
            ]}
            link={{ label: "Explore logs", path: "/features#logs" }}
            visual={
              <CliUiVisual
                terminalTitle="~ optikk logs"
                session={LOGS_SESSION}
                screenshot={{
                  name: "logs",
                  alt: "Optikk logs explorer with severity facets and timeline histogram",
                  mock: "logs",
                }}
              />
            }
          />
        </div>
      </section>

      <section className="m-section">
        <div className="m-container">
          <Split
            id="traces"
            reverse
            eyebrow="Traces"
            title="High-performance distributed tracing."
            body="Interactive flame graphs, span diffing, latency heatmaps, and AI-powered root cause analysis."
            list={[
              {
                title: "Trace comparisons",
                body: "Side-by-side span diffs to pinpoint regressions between deployments.",
              },
              {
                title: "High cardinality",
                body: "Filter and group by any tag or attribute without limits.",
              },
              {
                title: "Native OTLP",
                body: "Zero proprietary agents. Connect any standard OpenTelemetry collector.",
              },
            ]}
            link={{ label: "See trace explorer", path: "/features#traces" }}
            visual={
              <CliUiVisual
                terminalTitle="~ optikk traces"
                session={TRACES_SESSION}
                screenshot={{
                  name: "trace",
                  alt: "Optikk trace waterfall for POST /api/v2/checkout with span detail panel",
                  mock: "traces",
                }}
              />
            }
          />
        </div>
      </section>

      <section className="m-section m-section--warm">
        <div className="m-container">
          <Split
            id="metrics"
            eyebrow="Metrics"
            title="Prometheus-compatible time series."
            body="Ingest OTLP and Prometheus metrics side by side with native PromQL query support."
            list={[
              {
                title: "PromQL native",
                body: "Drop-in compatibility with existing Prometheus queries and alerts.",
              },
              {
                title: "Unlimited labels",
                body: "Store high-cardinality series without dropping labels.",
              },
              {
                title: "Smart baselines",
                body: "Automated anomaly detection tailored to your traffic patterns.",
              },
            ]}
            link={{ label: "Metrics deep-dive", path: "/features#metrics" }}
            visual={
              <CliUiVisual
                terminalTitle="~ optikk metrics"
                session={METRICS_SESSION}
                screenshot={{
                  name: "overview",
                  alt: "Optikk metrics dashboard with p99 latency by service in the web UI",
                  mock: "metrics",
                }}
              />
            }
          />
        </div>
      </section>

      <OpenSourceSection />

      <CTA
        eyebrow="Get started"
        title={
          <>
            One curl command. <GradientText>That's the setup.</GradientText>
          </>
        }
        subtitle="Install the CLI, run onboard, and start ingesting OpenTelemetry data in minutes."
        primary={{ label: "Start free", path: APP_URLS.signup }}
        secondary={{ label: "Read the CLI docs", path: "/cli", variant: "secondary" }}
      />
    </>
  );
}
