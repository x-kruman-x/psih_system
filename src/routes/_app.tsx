import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AppNavigation } from "../modules/app-navigation/AppNavigation";
import { AuthData } from "../modules/auth/types/types";

export const Route = createFileRoute("/_app")({
  beforeLoad: ({ context: { queryClient }, location }) => {
    console.log(queryClient.getQueryData<AuthData>(["auth"])?.isAuth);
    if (queryClient.getQueryData<AuthData>(["auth"])?.isAuth != true) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AppNavigation />
      <Outlet />
    </>
  );
}
