import { useQuery } from "@tanstack/react-query";
import { LoginForm } from "./LoginForm";
import { authApi } from "../api/api";
import { TelegramCodeForm } from "./TelegramCodeForm";
import { authDataType } from "../types/types";

export function ValidateWrapper() {

    
    const { data: authData } = useQuery<authDataType>({
        queryKey: ["auth"],
        enabled: false,
    });

    const { data: isValidated } = useQuery({
        ...authApi.validateLoginQueryOptions(
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

