import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../api/api";

export function useDeleteOrders() {
  const queryClient = useQueryClient();

  const deleteOrdersMutation = useMutation({
    mutationFn: ordersApi.deleteOrders,
    async onError(error) {
      console.error("Failed to delete orders:", error);
    },
    async onSettled() {
      await queryClient.invalidateQueries({ queryKey: [ordersApi.basekey, "getOrders"] });
    }
  });
  deleteOrdersMutation.variables
  return {
    handleDelete: deleteOrdersMutation.mutate,
    getIsPending: (id: number[]): boolean => {
      return deleteOrdersMutation.isPending && deleteOrdersMutation.variables === id;
    }
  }
}
