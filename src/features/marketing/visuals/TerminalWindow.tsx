import type { ReactNode } from "react";

interface TerminalWindowProps {
  readonly title?: string;
  readonly children: ReactNode;
}

/**
 * Static terminal frame for showing real `optikk` CLI sessions in marketing
 * visuals. Pass pre-formatted session text (tabwriter-aligned, `$`-prefixed
 * commands) as children.
 */
export function TerminalWindow({ title = "~ optikk", children }: TerminalWindowProps) {
  return (
    <div className="m-terminal">
      <div className="m-hero-art-bar">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </div>
      <pre className="m-terminal-body">
        <code>{children}</code>
      </pre>
    </div>
  );
}
