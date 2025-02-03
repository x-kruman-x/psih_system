import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
    const queryClient = useQueryClient();
    const isAuthenticated = queryClient.getQueryData(['auth'])
    return isAuthenticated
}