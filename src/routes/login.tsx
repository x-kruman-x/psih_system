import { createFileRoute, redirect } from "@tanstack/react-router";
import { ValidateWrapper } from "../modules/auth/components/ValidateWrapper";
import { AuthData } from "../modules/auth/types/types";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ context: { queryClient } }) => {
    if (queryClient.getQueryData<AuthData>(["auth"])?.isAuth === true) {
      throw redirect({ to: "/orders" });
    }
  },
  component: Login,
});

function Login() {
  return <ValidateWrapper />;
}
