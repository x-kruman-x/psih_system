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
  component: () => {
    return (
      <>
        <div className="absolute left-5 top-[6px] bg-black rounded-md p-2 text-white text-[13px] z-40">beta 0.0.1</div>
        <Navigate to="/orders" />
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
      </div>
    );
  },
});


