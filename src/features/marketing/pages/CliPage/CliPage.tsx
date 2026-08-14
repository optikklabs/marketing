import type { ReactNode } from "react";

import { APP_URLS } from "@/shared/constants/app";

import { GradientText } from "../../motion/GradientText";
import { Reveal } from "../../motion/Reveal";
import { CTA } from "../../sections/CTA";
import { CodeBlock } from "../../sections/CodeBlock";
import { Hero } from "../../sections/Hero";
import { SectionHeader } from "../../sections/SectionHeader";
import { DashboardMock } from "../../visuals/DashboardMock";
import { Screenshot } from "../../visuals/Screenshot";
import {
  AGENT_TABS,
  FLEET_TABS,
  GET_STARTED_TABS,
  INSTALL_TABS,
  OPERATE_TABS,
  QUERY_TABS,
} from "./CliPageData";
import { CommandReference } from "./CommandReference";

interface CliShot {
  readonly name: Parameters<typeof Screenshot>[0]["name"];
  readonly alt: string;
  readonly mock: Parameters<typeof DashboardMock>[0]["type"];
}

interface CliSectionProps {
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly lede: string;
  readonly tabs: Parameters<typeof CodeBlock>[0]["tabs"];
  readonly warm?: boolean;
  readonly id?: string;
  readonly screenshot?: CliShot;
}

function CliSection({ eyebrow, title, lede, tabs, warm, id, screenshot }: CliSectionProps) {
  return (
    <section className={`m-section${warm ? " m-section--warm" : ""}`} id={id}>
      <div className="m-container">
        <SectionHeader eyebrow={eyebrow} title={title} lede={lede} />
        <Reveal>
          {screenshot ? (
            <div className="m-split">
              <div className="m-split-copy">
                <CodeBlock tabs={tabs} />
              </div>
              <div className="m-split-visual">
                <Screenshot
                  name={screenshot.name}
                  alt={screenshot.alt}
                  bare
                  fallback={<DashboardMock type={screenshot.mock} />}
                />
              </div>
            </div>
          ) : (
            <CodeBlock tabs={tabs} />
          )}
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
        subtitle="Query traces, logs, metrics, services, and LLM costs directly from your terminal. Human-friendly tables for developers, structured JSON for scripts and agents."
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
        lede="Search traces and logs with intuitive query syntax, and run timeseries aggregations across metrics with sub-second response times."
        tabs={QUERY_TABS}
        warm
        screenshot={{
          name: "trace",
          alt: "Optikk trace explorer showing the same checkout trace in the web UI",
          mock: "traces",
        }}
      />

      <CliSection
        eyebrow="Fleet"
        title={
          <>
            RED metrics to <GradientText>Kafka lag</GradientText>, without leaving the shell.
          </>
        }
        lede="Inspect fleet-wide service health, host and pod utilization, and database or Kafka saturation with single commands."
        tabs={FLEET_TABS}
        screenshot={{
          name: "services",
          alt: "Optikk services dashboard with RED metrics for the same fleet in the web UI",
          mock: "metrics",
        }}
      />

      <CliSection
        eyebrow="Operate"
        title={
          <>
            LLM spend, dashboards, monitors <GradientText>as commands.</GradientText>
          </>
        }
        lede="Track model costs by service, manage dashboards as code, and mute, acknowledge, or test monitors directly from the terminal."
        tabs={OPERATE_TABS}
        warm
        screenshot={{
          name: "overview",
          alt: "Optikk overview dashboard rendering the same monitors and cost data in the web UI",
          mock: "metrics",
        }}
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

      <CommandReference />

      <CTA
        eyebrow="Get started"
        title={
          <>
            One curl command. <GradientText>That's the setup.</GradientText>
          </>
        }
        subtitle="Run optikk onboard to get your endpoint and start streaming telemetry in minutes."
        primary={{ label: "Start free", path: APP_URLS.signup }}
        secondary={{ label: "Self-host instead", path: "/self-host", variant: "secondary" }}
      />
    </>
  );
}
