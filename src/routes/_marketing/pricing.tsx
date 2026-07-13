import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const PricingPageLazy = lazy(() => import("@/features/marketing/pages/PricingPage/PricingPage"));

export const Route = createFileRoute("/_marketing/pricing")({
  component: () => <PricingPageLazy />,
});
