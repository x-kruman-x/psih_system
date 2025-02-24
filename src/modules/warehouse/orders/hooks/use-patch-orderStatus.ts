import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../api/api";

export function usePatchOrderStatus(refreshPlace: "list" | "card") {
  const queryClient = useQueryClient();

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({
      orderId,
      newValue,
    }: {
      orderId: number;
      newValue: any;
    }) => {
      return await ordersApi.updateOrderStatus(orderId, newValue);
    },
    onError: (error) => {
      console.error(error);
    },
    onSettled: async (_, __, variables) => {
      switch (refreshPlace) {
        case "list":
          await queryClient.invalidateQueries({
            queryKey: ordersApi.getOrdersQueryOptions().queryKey,
          });
          break;
        case "card":
          await queryClient.invalidateQueries({
            queryKey: ordersApi.getOrderQueryOptions(String(variables.orderId)).queryKey
          });
          break;
      }
    },
  });

  return {
    handleUpdateOrderStatus: updateOrderStatusMutation.mutateAsync,
  };
}
