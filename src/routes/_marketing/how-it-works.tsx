import { createFileRoute } from "@tanstack/react-router";
import { lazy } from "react";

const HowItWorksPageLazy = lazy(
  () => import("@/features/marketing/pages/HowItWorksPage/HowItWorksPage")
);

export const Route = createFileRoute("/_marketing/how-it-works")({
  component: () => <HowItWorksPageLazy />,
});
