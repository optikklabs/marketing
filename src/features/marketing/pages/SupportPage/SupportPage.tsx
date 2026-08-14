import { GradientText } from "../../motion/GradientText";
import { CTA } from "../../sections/CTA";
import { ComparisonTable } from "../../sections/ComparisonTable";
import { Hero } from "../../sections/Hero";
import { SectionHeader } from "../../sections/SectionHeader";

const SUPPORT_EMAIL = "support@optikk.in";

export default function SupportPage() {
  return (
    <>
      <Hero
        eyebrow="Support"
        title={
          <>
            We&apos;re here when telemetry <GradientText>doesn&apos;t line up.</GradientText>
          </>
        }
        subtitle="Direct engineering support with defined response targets based on severity. No ticket portals or phone trees."
        primaryCta={{ label: "Email support", path: `mailto:${SUPPORT_EMAIL}` }}
        secondaryCta={{ label: "Read the docs", path: "/opentelemetry", variant: "secondary" }}
      />

      <section className="m-section m-section--tight">
        <div className="m-container">
          <SectionHeader
            eyebrow="How to reach us"
            title={
              <>
                One inbox. <GradientText>Every question.</GradientText>
              </>
            }
            lede={
              <>
                Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> for incidents,
                billing, onboarding, or instrumentation assistance.
              </>
            }
            align="center"
          />
        </div>
      </section>

      <section className="m-section">
        <div className="m-container">
          <SectionHeader
            eyebrow="Response targets"
            title="Severity and response times"
            lede="Targets are for our first response. Resolution time depends on the issue; we keep you updated until it's closed."
            align="center"
          />
          <ComparisonTable
            columns={["Severity", "Definition", "First response"]}
            highlightColumn={2}
            rows={[
              {
                label: "S1 — Critical",
                cells: ["Platform down or telemetry loss", "1 business hour"],
              },
              {
                label: "S2 — Major",
                cells: ["Major feature broken, no workaround", "4 business hours"],
              },
              {
                label: "S3 — Minor",
                cells: ["Degraded or partial issue with a workaround", "1 business day"],
              },
              {
                label: "S4 — Question",
                cells: ["General question or feature request", "2 business days"],
              },
            ]}
          />
        </div>
      </section>

      <CTA
        eyebrow="Enterprise"
        title={
          <>
            Need an uptime SLA? <GradientText>Let&apos;s talk.</GradientText>
          </>
        }
        subtitle="Priority support with contractual response and uptime commitments is available on Enterprise plans."
        primary={{ label: "Contact us", path: `mailto:${SUPPORT_EMAIL}` }}
        secondary={{ label: "See pricing", path: "/pricing", variant: "secondary" }}
      />
    </>
  );
}
