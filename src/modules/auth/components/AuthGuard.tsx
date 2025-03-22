import { useEffect } from "react";
import { refreshToken } from "../api/api";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export const AuthGuard = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (localStorage.getItem("access_token")) {
        try {
          if (localStorage.getItem("access_token")) {
            const keysWithInfiniteGcTime = ["auth", "isFilter"];

            keysWithInfiniteGcTime.forEach((key) => {
              queryClient.setQueryDefaults([key], { gcTime: Infinity });
            });

            queryClient.setQueryData(["auth"], { isAuth: true });
            queryClient.setQueryData(["isFilter"], { isFilterOpen: false });
          }
        } catch (error) {
          navigate({ to: "/login" });
        }
      }
    };

    checkAuth();
  }, []);

  return null; // Компонент ничего не рендерит, только логика
};
