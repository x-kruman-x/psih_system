import { queryOptions, useQueryClient } from "@tanstack/react-query";
import { loginInstance } from "../../../shared/API/base";
import { useNavigate } from "@tanstack/react-router";

type serverMessage = {
  data: string;
};

type tokensType = {
  access_token: string;
  refresh_token: string;
  token_type: "Bearer";
};

function validateLogin(username: string, password: string) {
  const data = new URLSearchParams();
  data.append("username", username);
  data.append("password", password);

  return loginInstance.post<serverMessage>(`/api/jwt/validate/`, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

function messageFromBot(username: string, password: string) {
  const data = new URLSearchParams();
  data.append("username", username);
  data.append("password", password);

  return loginInstance.post<serverMessage>(`/api/jwt/2fa-1-step/`, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

function getTokens(username: string, code: string) {
  const data = new URLSearchParams();
  data.append("username", username);
  data.append("code", code);

  return loginInstance.post<tokensType>(`/api/jwt/2fa-2-step/`, data, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}

export const authApi = {
  basekey: "user",

  validateLoginQueryOptions: (username: string, password: string) => {
    return queryOptions({
      queryKey: [authApi.basekey, "validateLogin", username],
      queryFn: () =>
        validateLogin(username, password).then((response) => response.data),
    });
  },

  messageFromBotQueryOptions: (username: string, password: string) => {
    return queryOptions({
      queryKey: [authApi.basekey, "messageFromBot", username],
      queryFn: () =>
        messageFromBot(username, password).then((response) => response.data),
    });
  },

  getTokensQueryOptions: (username: string, code: string) => {
    return queryOptions({
      queryKey: [authApi.basekey, "getTokens", username],
      queryFn: async () => {
        const response = await getTokens(username, code);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("refresh_token", response.data.refresh_token);

        console.log(response.data)

        const queryClient = useQueryClient();
        queryClient.setQueryData([authApi.basekey, "auth"], {
          isAuth: true,
        });

        const navigate = useNavigate()
        navigate({to: '/orders'})
        return response.data;
      },
    });
  },
};
