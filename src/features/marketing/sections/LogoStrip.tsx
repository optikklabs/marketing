import type { ReactNode } from "react";

interface LogoStripProps {
  readonly label?: string;
  readonly items: readonly { readonly name: string; readonly icon?: ReactNode }[];
}

export function LogoStrip({ label, items }: LogoStripProps) {
  return (
    <section className="m-logos">
      <div className="m-container">
        {label ? <div className="m-logos-label">{label}</div> : null}
        <div className="m-logos-track">
          {items.map((item) => (
            <span key={item.name} className="m-logos-item">
              {item.icon ? item.icon : null}
              {item.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
