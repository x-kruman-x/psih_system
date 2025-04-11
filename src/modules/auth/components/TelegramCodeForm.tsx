import { BorderedElement } from "../../../shared/UI/BorderedElement";
import { LoginContainer } from "../ui/LoginContainer";
import { Typography } from "../../../shared/UI/Typography";
import { useQuery } from "@tanstack/react-query";
import { useAuthApi } from "../api/api";
import { authDataType } from "../types/types";
import { useState } from "react";
import { TextLink } from "../../../shared/UI/TextLink";
import { useTimer } from "../hooks/useTimer";
import { toast } from "sonner";

export function TelegramCodeForm() {
  const {messageFromBotQueryOptions, getTokensQueryOptions} = useAuthApi()
  const { timer, isTimerActive, resetTimer } = useTimer(120);
  const [code, setCode] = useState("");

  const { data: authData } = useQuery<authDataType>({
    queryKey: ["auth"],
  });

  const { refetch: refetchMessage } = useQuery({
    ...messageFromBotQueryOptions(
      authData?.enteredLogin ?? "",
      authData?.enteredPassword ?? ""
    ),
    enabled: !!authData,
    refetchOnWindowFocus: false,
  });

  const { error } = useQuery({
    ...getTokensQueryOptions(authData?.enteredLogin ?? "", code),
    enabled: !!code,
    refetchOnWindowFocus: false,
    retry: false,
    refetchOnMount: false,
    gcTime: Infinity
  });

  if (error) {
    console.error(error);
    toast.error('Произошла ошибка при авторизации'); 
  }

  const handleResendCode = () => {
    if (!isTimerActive) {
      refetchMessage();
      resetTimer(120);
      toast.success('Сообщение отправлено'); 
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const enteredCode = formData.get("code")?.toString() ?? "";
    setCode(enteredCode);
  };

  return (
    <LoginContainer>
      <div className="w-full">
        <div className="text-center mb-[26px] flex flex-col">
          <Typography className="mb-[9px]">ДВУХФАКТОРНАЯ АУТЕНТИФИКАЦИЯ</Typography>
          <Typography className="mb-[3px]">мы отправили код на ваш телеграм</Typography>
          <TextLink href="https://t.me/psihsystembot" newTab={true}>
            @PSIHSYSTEMBOT [-]
          </TextLink>
        </div>
        <BorderedElement
          variant="button"
          as="button"
          className="group w-full mb-[29px]"
          disabled={isTimerActive}
          onClick={() => handleResendCode()}
        >
          {isTimerActive ? (
            <p className="text-[13px] leading-[17px]">
              {`${"0" + Math.floor(timer / 60)}:${timer % 60 < 10 ? "0" + (timer % 60) : timer % 60}`}
            </p>
          ) : (
            <Typography>отправить код повторно</Typography>
          )}
        </BorderedElement>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full mb-[9px]">
            <Typography className="mb-[3px]">код</Typography>
            <BorderedElement className="w-full" name="code" />
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
