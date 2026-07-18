export interface CommandEntry {
  readonly name: string;
  readonly description: string;
}

export interface CommandGroup {
  readonly command: string;
  readonly description: string;
  readonly subcommands?: readonly CommandEntry[];
}

/**
 * The full optikk CLI surface, mirrored from `optikk --help` and each group's
 * `--help`. Kept as data so the reference renders from one source and stays
 * easy to diff against the binary when commands change.
 */
export const COMMAND_GROUPS: readonly CommandGroup[] = [
  {
    command: "onboard",
    description: "Sign up and get your API key + OTLP endpoint in one step.",
  },
  {
    command: "auth",
    description: "Authenticate with the Optikk API.",
    subcommands: [
      { name: "login", description: "Authenticate and cache a session JWT." },
      { name: "logout", description: "Clear cached authentication." },
      { name: "status", description: "Show current authentication status." },
    ],
  },
  {
    command: "config",
    description: "Inspect and switch CLI contexts (kubectl-style).",
    subcommands: [
      { name: "init", description: "Initialize a new CLI context interactively." },
      { name: "get-contexts", description: "List all contexts (current marked with *)." },
      { name: "current-context", description: "Print the active context's name." },
      { name: "use-context", description: "Switch the active context." },
      { name: "set-context", description: "Create or update a context." },
      { name: "delete-context", description: "Delete a context and its cached session." },
      { name: "show", description: "Print the active context." },
      { name: "set", description: "Set one field on a context (api_url, tenant_id)." },
      { name: "unset", description: "Clear one field on a context." },
    ],
  },
  {
    command: "traces",
    description: "Search and inspect distributed traces.",
    subcommands: [
      { name: "search", description: "Search traces by query." },
      { name: "get", description: "Get full trace details." },
      { name: "errors", description: "Show the errors within a trace." },
      { name: "error-path", description: "Show the error propagation path through a trace." },
      { name: "critical-path", description: "Show the critical path through a trace." },
      { name: "service-map", description: "Show the service dependency map for a trace." },
      { name: "related", description: "Show traces sharing a service+operation with a trace." },
      { name: "trend", description: "View trace volume and error trends." },
    ],
  },
  {
    command: "logs",
    description: "Search and inspect logs.",
    subcommands: [
      { name: "search", description: "Search logs by query." },
      { name: "facets", description: "Show facet counts over matching logs." },
      { name: "summary", description: "Show aggregate summary stats over matching logs." },
      { name: "trend", description: "Show the log volume trend over matching logs." },
      { name: "trace", description: "Show all logs for a trace." },
    ],
  },
  {
    command: "metrics",
    description: "List, query, and inspect metrics.",
    subcommands: [
      { name: "list", description: "List available metric names." },
      { name: "query", description: "Execute a metrics timeseries query." },
      { name: "tags", description: "List tags for a metric." },
    ],
  },
  {
    command: "services",
    description: "Inspect the service fleet and dependency topology.",
    subcommands: [
      { name: "list", description: "List RED metrics for every service in the fleet." },
      { name: "summary", description: "Show the RED summary for one service." },
      { name: "errors", description: "List aggregated error groups." },
      { name: "top-endpoints", description: "Show the busiest endpoints across the fleet." },
      { name: "topology", description: "Show the service dependency graph." },
    ],
  },
  {
    command: "infra",
    description: "Inspect host, node, and pod infrastructure.",
    subcommands: [
      { name: "hosts", description: "List host-level saturation and RED metrics." },
      { name: "nodes", description: "List Kubernetes node-level aggregates." },
      { name: "pods", description: "List pod-level RED aggregates." },
      { name: "cpu", description: "Show per-instance CPU utilization." },
      { name: "memory", description: "Show per-instance memory utilization." },
    ],
  },
  {
    command: "saturation",
    description: "Inspect database and Kafka saturation.",
    subcommands: [
      { name: "db-systems", description: "List per-system database saturation summaries." },
      { name: "db-latency", description: "Show database latency by system." },
      { name: "db-ops", description: "Show database operation volume by system." },
      { name: "db-slow-queries", description: "Show slow-query patterns." },
      { name: "kafka-groups", description: "Show consumer-group partitions and lag." },
      { name: "kafka-throughput", description: "Show per-topic Kafka throughput." },
      { name: "kafka-topology", description: "Show the Kafka producer/consumer topology." },
    ],
  },
  {
    command: "errors",
    description: "Investigate error groups.",
    subcommands: [
      { name: "list", description: "List error groups, most frequent first." },
      { name: "get", description: "Show one error group's aggregate detail." },
      { name: "latest", description: "Show a group's most recent occurrence." },
      { name: "timeseries", description: "Show an error group's rate over time." },
      { name: "traces", description: "List trace occurrences of an error group." },
    ],
  },
  {
    command: "llm",
    description: "Inspect LLM/AI observability data.",
    subcommands: [
      { name: "apps", description: "List per-service LLM usage summaries." },
      { name: "cost", description: "Show LLM cost broken down by a dimension." },
      { name: "timeseries", description: "Show an LLM metric timeseries." },
      { name: "traces", description: "Search LLM traces." },
      { name: "trace", description: "Get full detail for one LLM trace." },
    ],
  },
  {
    command: "dashboards",
    description: "Manage dashboards.",
    subcommands: [
      { name: "list", description: "List dashboard pages." },
      { name: "get", description: "Get dashboard page details." },
      { name: "create", description: "Create a new dashboard page." },
      { name: "update", description: "Update a dashboard page." },
      { name: "delete", description: "Delete a dashboard page." },
      { name: "export", description: "Export a dashboard as JSON." },
      { name: "import", description: "Import a dashboard from JSON." },
      { name: "url", description: "Print the web UI URL for a dashboard." },
    ],
  },
  {
    command: "monitors",
    description: "Manage monitors and alerts.",
    subcommands: [
      { name: "list", description: "List monitors." },
      { name: "get", description: "Get monitor details." },
      { name: "create", description: "Create a monitor from a JSON file." },
      { name: "update", description: "Update a monitor from a JSON file." },
      { name: "delete", description: "Delete a monitor." },
      { name: "ack", description: "Acknowledge a triggered monitor." },
      { name: "mute", description: "Mute a monitor for a duration." },
      { name: "unmute", description: "Unmute a monitor." },
      { name: "test", description: "Run a test evaluation of a monitor." },
    ],
  },
  {
    command: "keys",
    description: "Rotate or revoke your tenant's ingest API key.",
    subcommands: [
      { name: "rotate", description: "Issue a fresh API key; the previous key stops working." },
      { name: "revoke", description: "Disable ingest until you rotate a new key." },
    ],
  },
  {
    command: "users",
    description: "Manage your tenant's users.",
    subcommands: [
      { name: "list", description: "List your tenant's users." },
      { name: "add", description: "Add a user to your tenant." },
    ],
  },
  {
    command: "agent",
    description: "AI agent integrations.",
    subcommands: [
      { name: "schema", description: "Emit the CLI command tree as JSON for AI agents." },
      { name: "setup", description: "Install the Optikk agent guide into a project." },
    ],
  },
  {
    command: "verify",
    description: "Check that telemetry is arriving for your tenant.",
  },
  {
    command: "status",
    description: "Check API reachability, your session, and available updates.",
  },
  {
    command: "whoami",
    description: "Show who you are signed in as.",
  },
  {
    command: "open",
    description: "Open the Optikk web app in your browser.",
  },
  {
    command: "docs",
    description: "Open the Optikk documentation.",
  },
  {
    command: "support",
    description: "Open Optikk support.",
  },
  {
    command: "feedback",
    description: "Report a bug or request a feature.",
  },
  {
    command: "update",
    description: "Update optikk to the latest release.",
  },
  {
    command: "completion",
    description: "Generate shell completion scripts.",
  },
  {
    command: "version",
    description: "Print build version information.",
  },
];
