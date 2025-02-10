import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Navigate,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: () => (
    <>
      {/* TODO: разобраться с навигацией */}
      {/* <Navigate to="/orders" /> */}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
      </div>
    );
  },
});
