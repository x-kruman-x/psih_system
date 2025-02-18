import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./shared/config/tailwind-css/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { routeTree } from "./routeTree.gen";
import { refreshToken } from "./modules/auth/api/api";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

if (localStorage.getItem("access_token")) {
  await refreshToken();
  const keysWithInfiniteGcTime = ["auth", "isFilterOpen"];

  keysWithInfiniteGcTime.forEach((key) => {
    queryClient.setQueryDefaults([key], { gcTime: Infinity });
  });

  queryClient.setQueryData(["auth"], { isAuth: true });
  queryClient.setQueryData(["isFilterOpen"], { isFilterOpen: false });
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
}
