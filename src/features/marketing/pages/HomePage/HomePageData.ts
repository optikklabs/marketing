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
    body: "Logs, metrics, and traces unified in a single columnar database with one query language.",
    link: { label: "See how it works", path: "/how-it-works" },
    variant: "wide" as const,
  },
  {
    icon: Bot,
    title: "AI SRE on call",
    body: "Diagnose regressions and investigate root causes grounded in your telemetry graph.",
    link: { label: "Meet the AI SRE", path: "/features#ai-sre" },
    variant: "ink" as const,
  },
  {
    icon: Terminal,
    title: "Built for coding agents",
    body: "Query every signal from the terminal with JSON schema support for Claude Code, Cursor, and Codex.",
    link: { label: "CLI reference", path: "/cli" },
  },
  {
    icon: Layers,
    title: "OpenTelemetry-native",
    body: "Native OTLP ingestion. Use your existing collectors without proprietary SDKs.",
    link: { label: "OTel quickstart", path: "/opentelemetry" },
  },
  {
    icon: Shield,
    title: "Flexible Deployments",
    body: "Deploy in your VPC, private cloud, or fully air-gapped with zero feature gates.",
    link: { label: "Deployment options", path: "/self-host" },
    variant: "grad" as const,
  },
  {
    icon: Github,
    title: "Open source at the core",
    body: "Ingest, query, and web UI are 100% open source under Apache 2.0.",
    link: { label: "View on GitHub", path: OSS.org },
  },
];
