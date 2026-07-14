export const MANAGED_RATES = [
  { signal: "Logs", price: "$0.10", unit: "per GB ingested" },
  { signal: "Traces", price: "$0.10", unit: "per GB ingested" },
  { signal: "Metrics", price: "$0.008", unit: "per DPM" },
] as const;

export const PRICING_FAQS = [
  {
    question: "What counts as a GB for logs and traces?",
    answer:
      "Uncompressed bytes as they arrive at the OTLP endpoint, measured before Optikk's columnar compression. You are never billed for storage amplification, indexes, or replicas.",
  },
  {
    question: "What is a DPM?",
    answer:
      "A data point per minute: one active metric time series reporting once a minute. A gauge with 10 label combinations reporting every 60 seconds is 10 DPM, billed at $0.008 per DPM per month.",
  },
  {
    question: "Is self-hosting really free?",
    answer:
      "Yes. The entire platform, including SAML SSO, clustering, and the AI SRE, is Apache 2.0 licensed with no feature gates. Managed Optikk is the exact same code, just hosted and operated by us.",
  },
  {
    question: "How does billing work?",
    answer:
      "Usage is metered continuously and billed monthly in arrears. There are no per-seat or per-host charges, no minimum commitment, and you can rotate or revoke your ingest key at any time.",
  },
  {
    question: "Do you offer volume or enterprise pricing?",
    answer:
      "Yes. For sustained high volumes, custom retention, or dedicated deployments, contact us at support@optikk.in and we'll put together a quote.",
  },
] as const;
