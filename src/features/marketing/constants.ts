export const OSS = {
  org: "https://github.com/optikklabs",
  web: "https://github.com/optikklabs/web",
  ingest: "https://github.com/optikklabs/ingest",
  query: "https://github.com/optikklabs/query",
  cli: "https://github.com/optikklabs/optikk",
  frontend: "https://github.com/optikklabs/web",
  backend: "https://github.com/optikklabs/query",
  license: "Apache 2.0",
} as const;

export function formatStars(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return `${k.toFixed(k < 10 ? 1 : 0).replace(/\.0$/, "")}k`;
  }
  return n.toString();
}
