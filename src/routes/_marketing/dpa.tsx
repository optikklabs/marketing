import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const DPAPageLazy = lazy(() => import("@/features/marketing/pages/DPAPage/DPAPage"));

export const Route = createFileRoute("/_marketing/dpa")({
  component: () => <DPAPageLazy />,
});
