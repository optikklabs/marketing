import { Bot, Github, Layers, Shield, Terminal, Workflow } from "lucide-react";
import { OSS } from "../../constants";

export const STACK_LOGOS = [
  { name: "OpenTelemetry" },
  { name: "Kafka" },
  { name: "ClickHouse" },
  { name: "MySQL" },
  { name: "Redis" },
  { name: "Kubernetes" },
  { name: "Prometheus" },
  { name: "AWS" },
  { name: "GCP" },
  { name: "Azure" },
];

export const PILLARS = [
  {
    icon: Workflow,
    title: "Unified storage, three signals",
    body: "Logs, metrics, and traces all land in the same high-performance columnar database. One query language, one cache, one place to look.",
    link: { label: "See how it works", path: "/how-it-works" },
    variant: "wide" as const,
  },
  {
    icon: Bot,
    title: "AI SRE on call",
    body: "Ask what changed, which deploy broke prod, or where the latency leaked from the UI or straight from your coding agent's terminal. Answers grounded in your telemetry graph.",
    link: { label: "Meet the AI SRE", path: "/features#ai-sre" },
    variant: "ink" as const,
  },
  {
    icon: Terminal,
    title: "Built for coding agents",
    body: "The optikk CLI covers every signal, self-describes via a JSON schema, and speaks JSON when piped. Claude Code, Cursor, Codex, and Antigravity drive it natively.",
    link: { label: "CLI reference", path: "/cli" },
  },
  {
    icon: Layers,
    title: "OpenTelemetry-native",
    body: "Point your OTLP collector at us. Keep the schema you already have, drop the agent fleet you don't want.",
    link: { label: "OTel quickstart", path: "/opentelemetry" },
  },
  {
    icon: Shield,
    title: "Flexible Deployments",
    body: "Run in your private cloud, VPC, or fully air-gapped. Select the blast radius you can defend, with complete code parity.",
    link: { label: "Deployment options", path: "/self-host" },
    variant: "grad" as const,
  },
  {
    icon: Github,
    title: "Open source at the core",
    body: "Engine, scheduler, and frontend dashboard are Apache 2.0. Self-host the whole stack from public repos with a single helm command.",
    link: { label: "View on GitHub", path: OSS.org },
  },
];
