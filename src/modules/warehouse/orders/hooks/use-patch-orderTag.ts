import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../api/api";

export function usePatchOrderTag() {
  const queryClient = useQueryClient();

  const updateOrderTagMutation = useMutation({
    mutationFn: async ({
      orderId,
      newValue,
    }: {
      orderId: number;
      newValue: any;
    }) => {
      return await ordersApi.updateOrderTag(orderId, newValue);
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
    handleUpdateOrderTag: updateOrderTagMutation.mutate,
  };
}