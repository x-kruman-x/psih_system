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
  // defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// TODO!: при неправильном токене все равно пропускает в таблицу, а при обновлении страницы уже на логин перебрасывает
async () => {
  try {
    if (localStorage.getItem("access_token")) {
      await refreshToken();
      const keysWithInfiniteGcTime = [
        "auth",
        "isFilter",
        "isFilteredTableFilter",
      ];

      keysWithInfiniteGcTime.forEach((key) => {
        queryClient.setQueryDefaults([key], { gcTime: Infinity });
      });

      queryClient.setQueryData(["auth"], { isAuth: true });
      queryClient.setQueryData(["isFilter"], { isFilterOpen: false });
      queryClient.setQueryData(["isFilteredTableFilter"], {
        isFilteredTableFilterOpen: false,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <AuthGuard /> */}
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    // </StrictMode>
  );
}
