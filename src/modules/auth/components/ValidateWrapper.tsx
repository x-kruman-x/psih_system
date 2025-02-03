import { useQuery } from "@tanstack/react-query";
import { LoginForm } from "./LoginForm";
import { useAuthApi } from "../api/api";
import { TelegramCodeForm } from "./TelegramCodeForm";
import { authDataType } from "../types/types";

export function ValidateWrapper() {
   const {validateLoginQueryOptions} = useAuthApi()

    const { data: authData } = useQuery<authDataType>({
        queryKey: ["auth"],
        enabled: false,
    });

    const { data: isValidated } = useQuery({
        ...validateLoginQueryOptions(
            authData?.enteredLogin ?? "",
            authData?.enteredPassword ?? ""
        ),
        enabled: !!authData, 
    });

    return (
        <>
            {!isValidated ? <LoginForm/> : <TelegramCodeForm/>}
        </>
    )
}

