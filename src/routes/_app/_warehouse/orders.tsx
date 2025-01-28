import { createFileRoute } from "@tanstack/react-router";
import { Table } from "../../../modules/tables/Table";

export const Route = createFileRoute("/_app/_warehouse/orders")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <p className="border border-black">заказы</p>
      {/* {import.meta.env.VITE_API_BASE_URL} */}
      <Table />
    </div>
  );
}
