import { Link } from "@tanstack/react-router";
import { Check, Database, Layers, ServerCog, ShieldCheck, Terminal } from "lucide-react";

import { OSS } from "../../constants";
import { GradientText } from "../../motion/GradientText";
import { Reveal } from "../../motion/Reveal";
import { CTA } from "../../sections/CTA";
import { CodeBlock } from "../../sections/CodeBlock";
import { FAQ } from "../../sections/FAQ";
import { FeatureGrid } from "../../sections/FeatureGrid";
import { Hero } from "../../sections/Hero";
import { SectionHeader } from "../../sections/SectionHeader";

const MODES = [
  {
    icon: Terminal,
    name: "Docker Compose (Local)",
    pitch: "Local development, testing, and sandbox environments.",
    features: [
      "Up in 10 seconds via docker compose",
      "Includes mock telemetry generator feeds",
      "Zero external dependencies",
    ],
    cta: { label: "View Compose config", path: OSS.frontend },
  },
  {
    icon: ServerCog,
    name: "Kubernetes (Helm)",
    pitch: "Production deployment with bundled analytical stores.",
    features: [
      "Bundles Kafka, ClickHouse, MySQL, Redis",
      "Stateless autoscaling ingestion pipeline",
      "Rolling upgrades supported out of the box",
    ],
    cta: { label: "Read Helm guide", path: "/architecture" },
    featured: true,
  },
  {
    icon: Layers,
    name: "Terraform (IaC)",
    pitch: "Deploy into your cloud VPC with managed cloud services.",
    features: [
      "Integrates MSK, RDS, and ElastiCache",
      "Fully isolated private VPC networking",
      "IAM-based access controls",
    ],
    cta: { label: "View TF modules", path: OSS.org },
  },
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Data residency",
    body: "All telemetry, storage, and compute remain completely within your VPC.",
  },
  {
    icon: ServerCog,
    title: "Built-in SSO",
    body: "SAML 2.0 and OIDC support with IDP group mapping included for free.",
  },
  {
    icon: Database,
    title: "Retention tiering",
    body: "Hot data in ClickHouse with warm and cold archiving to S3 or GCS.",
  },
  {
    icon: Terminal,
    title: "AI SRE integrated",
    body: "Diagnostic reasoning engine runs locally against your own telemetry graph.",
  },
];

const FAQS = [
  {
    question: "Do you offer commercial support?",
    answer:
      "The self-hosted platform is 100% open source under Apache 2.0 with no proprietary add-ons. If you prefer a managed service, Managed Optikk runs the exact same platform for you.",
  },
  {
    question: "Is there a hosted version?",
    answer: (
      <>
        Yes, Managed Optikk is the exact same open-source platform operated by us. See{" "}
        <Link to={"/pricing" as string & {}}>pricing</Link> for details.
      </>
    ),
  },
  {
    question: "How big does the Kubernetes cluster need to be?",
    answer:
      "A 12-node cluster (8 vCPU / 32 GiB per node) easily handles up to 10 TB/day of telemetry. The Helm chart bundles all components with sizing worksheets provided for higher volumes.",
  },
  {
    question: "Do you support HIPAA and SOC 2?",
    answer:
      "Yes. Because you host the entire platform in your own infrastructure, all data stays strictly within your compliance perimeter.",
  },
  {
    question: "Is there a paid enterprise edition?",
    answer:
      "No. All capabilities (including SAML SSO, clustering, and AI SRE) are included in the open-source repository with no feature gates.",
  },
];

