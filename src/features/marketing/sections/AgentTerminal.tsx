import { Bot, Braces, SquareTerminal, Workflow } from "lucide-react";

import { GradientText } from "../motion/GradientText";
import { CodeBlock } from "./CodeBlock";
import { FeatureGrid } from "./FeatureGrid";
import { SectionHeader } from "./SectionHeader";

const CLAUDE_CODE_SESSION = `> why is checkout erroring since the last deploy?

⏺ Bash(optikk traces search -q "service:checkout status:error" --from 1h)
  ⎿ 41 traces · POST /api/v2/checkout · p99 2.4s (baseline 310ms)

⏺ Bash(optikk traces critical-path 9f3c21ab)
  ⎿ checkout → payment-svc → mysql SELECT … FOR UPDATE (1.9s 81%)

⏺ Bash(optikk services summary --service payment-svc)
  ⎿ error rate 4.2% since 14:02 · p95 +6x

⏺ Root cause: lock contention in payment-svc introduced by the 14:02
  deploy abc12d. Rolling back restores p99; longer term, index
  orders.tenant_id.`;

const CURSOR_SESSION = `You: our error budget alert fired. What changed?

Agent: Checking fleet health first.
$ optikk services list --from 1h
  api ✓ · checkout ✗ 4.1% errors · payment-svc ✗ 3.8% errors

$ optikk services errors --service checkout --limit 5
  1. mysql: Lock wait timeout exceeded (312 events)

$ optikk logs search -q "severity_text:ERROR service_name:payment-svc" --from 30m
  "Lock wait timeout exceeded; try restarting transaction"

Agent: checkout and payment-svc are failing on MySQL lock waits that
started 14:02, which matches the payment-svc deploy. Recommend rollback.`;

const CODEX_SESSION = `user: is the p99 regression real or just one tenant?

codex: optikk metrics query --metric http.server.duration \\
         --aggregation p99 --group-by service --from 3h
  → checkout p99 step-change at 14:02, all other services flat

codex: optikk traces trend -q "service:checkout" --from 3h
  → error volume up 12x from 14:02, spread across tenants

codex: Real regression, fleet-wide on checkout, started 14:02.
  Not tenant-specific, but correlates with the payment-svc rollout.`;

const ANTIGRAVITY_SESSION = `» summarize LLM spend this week and flag anomalies

$ optikk llm cost --group-by model --from 168h
  claude-opus-4-8   $412.10   ▲ 61% week over week
  gpt-5             $118.42   ▬ flat

$ optikk llm apps --from 168h
  support-bot: 9.2M tokens (▲ 3x) · retry loop suspected

$ optikk llm trace 41c9d0aa
  → 14 sequential tool-call retries on timeout, no backoff

» support-bot is retrying failed tool calls without backoff:
  that's the spend spike. Patch suggested in retry_policy.py.`;

const AGENT_PILLARS = [
  {
    icon: SquareTerminal,
    title: "One CLI, every signal",
    body: "Query traces, logs, metrics, infra, and LLM costs directly from the terminal.",
    link: { label: "CLI reference", path: "/cli" },
    variant: "wide" as const,
  },
  {
    icon: Braces,
    title: "Agent-readable by design",
    body: "The CLI emits its command schema as JSON for seamless LLM tool use.",
    variant: "ink" as const,
  },
  {
    icon: Workflow,
    title: "JSON when piped",
    body: "Terminal gets formatted tables; standard pipes receive structured JSON automatically.",
  },
  {
    icon: Bot,
    title: "--agent mode",
    body: "Forces non-interactive JSON responses for autonomous agent workflows.",
  },
];

export function AgentTerminal() {
  return (
    <section className="m-section m-section--warm" id="cli-native">
      <div className="m-container">
        <SectionHeader
          eyebrow="CLI-native"
          title={
            <>
              Your coding agent is <GradientText>already an SRE.</GradientText>
            </>
          }
          lede="Every query, dashboard, and monitor is reachable via the CLI for human engineers and AI coding agents."
        />
        <CodeBlock
          tabs={[
            { label: "Claude Code", content: CLAUDE_CODE_SESSION },
            { label: "Cursor", content: CURSOR_SESSION },
            { label: "Codex", content: CODEX_SESSION },
            { label: "Antigravity", content: ANTIGRAVITY_SESSION },
          ]}
        />
        <div style={{ height: 28 }} />
        <FeatureGrid items={AGENT_PILLARS} />
      </div>
    </section>
  );
}
