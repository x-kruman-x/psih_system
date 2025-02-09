import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../api/api";

export function usePatchOrderStatus() {
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
    onSettled: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return {
    handleUpdateOrderStatus: updateOrderStatusMutation.mutate,
  };
}
