import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_warehouse")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to='/orders' className="[&.active]:font-bold">
          orders
        </Link>{' '}
        <Link to='/products' className="[&.active]:font-bold">
          products
        </Link>{' '}
        <Link to='/remains' className="[&.active]:font-bold">
          remains
        </Link>{' '}
        <Link to='/parties' className="[&.active]:font-bold">
          parties
        </Link>{' '}
      </div>
      <Outlet />
    </>
  );
}
