import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const SupportPageLazy = lazy(() => import("@/features/marketing/pages/SupportPage/SupportPage"));

export const Route = createFileRoute("/_marketing/support")({
  component: () => <SupportPageLazy />,
});
