import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const CliPageLazy = lazy(() => import("@/features/marketing/pages/CliPage/CliPage"));

export const Route = createFileRoute("/_marketing/cli")({
  component: () => <CliPageLazy />,
});
