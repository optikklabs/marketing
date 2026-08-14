import { Link } from "@tanstack/react-router";
import { Github, Linkedin } from "lucide-react";

import { OptikkLogo } from "@/shared/components/brand/OptikkLogo";

import { OSS } from "../constants";

const FOOTER_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Platform", path: "/features" },
      { label: "CLI", path: "/cli" },
      { label: "Pricing", path: "/pricing" },
      { label: "How it works", path: "/how-it-works" },
      { label: "Self-host", path: "/self-host" },
    ],
  },
  {
    title: "Open source",
    links: [
      { label: "Web · web", path: OSS.web },
      { label: "Ingest · ingest", path: OSS.ingest },
      { label: "Query · query", path: OSS.query },
      { label: "CLI · optikk", path: OSS.cli },
      { label: "All repos", path: OSS.org },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "OpenTelemetry", path: "/opentelemetry" },
      { label: "Architecture", path: "/architecture" },
      { label: "Docs", path: "https://docs.optikk.dev" },
      { label: "Status", path: "https://status.optikk.dev" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Support", path: "/support" },
      { label: "Contact", path: "mailto:support@optikk.in" },
      { label: "Privacy", path: "/privacy" },
      { label: "Terms", path: "/terms" },
      { label: "DPA", path: "/dpa" },
      { label: "Security", path: "/security" },
    ],
  },
] as const;

function FooterLink({ label, path }: { readonly label: string; readonly path: string }) {
  if (path.startsWith("http") || path.startsWith("mailto:") || path.includes("#")) {
    return (
      <a
        href={path}
        target={path.startsWith("http") ? "_blank" : undefined}
        rel={path.startsWith("http") ? "noreferrer" : undefined}
      >
        {label}
      </a>
    );
  }
  return <Link to={path as string & {}}>{label}</Link>;
}

export function Footer() {
  return (
    <footer className="m-footer">
      <div className="m-container m-footer-grid">
        <div className="m-footer-brand">
          <Link to={"/" as string & {}} className="m-brand" aria-label="Optikk home">
            <OptikkLogo size={28} />
            <span>Optikk</span>
          </Link>
          <p>
            Unified telemetry platform for logs, metrics, and traces. Open source under Apache 2.0.
          </p>
        </div>

        {FOOTER_GROUPS.map((group) => (
          <div key={group.title}>
            <div className="m-footer-heading">{group.title}</div>
            <ul className="m-footer-list">
              {group.links.map((link) => (
                <li key={link.path + link.label}>
                  <FooterLink label={link.label} path={link.path} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="m-container m-footer-bottom">
        <span>
          © {new Date().getFullYear()} Optikk, Inc. · {OSS.license} licensed ·
          <a
            href={OSS.web}
            target="_blank"
            rel="noreferrer"
            style={{ color: "inherit", marginLeft: 6, textDecoration: "underline" }}
          >
            optikklabs/web
          </a>
        </span>
        <div className="m-footer-socials">
          <a href={OSS.org} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/company/optikk"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
