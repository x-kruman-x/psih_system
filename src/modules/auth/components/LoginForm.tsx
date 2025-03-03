import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginContainer } from "../ui/LoginContainer";
import { Typography } from "../../../shared/UI/Text";
import { BorderedElement } from "../../../shared/UI/BorderedElement";
import { useAuthApi } from "../api/api";
import { toast } from "sonner";

export function LoginForm() {
  const queryClient = useQueryClient()
  const {validateLoginQueryOptions} = useAuthApi()
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [enabled, setEnabled] = useState(false);

  const { error } = useQuery({
    ...validateLoginQueryOptions(login, password),
    enabled: enabled, 
    retry: false,
  });

  if (error) {
    console.error(error);
    toast.error('Произошла ошибка при авторизации'); 
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const enteredLogin = formData.get("login")?.toString() ?? "";
    const enteredPassword = formData.get("password")?.toString() ?? "";

    queryClient.setQueryData(['auth'], { enteredLogin, enteredPassword });

    setLogin(enteredLogin);
    setPassword(enteredPassword);
    setEnabled(true)
  };

  return (
    <LoginContainer>
      <div className="w-full">
        <div className="text-center mb-[26px]">
          <Typography>ВХОД</Typography>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full">
            <Typography className="mb-[3px]">логин</Typography>
            <BorderedElement className="w-full" name="login" />
          </div>
          <div className="w-full mb-[29px]">
            <Typography className="mb-[3px]">пароль</Typography>
            <BorderedElement
              className="w-full"
              type="password"
              name="password"
            />
          </div>
          <BorderedElement
            variant="button"
            as="button"
            className="group w-full hover:bg-black hover:transition hover:duration-150"
          >
            <Typography className="group-hover:text-white hover:transition hover:duration-150">
              ок
            </Typography>
          </BorderedElement>
        </form>
      </div>
    </LoginContainer>
  );
}