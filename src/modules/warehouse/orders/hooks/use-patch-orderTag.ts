import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../api/api";
import { toast } from "sonner";

export function usePatchOrderTag(refreshPlace: "list" | "card") {
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
      toast.error('Произошла ошибка при обновлении тега заказа'); 
    },
    onSuccess: () => {
      toast.success('Тег заказа успешно обновлен');
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
            queryKey: ordersApi.getOrderQueryOptions(String(variables.orderId)).queryKey,
          });
          break;
      }
    },
  });

  return {
    handleUpdateOrderTag: updateOrderTagMutation.mutateAsync,
  };
}