export default function SelfHostPage() {
  return (
    <>
      <Hero
        eyebrow="Deployment options"
        title={
          <>
            Run Optikk where your data <GradientText>is supposed to live.</GradientText>
          </>
        }
        subtitle="Deploy Optikk in your Kubernetes cluster, private cloud, or air-gapped environment with full code parity and complete data control."
        primaryCta={{
          label: "View on GitHub",
          path: OSS.org,
          variant: "grad",
        }}
        secondaryCta={{ label: "Architecture", path: "/architecture", variant: "secondary" }}
      />

      <section className="m-section m-section--tight">
        <div className="m-container">
          <Reveal className="m-deploy-grid">
            {MODES.map((mode) => (
              <article
                key={mode.name}
                className={`m-deploy-card${mode.featured ? " is-featured" : ""}`}
              >
                <span className="m-bento-icon">
                  <mode.icon size={20} />
                </span>
                <h3 className="m-h3">{mode.name}</h3>
                <p className="m-body">{mode.pitch}</p>
                <ul className="m-price-list" style={{ flex: 1 }}>
                  {mode.features.map((f) => (
                    <li key={f}>
                      <Check size={16} strokeWidth={2.5} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                {mode.cta.path.startsWith("mailto:") || mode.cta.path.startsWith("http") ? (
                  <a
                    className={`m-btn ${mode.featured ? "m-btn-primary" : "m-btn-secondary"}`}
                    href={mode.cta.path}
                    target={mode.cta.path.startsWith("http") ? "_blank" : undefined}
                    rel={mode.cta.path.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {mode.cta.label}
                  </a>
                ) : (
                  <Link
                    to={mode.cta.path as string & {}}
                    className={`m-btn ${mode.featured ? "m-btn-primary" : "m-btn-secondary"}`}
                  >
                    {mode.cta.label}
                  </Link>
                )}
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="m-section" id="security">
        <div className="m-container">
          <SectionHeader
            eyebrow="Open source foundation"
            title={
              <>
                What we build into <GradientText>the core</GradientText>, free forever.
              </>
            }
            lede="No paywalls for the bits that should be defaults: SSO, audit logs, custom retention, and high-availability setups. They're in the box from day one."
          />
          <FeatureGrid items={FEATURES} />
        </div>
      </section>

      <section className="m-section m-section--warm">
        <div className="m-container">
          <Reveal>
            <SectionHeader
              eyebrow="Helm chart"
              title={
                <>
                  Install in one command. <GradientText>Customize the rest in YAML.</GradientText>
                </>
              }
              lede="One Helm chart bundles Kafka, ClickHouse, MySQL, and Redis. Point it at a Kubernetes cluster and the chart handles the rest, including rolling upgrades."
              align="left"
            />
          </Reveal>
          <CodeBlock
            tabs={[
              {
                label: "helm",
                content: `helm repo add optikk https://charts.optikk.dev
helm install optikk optikk/optikk \\
  --namespace optikk --create-namespace \\
  --set kafka.brokers=6 \\
  --set clickhouse.shards=6 \\
  --set mysql.replicas=2 \\
  --set redis.replicas=3 \\
  --set ai.enabled=true

# → ingest in 90s, UI in 3 min`,
              },
              {
                label: "terraform",
                content: `module "optikk" {
  source            = "optikk/optikk/aws"
  version           = "~> 1.0"
  vpc_id            = aws_vpc.main.id
  kafka_cluster_arn = aws_msk_cluster.optikk.arn
  clickhouse_subnets = aws_subnet.optikk.*.id
  mysql_endpoint    = aws_rds_cluster.optikk.endpoint
  redis_endpoint    = aws_elasticache_replication_group.optikk.primary_endpoint_address
}`,
              },
            ]}
          />
        </div>
      </section>

      <section className="m-section">
        <div className="m-container">
          <SectionHeader eyebrow="Common questions" title="Self-host FAQ" align="center" />
          <FAQ items={FAQS} />
        </div>
      </section>

      <CTA
        title={
          <>
            Deploy in minutes. <span style={{ color: "#fdba74" }}>Own your telemetry.</span>
          </>
        }
        subtitle="Join our community of developers self-hosting Optikk. Sizing documentation and Helm charts are available on GitHub."
        primary={{ label: "View on GitHub", path: OSS.org }}
        secondary={{ label: "Read architecture", path: "/architecture", variant: "secondary" }}
      />
    </>
  );
}
