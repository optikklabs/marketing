import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { APP_URLS } from "@/shared/constants/app";

import { GradientText } from "../../motion/GradientText";
import { Reveal } from "../../motion/Reveal";
import { CTA } from "../../sections/CTA";
import { ComparisonTable } from "../../sections/ComparisonTable";
import { FAQ } from "../../sections/FAQ";
import { Hero } from "../../sections/Hero";
import { SectionHeader } from "../../sections/SectionHeader";
import { MANAGED_RATES, PRICING_FAQS } from "./PricingPageData";

const MANAGED_FEATURES = [
  "Fully managed, meaning no Kafka, ClickHouse, or Kubernetes to run",
  "All features included: AI SRE, SSO, alerting, dashboards",
  "Signup to first trace in minutes with optikk onboard",
  "No per-seat or per-host charges",
];

const SELF_HOST_FEATURES = [
  "Apache 2.0 licensed, no feature gates",
  "Run in your VPC, private cloud, or air-gapped",
  "SAML SSO, clustering, and AI SRE included",
  "Helm, Terraform, and Docker Compose deploys",
];

export default function PricingPage() {
  return (
    <>
      <Hero
        eyebrow="Pricing"
        title={
          <>
            Simple, usage-based. <GradientText>Pay for what you ingest.</GradientText>
          </>
        }
        subtitle="No per-seat pricing, no per-host pricing, no feature gates. Managed Optikk meters the telemetry you send, while self-hosting the full platform stays free forever."
        primaryCta={{ label: "Start free", path: APP_URLS.signup }}
        secondaryCta={{ label: "Self-host now", path: "/self-host", variant: "secondary" }}
      />

      <section className="m-section m-section--tight">
        <div className="m-container">
          <Reveal className="is-duo m-price-grid">
            <article className="is-featured m-price-card">
              <span className="m-price-badge">Usage-based</span>
              <span className="m-price-tier">Managed Cloud</span>
              <div className="m-price-rates">
                {MANAGED_RATES.map((rate) => (
                  <div key={rate.signal} className="m-price-amount">
                    <span style={{ minWidth: 72 }}>{rate.signal}</span>
                    <strong>{rate.price}</strong>
                    <span>{rate.unit}</span>
                  </div>
                ))}
              </div>
              <ul className="m-price-list" style={{ flex: 1 }}>
                {MANAGED_FEATURES.map((f) => (
                  <li key={f}>
                    <Check size={16} strokeWidth={2.5} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a className="m-btn m-btn-primary" href={APP_URLS.signup}>
                Start free
              </a>
            </article>

            <article className="m-price-card">
              <span className="m-price-tier">Self-hosted</span>
              <div className="m-price-amount">
                <strong>Free</strong>
                <span>forever · open source</span>
              </div>
              <ul className="m-price-list" style={{ flex: 1 }}>
                {SELF_HOST_FEATURES.map((f) => (
                  <li key={f}>
                    <Check size={16} strokeWidth={2.5} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to={"/self-host" as string & {}} className="m-btn m-btn-secondary">
                Self-host now
              </Link>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="m-section">
        <div className="m-container">
          <SectionHeader
            eyebrow="The meter"
            title={
              <>
                Three signals. <GradientText>Three numbers.</GradientText>
              </>
            }
            lede="Everything else, including users, hosts, dashboards, monitors, and the AI SRE, is included."
            align="center"
          />
          <ComparisonTable
            columns={["Signal", "Unit", "Price", "What counts"]}
            highlightColumn={2}
            rows={[
              {
                label: "Logs",
                cells: ["GB", "$0.10 / GB", "Uncompressed bytes ingested via OTLP"],
              },
              {
                label: "Traces",
                cells: ["GB", "$0.10 / GB", "Uncompressed span bytes ingested via OTLP"],
              },
              {
                label: "Metrics",
                cells: ["DPM", "$0.008 / DPM", "Active series reporting once per minute"],
              },
            ]}
          />
        </div>
      </section>

      <section className="m-section m-section--warm">
        <div className="m-container">
          <SectionHeader eyebrow="Common questions" title="Pricing FAQ" align="center" />
          <FAQ items={PRICING_FAQS} />
        </div>
      </section>

      <CTA
        eyebrow="Get started"
        title={
          <>
            One command to onboard. <GradientText>One meter to watch.</GradientText>
          </>
        }
        subtitle="Run optikk onboard to get an API key and OTLP endpoint, point your collector at it, and you're live."
        primary={{ label: "Start free", path: APP_URLS.signup }}
        secondary={{ label: "Explore the CLI", path: "/cli", variant: "secondary" }}
      />
    </>
  );
}
