import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_warehouse/remains")({
  component: RouteComponent,
});

function RouteComponent() {
  return <h1 className="text-3xl font-bold underline">Остатки</h1>;
}
