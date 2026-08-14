import { Check } from "lucide-react";

import { APP_URLS } from "@/shared/constants/app";

import { GradientText } from "../../motion/GradientText";
import { Reveal } from "../../motion/Reveal";
import { CTA } from "../../sections/CTA";
import { ComparisonTable } from "../../sections/ComparisonTable";
import { FAQ } from "../../sections/FAQ";
import { Hero } from "../../sections/Hero";
import { SectionHeader } from "../../sections/SectionHeader";
import { PLANS, PRICING_FAQS, USAGE_RATES } from "./PricingPageData";

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
        subtitle="Transparent usage-based pricing for every stage. Pay only for what you ingest with no per-seat or per-host fees."
        primaryCta={{ label: "Start free", path: APP_URLS.signup }}
        secondaryCta={{ label: "Self-host now", path: "/self-host", variant: "secondary" }}
      />

      <section className="m-section m-section--tight">
        <div className="m-container">
          <Reveal className="m-price-grid">
            {PLANS.map((plan) => (
              <article
                key={plan.name}
                className={`m-price-card${plan.featured ? " is-featured" : ""}`}
              >
                {plan.featured && <span className="m-price-badge">Most popular</span>}
                <span className="m-price-tier">{plan.name}</span>
                <div className="m-price-plan-amount">{plan.price}</div>
                <div className="m-price-plan-details">
                  {plan.sections.map((section) => (
                    <div key={section.title} className="m-price-plan-section">
                      <h3>{section.title}</h3>
                      <ul className="m-price-list">
                        {section.items.map((item) => (
                          <li key={item}>
                            <Check size={16} strokeWidth={2.5} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <a
                  className={`m-btn ${plan.featured ? "m-btn-primary" : "m-btn-secondary"}`}
                  href={plan.actionUrl === "signup" ? APP_URLS.signup : plan.actionUrl}
                >
                  {plan.action}
                </a>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="m-section">
        <div className="m-container">
          <SectionHeader
            eyebrow="Usage rates"
            title={
              <>
                More telemetry. <GradientText>Lower unit rates.</GradientText>
              </>
            }
            lede="Logs, traces, and profiles share one ingestion meter. Metrics are billed per active time series."
            align="center"
          />
          <ComparisonTable
            columns={["Daily logs, traces & profiles", "Rate", "Active time series / hour", "Rate"]}
            highlightColumn={1}
            rows={USAGE_RATES.map((tier) => ({
              label: tier.volume,
              cells: [tier.ingestRate, tier.series, tier.metricsRate],
            }))}
          />
          <p className="m-pricing-note">
            30 days of retention is included. Extra retention is billed at $0.001 per GB-month.
          </p>
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
        subtitle="Run optikk onboard to get an API key and OTLP endpoint, point your collector at it, and you're live in minutes."
        primary={{ label: "Start free", path: APP_URLS.signup }}
        secondary={{ label: "Explore the CLI", path: "/cli", variant: "secondary" }}
      />
    </>
  );
}
