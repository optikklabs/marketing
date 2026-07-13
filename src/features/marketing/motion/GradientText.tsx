import type { ReactNode } from "react";

interface GradientTextProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export function GradientText({ children, className }: GradientTextProps) {
  return (
    <span className={["m-grad-text", className ?? ""].filter(Boolean).join(" ")}>{children}</span>
  );
}
