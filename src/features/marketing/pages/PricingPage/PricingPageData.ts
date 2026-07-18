export const PLANS = [
  {
    name: "Launch",
    price: "Starting at $200/month",
    action: "Sign up",
    actionUrl: "signup",
    featured: false,
    sections: [
      { title: "Deployment", items: ["Shared multi-tenant SaaS"] },
      { title: "Security & compliance", items: ["SOC 2 report"] },
      { title: "Support", items: ["Community Discord & email"] },
    ],
  },
  {
    name: "Scale",
    price: "Starting at $1,500/month",
    action: "Sign up",
    actionUrl: "signup",
    featured: true,
    sections: [
      { title: "Deployment", items: ["Shared multi-tenant SaaS"] },
      {
        title: "Security & compliance",
        items: ["SOC 2 report", "GDPR-ready DPA", "ISO 27001", "SAML SSO"],
      },
      {
        title: "Support",
        items: ["Private Slack channel", "8am–5pm PT support (Mon–Fri)"],
      },
    ],
  },
  {
    name: "Enterprise",
    price: "Starting at $9,000/month",
    action: "Contact us",
    actionUrl: "mailto:support@optikk.in",
    featured: false,
    sections: [
      {
        title: "Deployment",
        items: [
          "Shared multi-tenant SaaS",
          "Dedicated single-tenant SaaS",
          "BYOC in your own cloud",
        ],
      },
      {
        title: "Security & compliance",
        items: [
          "SOC 2 report",
          "GDPR-ready DPA",
          "ISO 27001",
          "SAML SSO & RBAC",
          "Audit logs",
          "VPC PrivateLink & VPC peering",
        ],
      },
      {
        title: "Support",
        items: [
          "24/7 on-call engineering",
          "4-hour P1 incident response",
          "99.95% monthly uptime SLA",
          "Dashboard & alert migration",
        ],
      },
    ],
  },
] as const;

export const USAGE_RATES = [
  {
    volume: "≤ 500 GB/day",
    ingestRate: "$0.25 / GB",
    series: "≤ 500K/hour",
    metricsRate: "$1.80 / 1K ATS",
  },
  {
    volume: "≤ 1 TB/day",
    ingestRate: "$0.18 / GB",
    series: "≤ 1M/hour",
    metricsRate: "$1.40 / 1K ATS",
  },
  {
    volume: "≤ 3 TB/day",
    ingestRate: "$0.11 / GB",
    series: "≤ 3M/hour",
    metricsRate: "$1.00 / 1K ATS",
  },
  {
    volume: "≤ 10 TB/day",
    ingestRate: "$0.07 / GB",
    series: "≤ 10M/hour",
    metricsRate: "$0.75 / 1K ATS",
  },
  {
    volume: "> 10 TB/day",
    ingestRate: "$0.04 / GB",
    series: "> 10M/hour",
    metricsRate: "$0.50 / 1K ATS",
  },
] as const;

export const PRICING_FAQS = [
  {
    question: "What counts as a GB for logs and traces?",
    answer:
      "Uncompressed bytes as they arrive at the OTLP endpoint, measured before Optikk's columnar compression. You are never billed for storage amplification, indexes, or replicas.",
  },
  {
    question: "What is an active time series?",
    answer:
      "An active time series (ATS) is a unique metric name and label combination that reports during an hour. Metrics are billed per 1,000 active time series per hour, with lower rates at higher sustained volumes.",
  },
  {
    question: "Is self-hosting really free?",
    answer:
      "Yes. The entire platform, including SAML SSO, clustering, and the AI SRE, is Apache 2.0 licensed with no feature gates. Managed Optikk is the exact same code, just hosted and operated by us.",
  },
  {
    question: "How does billing work?",
    answer:
      "Usage is metered continuously and billed monthly in arrears. Annual plans have a monthly minimum commitment; there are no per-seat or per-host charges.",
  },
  {
    question: "Do you offer volume or enterprise pricing?",
    answer:
      "Yes. For sustained high volumes, custom retention, or dedicated deployments, contact us at support@optikk.in and we'll put together a quote.",
  },
] as const;
