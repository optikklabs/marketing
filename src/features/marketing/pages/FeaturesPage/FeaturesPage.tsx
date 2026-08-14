import { Bot, LineChart, ScrollText, Sparkles, Workflow } from "lucide-react";

import { GradientText } from "../../motion/GradientText";
import { CTA } from "../../sections/CTA";
import { CodeBlock } from "../../sections/CodeBlock";
import { Hero } from "../../sections/Hero";
import { SectionHeader } from "../../sections/SectionHeader";
import { Split } from "../../sections/Split";
import { DashboardMock } from "../../visuals/DashboardMock";
import { Screenshot } from "../../visuals/Screenshot";
import { TerminalWindow } from "../../visuals/TerminalWindow";

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

const ANCHORS = [
  { label: "Logs", id: "logs" },
  { label: "Traces", id: "traces" },
  { label: "Metrics", id: "metrics" },
  { label: "AI SRE", id: "ai-sre" },
  { label: "LLM Obs", id: "llm" },
];

export default function FeaturesPage() {
  return (
    <>
      <Hero
        eyebrow="The platform"
        title={
          <>
            Every signal, <GradientText>one query language, one database.</GradientText>
          </>
        }
        subtitle="Logs, traces, metrics, and LLM spans unified in a single high-performance lake with sub-second queries."
        primaryCta={{ label: "Self-host now", path: "/self-host", variant: "grad" }}
        secondaryCta={{ label: "Read the docs", path: "/opentelemetry", variant: "secondary" }}
      />

      <div className="m-container" style={{ position: "relative" }}>
        <nav className="m-anchor-nav" aria-label="Platform sections">
          {ANCHORS.map((a) => (
            <a key={a.id} href={`#${a.id}`}>
              {a.label}
            </a>
          ))}
        </nav>
      </div>

      <section className="m-section m-section--tight">
        <div className="m-container">
          <Split
            id="logs"
            eyebrow="Logs"
            title={
              <>
                Stream a billion lines. <GradientText>Find one in 200ms.</GradientText>
              </>
            }
            body="Fast columnar indexing for full-text search, live tailing, and pattern clustering without tag restrictions."
            list={[
              {
                title: "Full-text search",
                body: "Combine structured filters and message regex in a single query.",
              },
              {
                title: "Pattern clustering",
                body: "Automatically group billions of log events into identifiable templates.",
              },
              {
                title: "Live tail streaming",
                body: "Stream millions of events per second to browser or terminal.",
              },
              {
                title: "Per-source quotas",
                body: "Control noisy services with fine-grained routing policies.",
              },
            ]}
            visual={
              <Screenshot
                name="logs"
                alt="Optikk logs explorer"
                bare
                fallback={<DashboardMock type="logs" />}
              />
            }
          />
        </div>
      </section>

      <section className="m-section m-section--warm">
        <div className="m-container">
          <Split
            id="traces"
            reverse
            eyebrow="Distributed tracing"
            title={
              <>
                High-performance tracing. <GradientText>Zero vendor lock-in.</GradientText>
              </>
            }
            body="Interactive flame graphs, span diffing, latency heatmaps, and deep metadata inspection."
            list={[
              {
                title: "Compare traces",
                body: "Diff span durations and attributes to pinpoint regressions instantly.",
              },
              {
                title: "High cardinality",
                body: "Filter and group by tenant, user, or custom tags without sampling.",
              },
              {
                title: "Native OTLP",
                body: "Compatible with standard OpenTelemetry SDKs out of the box.",
              },
            ]}
            visual={
              <Screenshot
                name="trace"
                alt="Optikk trace waterfall"
                bare
                fallback={<DashboardMock type="traces" />}
              />
            }
          />
        </div>
      </section>

      <section className="m-section">
        <div className="m-container">
          <Split
            id="metrics"
            eyebrow="Metrics"
            title={
              <>
                PromQL native. <GradientText>Warehouse-scale time series.</GradientText>
              </>
            }
            body="Ingest OTLP and Prometheus metrics with sub-second PromQL queries over high-cardinality data."
            list={[
              {
                title: "Unlimited cardinality",
                body: "Tags are free. No metrics dropped to maintain query speed.",
              },
              {
                title: "GitOps SLOs",
                body: "Define recording rules and alert policies in version-controlled YAML.",
              },
              {
                title: "AI baselines",
                body: "Dynamic anomaly detection based on historical service patterns.",
              },
            ]}
            visual={<TerminalWindow title="~ optikk metrics">{METRICS_SESSION}</TerminalWindow>}
          />
        </div>
      </section>

      <section className="m-section m-section--ink">
        <div className="m-container">
          <SectionHeader
            eyebrow="AI SRE"
            title={
              <span style={{ color: "#fff" }}>
                An on-call engineer that already <GradientText>read your runbook.</GradientText>
              </span>
            }
            lede={
              <span style={{ color: "#c0cee0" }}>
                The AI SRE analyzes logs, traces, metrics, and deploys to diagnose root causes and
                recommend actionable fixes.
              </span>
            }
          />
          <div id="ai-sre" style={{ marginTop: 32 }}>
            <CodeBlock
              tabs={[
                {
                  label: "Optikk AI · Slack",
                  content: "@optikk what broke checkout p99 in the last 30m?",
                  render: (
                    <>
                      <span className="tok-p">@optikk</span> what broke checkout p99 in the last
                      30m?{"\n\n"}
                      <span className="tok-c">
                        {"// AI SRE · grounded on 3.4M spans, 88k logs, 12 deploys"}
                      </span>
                      {"\n"}
                      <span className="tok-k">Cause:</span>
                      {"  "}
                      <span className="tok-s">"Lock wait timeout exceeded"</span> on{" "}
                      <span className="tok-n">payment-svc</span> after deploy{" "}
                      <span className="tok-n">abc12d</span>
                      {"\n"}
                      <span className="tok-k">Window:</span> 14:02 → now (checkout p99 310ms → 2.4s)
                      {"\n"}
                      <span className="tok-k">Impact:</span> ~12k orders queued, 0 lost{"\n"}
                      <span className="tok-k">Evidence:</span>{" "}
                      <span className="tok-n">trace:9f3c21ab</span>,{" "}
                      <span className="tok-n">log:lock_wait_timeout</span>,{" "}
                      <span className="tok-n">deploy:abc12d</span>
                      {"\n"}
                      <span className="tok-k">Suggested fix:</span> revert{" "}
                      <span className="tok-n">abc12d</span> <span className="tok-c">{"// or"}</span>{" "}
                      add index on <span className="tok-s">"orders.tenant_id"</span>
                      {"\n"}
                      <span className="tok-k">Confidence:</span> <span className="tok-s">high</span>
                    </>
                  ),
                },
                {
                  label: "Optikk AI · runbook",
                  content: "POST /v1/ai/sre/runbook ...",
                  render: (
                    <>
                      <span className="tok-k">POST</span>{" "}
                      <span className="tok-s">/v1/ai/sre/runbook</span>
                      {"\n"}
                      <span className="tok-p">{"{"}</span>
                      {"\n"}
                      {"  "}
                      <span className="tok-n">alert_id</span>:{" "}
                      <span className="tok-s">"payment-lock-contention"</span>,{"\n"}
                      {"  "}
                      <span className="tok-n">scope</span>: <span className="tok-p">{"{"}</span>{" "}
                      service: <span className="tok-s">"payment-svc"</span>, env:{" "}
                      <span className="tok-s">"prod"</span> <span className="tok-p">{"}"}</span>,
                      {"\n"}
                      {"  "}
                      <span className="tok-n">depth</span>: <span className="tok-s">"full"</span>
                      {"\n"}
                      <span className="tok-p">{"}"}</span>
                      {"\n\n"}
                      <span className="tok-c">
                        {
                          "// → returns: timeline, evidence graph, ranked hypotheses, code-ready fix"
                        }
                      </span>
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="m-section">
        <div className="m-container">
          <Split
            id="llm"
            eyebrow="LLM observability"
            title={
              <>
                Trace every prompt. <GradientText>See tokens the way you see latency.</GradientText>
              </>
            }
            body="Trace prompts, tool calls, token volume, and eval scores directly alongside service spans."
            list={[
              {
                title: "Tool & agent waterfalls",
                body: "Inspect full agent execution chains in the same trace waterfall as backend services.",
              },
              {
                title: "Evaluation scores",
                body: "Attach automated LLM evaluation results to individual production spans.",
              },
              {
                title: "Token cost attribution",
                body: "Break down token consumption and dollar spend by user, tenant, and model.",
              },
            ]}
            visual={
              <CodeBlock
                tabs={[
                  {
                    label: "LLM span",
                    content: "trace.start_span ...",
                    render: (
                      <>
                        <span className="tok-k">from</span> optikk{" "}
                        <span className="tok-k">import</span> trace{"\n\n"}
                        <span className="tok-k">with</span> trace.start_span(
                        <span className="tok-s">"llm.completion"</span>){" "}
                        <span className="tok-k">as</span> sp:{"\n"}
                        {"    "}sp.set(<span className="tok-s">"model"</span>,{" "}
                        <span className="tok-s">"claude-opus-4-8"</span>){"\n"}
                        {"    "}sp.set(<span className="tok-s">"tenant"</span>, user.tenant){"\n"}
                        {"    "}sp.set(<span className="tok-s">"feature"</span>,{" "}
                        <span className="tok-s">"chat.assist"</span>){"\n"}
                        {"    "}out = client.messages.create(...){"\n"}
                        {"    "}sp.set(<span className="tok-s">"tokens.in"</span>,
                        out.usage.input_tokens){"\n"}
                        {"    "}sp.set(<span className="tok-s">"tokens.out"</span>,
                        out.usage.output_tokens){"\n"}
                        {"    "}sp.set(<span className="tok-s">"cost.usd"</span>,
                        optikk.price(out.usage))
                      </>
                    ),
                  },
                ]}
              />
            }
          />
        </div>
      </section>

      <section className="m-section m-section--warm">
        <div className="m-container">
          <SectionHeader
            eyebrow="More signals"
            title="Same lake, more depth."
            lede="Unified telemetry engine supporting RUM, continuous profiling, SLOs, and custom signals."
            align="center"
          />
          <div className="m-bento">
            {[
              {
                icon: Sparkles,
                title: "Real user monitoring",
                body: "Browser and mobile performance, Core Web Vitals, and session errors.",
              },
              {
                icon: Workflow,
                title: "Continuous profiling",
                body: "Flame graphs tied directly to distributed trace IDs for CPU and memory hotspots.",
              },
              {
                icon: LineChart,
                title: "SLOs & burn rates",
                body: "Code-defined SLOs with alerts triggered only when error budgets burn.",
              },
              {
                icon: ScrollText,
                title: "Audit & access logs",
                body: "Immutable compliance logs with long-term retention policies.",
              },
              {
                icon: Bot,
                title: "Synthetics",
                body: "Scheduled API and browser workflow probes running across 12 regions.",
              },
              {
                icon: Sparkles,
                title: "Custom signals",
                body: "Define domain-specific entity types and event streams via typed schemas.",
              },
            ].map((item) => (
              <article key={item.title.toString()} className="m-bento-card">
                <span className="m-bento-icon">
                  <item.icon size={20} />
                </span>
                <h3 className="m-h3">{item.title}</h3>
                <p className="m-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title={
          <>
            See it on your own telemetry.{" "}
            <span style={{ color: "#fdba74" }}>100% open source.</span>
          </>
        }
        subtitle="Fully self-hostable in under 5 minutes with our Helm chart."
        primary={{ label: "Self-host now", path: "/self-host" }}
        secondary={{ label: "See how it works", path: "/how-it-works", variant: "secondary" }}
      />
    </>
  );
}
