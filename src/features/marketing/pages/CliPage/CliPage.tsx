import type { ReactNode } from "react";

import { APP_URLS } from "@/shared/constants/app";

import { GradientText } from "../../motion/GradientText";
import { Reveal } from "../../motion/Reveal";
import { CTA } from "../../sections/CTA";
import { CodeBlock } from "../../sections/CodeBlock";
import { Hero } from "../../sections/Hero";
import { SectionHeader } from "../../sections/SectionHeader";
import {
  AGENT_TABS,
  FLEET_TABS,
  GET_STARTED_TABS,
  INSTALL_TABS,
  OPERATE_TABS,
  QUERY_TABS,
} from "./CliPageData";

interface CliSectionProps {
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly lede: string;
  readonly tabs: Parameters<typeof CodeBlock>[0]["tabs"];
  readonly warm?: boolean;
  readonly id?: string;
}

function CliSection({ eyebrow, title, lede, tabs, warm, id }: CliSectionProps) {
  return (
    <section className={`m-section${warm ? " m-section--warm" : ""}`} id={id}>
      <div className="m-container">
        <SectionHeader eyebrow={eyebrow} title={title} lede={lede} />
        <Reveal>
          <CodeBlock tabs={tabs} />
        </Reveal>
      </div>
    </section>
  );
}

export default function CliPage() {
  return (
    <>
      <Hero
        eyebrow="optikk CLI"
        title={
          <>
            The whole platform, <GradientText>one binary.</GradientText>
          </>
        }
        subtitle="Traces, logs, metrics, services, infra, LLM cost, dashboards, and monitors. Every capability of Optikk is a command. Human-friendly tables in your terminal, JSON for your scripts and agents."
        primaryCta={{ label: "Start free", path: APP_URLS.signup }}
        secondaryCta={{ label: "See pricing", path: "/pricing", variant: "secondary" }}
        meta={["Single static binary", "macOS + Linux", "Datadog-style query DSL"]}
      />

      <CliSection
        eyebrow="Install"
        title={
          <>
            Install in <GradientText>one command.</GradientText>
          </>
        }
        lede="Static binaries for macOS and Linux, amd64 and arm64. No runtime, no dependencies."
        tabs={INSTALL_TABS}
        warm
      />

      <CliSection
        eyebrow="Get started"
        title={
          <>
            From zero to first trace <GradientText>in minutes.</GradientText>
          </>
        }
        lede="One command creates your account and prints the OTLP endpoint and API key for your collector. Contexts work like kubectl, so the same CLI drives managed and self-hosted deployments."
        tabs={GET_STARTED_TABS}
      />

      <CliSection
        id="query"
        eyebrow="Query"
        title={
          <>
            Three signals, <GradientText>one query DSL.</GradientText>
          </>
        }
        lede="Search traces and logs with the same service:api status:error syntax the UI uses, and run timeseries aggregations over any metric."
        tabs={QUERY_TABS}
        warm
      />

      <CliSection
        eyebrow="Fleet"
        title={
          <>
            RED metrics to <GradientText>Kafka lag</GradientText>, without leaving the shell.
          </>
        }
        lede="Fleet-wide service health, host and pod utilization, and database or Kafka saturation are each one table away."
        tabs={FLEET_TABS}
      />

      <CliSection
        eyebrow="Operate"
        title={
          <>
            LLM spend, dashboards, monitors <GradientText>as commands.</GradientText>
          </>
        }
        lede="Track model cost by service, move dashboards through git as JSON, and mute, ack, or test monitors mid-incident."
        tabs={OPERATE_TABS}
        warm
      />

      <CliSection
        id="agents"
        eyebrow="Built for agents"
        title={
          <>
            Machine-readable <GradientText>by default.</GradientText>
          </>
        }
        lede="Claude Code, Cursor, Codex, and Antigravity drive optikk natively: the CLI self-describes as JSON, piped output is JSON automatically, and --agent mode removes interactive prompts."
        tabs={AGENT_TABS}
      />

      <CTA
        eyebrow="Get started"
        title={
          <>
            One curl command. <GradientText>That's the setup.</GradientText>
          </>
        }
        subtitle="Sign up, run optikk onboard, and point your OpenTelemetry collector at the endpoint it prints."
        primary={{ label: "Start free", path: APP_URLS.signup }}
        secondary={{ label: "Self-host instead", path: "/self-host", variant: "secondary" }}
      />
    </>
  );
}
