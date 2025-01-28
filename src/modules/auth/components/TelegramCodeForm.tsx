import { BorderedElement } from "../../../shared/UI/BorderedElement";
import { LoginContainer } from "../ui/LoginContainer";
import { Text } from "../../../shared/UI/Text";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/api";
import { authDataType } from "../types/types";
import { useState } from "react";
import { TextLink } from "../../../shared/UI/TextLink";
import { useTimer } from "../hooks/useTimer";

export function TelegramCodeForm() {
  const { timer, isTimerActive, resetTimer } = useTimer(120);
  const [code, setCode] = useState("");

  const { data: authData } = useQuery<authDataType>({
    queryKey: ["auth"],
  });

  //TODO: сделать уведомление об отправке сообщения и ошибке
  const { refetch: refetchMessage } = useQuery({
    ...authApi.messageFromBotQueryOptions(
      authData?.enteredLogin ?? "",
      authData?.enteredPassword ?? ""
    ),
    enabled: !!authData,
    refetchOnWindowFocus: false,
  });

  const { error } = useQuery({
    ...authApi.getTokensQueryOptions(authData?.enteredLogin ?? "", code),
    enabled: !!code,
    refetchOnWindowFocus: false,
    retry: false
  });

  if (error) {
    console.error(error)
  }

  const handleResendCode = () => {
    if (!isTimerActive) {
      refetchMessage();
      resetTimer(120);
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
          <Text className="mb-[9px]">ДВУХФАКТОРНАЯ АУТЕНТИФИКАЦИЯ</Text>
          <Text className="mb-[3px]">мы отправили код на ваш телеграм</Text>
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
            <Text>отправить код повторно</Text>
          )}
        </BorderedElement>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full mb-[9px]">
            <Text className="mb-[3px]">код</Text>
            <BorderedElement className="w-full" name="code" />
          </div>
          <BorderedElement
            variant="button"
            as="button"
            className="group w-full hover:bg-black hover:transition hover:duration-150"
          >
            <Text className="group-hover:text-white hover:transition hover:duration-150">
              ок
            </Text>
          </BorderedElement>
        </form>
      </div>
    </LoginContainer>
  );
}
