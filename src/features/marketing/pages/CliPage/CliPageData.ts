export const INSTALL_TABS = [
  {
    label: "curl",
    content: `# macOS & Linux (amd64 / arm64), installs to /usr/local/bin,
# verifies the release checksum
curl -fsSL https://optikk.in/install.sh | sh`,
  },
  {
    label: "Binary",
    content: `# Static binaries for macOS and Linux (amd64 / arm64)
# from GitHub Releases:
#   optikk_<version>_<os>_<arch>.tar.gz
tar -xzf optikk_*_darwin_arm64.tar.gz
mv optikk /usr/local/bin/`,
  },
] as const;

export const GET_STARTED_TABS = [
  {
    label: "onboard",
    content: `$ optikk onboard --org "Acme Platform"

✓ Account created for tenant Acme Platform (id 42)
Point your OpenTelemetry SDK at Optikk:
  OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.optikk.in:18317
  OTEL_EXPORTER_OTLP_HEADERS=x-api-key=c3448fae-9d21-4f0e-…`,
  },
  {
    label: "login",
    content: `# Browser-based device authorization (existing accounts)
optikk login

# Or password login
optikk auth login --email user@example.com`,
  },
  {
    label: "config",
    content: `# Contexts work like kubectl: point the CLI at any deployment
optikk config init                # interactive; default https://api.optikk.in
optikk config set-context prod --api-url https://api.optikk.in
optikk config use-context prod
optikk config get-contexts`,
  },
] as const;

export const QUERY_TABS = [
  {
    label: "traces",
    content: `$ optikk traces search -q "service:checkout status:error" --from 1h --limit 3

TRACE ID          SERVICE   OPERATION              STATUS  DURATION  SPANS  TIME
9f3c21ab44d0e817  checkout  POST /api/v2/checkout  error   2.41s     47     14:23:51
b82fe0c1a9d34771  checkout  POST /api/v2/checkout  error   2.18s     45     14:23:47
04d7c9ee52b1f3a0  checkout  POST /api/v2/checkout  error   1.97s     44     14:23:40

# dig into one trace:
#   optikk traces get | critical-path | error-path | service-map <traceId>
# volume and error trends:
#   optikk traces trend -q "service:checkout" --from 3h`,
  },
  {
    label: "logs",
    content: `$ optikk logs search -q "severity_text:ERROR service_name:payment-svc" --from 15m --limit 3

TIMESTAMP                SERVICE      SEVERITY  BODY
2026-07-13T14:23:51.412  payment-svc  ERROR     Lock wait timeout exceeded; try restarting transaction
2026-07-13T14:23:47.098  payment-svc  ERROR     Lock wait timeout exceeded; try restarting transaction
2026-07-13T14:23:40.771  payment-svc  ERROR     rolling back txn 8af14b due to lock wait timeout

# aggregate views over matching logs:
#   optikk logs facets | summary | trend -q "severity_text:ERROR" --from 1h`,
  },
  {
    label: "metrics",
    content: `$ optikk metrics list --from 1h --search cpu

NAME                    TYPE   UNIT  DESCRIPTION
system.cpu.usage        gauge  %     Host CPU utilization
container.cpu.time      sum    s     Cumulative container CPU time
process.cpu.utilization gauge  1     Process CPU share of host

# query a timeseries as JSON (avg/sum/min/max/count/p50/p95/p99/rate):
#   optikk metrics query --metric system.cpu.usage \\
#     --aggregation p95 --from 1h --group-by host
# inspect a metric's tags:  optikk metrics tags system.cpu.usage --from 1h`,
  },
] as const;

export const FLEET_TABS = [
  {
    label: "services",
    content: `$ optikk services list --from 1h

SERVICE      REQUESTS  ERRORS  AVG ms  P95 ms  P99 ms
api-gateway  182304    21      38.2    91.4    142.7
checkout     41889     1743    112.9   840.1   2410.3
payment-svc  40112     1502    96.5    712.8   1988.4
inventory    78451     3       22.1    54.9    88.0

# one service in depth:
#   optikk services summary | errors | top-endpoints --service checkout
# dependency graph:  optikk services topology --service checkout --from 1h`,
  },
  {
    label: "infra",
    content: `$ optikk infra hosts --from 1h

HOST          CPU%  MEM%  DISK%  SATURATION  STATUS
prod-node-1   62.4  71.8  48.2   0.71        ok
prod-node-2   88.9  92.3  51.7   0.93        hot
prod-node-3   41.2  55.0  46.9   0.52        ok

# nodes, pods, and per-instance utilization:
#   optikk infra nodes | pods | cpu | memory`,
  },
  {
    label: "saturation",
    content: `$ optikk saturation db-systems --from 1h

SYSTEM  CATEGORY    QUERIES  AVG ms  P95 ms  ERR%  CONNS
mysql   relational  184220   4.8     41.2    0.9   112
redis   cache       912400   0.4     1.1     0.0   64

# slow queries, latency, and op mix:
#   optikk saturation db-latency | db-slow-queries | db-ops
# Kafka:  optikk saturation kafka-topology | kafka-throughput | kafka-groups`,
  },
] as const;

export const OPERATE_TABS = [
  {
    label: "llm",
    content: `$ optikk llm apps --from 1h

SERVICE      VENDOR     MODEL              SPANS  ERR%  P95 ms  IN TOK   OUT TOK  COST $
support-bot  anthropic  claude-opus-4-8    1204   0.4   2810    9214k    488k     41.20
search-rank  openai     gpt-5              3811   0.1   940     1102k    64k      6.48

# cost by model / service / vendor:  optikk llm cost --group-by model --from 1h
# spend timeseries and traces:  optikk llm timeseries --metric spend
#                               optikk llm trace <traceId>`,
  },
  {
    label: "dashboards & monitors",
    content: `$ optikk monitors list --status triggered

ID  NAME                      TYPE    STATUS     PRIORITY  MUTED
12  checkout p99 > 800ms      metric  triggered  P1        no
27  payment-svc error rate    apm     triggered  P2        no

# mute, ack, or test mid-incident:
#   optikk monitors mute 12 --duration 1h && optikk monitors ack 12
# dashboards as data (ID NAME TAGS UPDATED):
#   optikk dashboards list --search api
#   optikk dashboards export 3 -o dashboard.json && optikk dashboards import -f dashboard.json`,
  },
  {
    label: "keys",
    content: `# Rotate the tenant ingest key; the old key stops working
optikk keys rotate

# Kill ingest until a new key is rotated
optikk keys revoke --yes

# Session status
optikk auth status`,
  },
] as const;

export const AGENT_TABS = [
  {
    label: "agent schema",
    content: `$ optikk agent schema

{
  "version": "1.0",
  "commands": [
    { "use": "traces search",
      "short": "Search traces with the query DSL",
      "flags": [{ "name": "query", "shorthand": "q", … }, …] },
    { "use": "services list", "short": "RED metrics for every service", … },
    …
  ]
}

# the whole command tree as JSON so agents discover every
# command, flag, and example in one call`,
  },
  {
    label: "--agent mode",
    content: `# One flag: JSON output + no confirmation prompts,
# so unattended agents can operate safely
optikk --agent monitors list --status triggered
optikk --agent dashboards delete 3`,
  },
  {
    label: "pipes & env",
    content: `# TTY gets tables; pipes get JSON automatically
optikk services list --from 1h | jq '.[].service'

# Script-friendly configuration
export OPTIKK_API_URL=https://api.optikk.in
export OPTIKK_TOKEN=<session-jwt>
export OPTIKK_TENANT_ID=<tenant>
export OPTIKK_OUTPUT=json`,
  },
] as const;
