import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { Reveal } from "../motion/Reveal";

interface HeroCta {
  readonly label: string;
  readonly path: string;
  readonly variant?: "primary" | "secondary" | "grad";
}

interface HeroProps {
  readonly eyebrow?: string;
  readonly title: ReactNode;
  readonly subtitle?: ReactNode;
  readonly primaryCta?: HeroCta;
  readonly secondaryCta?: HeroCta;
  readonly meta?: readonly string[];
  readonly visual?: ReactNode;
}

function btnClassFor(variant: HeroCta["variant"]) {
  switch (variant) {
    case "grad":
      return "m-btn m-btn-grad";
    case "secondary":
      return "m-btn m-btn-secondary";
    default:
      return "m-btn m-btn-primary";
  }
}

function HeroLink({ cta }: { readonly cta: HeroCta }) {
  const className = btnClassFor(cta.variant);
  if (cta.path.startsWith("http") || cta.path.includes("#")) {
    return (
      <a className={className} href={cta.path}>
        {cta.label}
        <ArrowRight size={16} />
      </a>
    );
  }
  return (
    <Link to={cta.path as string & {}} className={className}>
      {cta.label}
      <ArrowRight size={16} />
    </Link>
  );
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  meta,
  visual,
}: HeroProps) {
  return (
    <section className="m-hero">
      <div className="m-container">
        <Reveal className="m-hero-inner">
          {eyebrow ? (
            <span className="m-eyebrow">
              <span className="m-eyebrow-dot" />
              {eyebrow}
            </span>
          ) : null}
          <h1 className="m-h1 m-hero-title">{title}</h1>
          {subtitle ? <p className="m-hero-lede m-lede">{subtitle}</p> : null}
          {(primaryCta ?? secondaryCta) ? (
            <div className="m-hero-ctas">
              {primaryCta ? <HeroLink cta={primaryCta} /> : null}
              {secondaryCta ? <HeroLink cta={secondaryCta} /> : null}
            </div>
          ) : null}
          {meta && meta.length > 0 ? (
            <div className="m-hero-meta">
              {meta.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ) : null}
        </Reveal>

        {visual ? (
          <Reveal delay={0.1}>
            <div className="m-hero-art">{visual}</div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
