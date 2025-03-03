import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../api/api";
import { toast } from "sonner";

export function useDeleteOrders() {
  const queryClient = useQueryClient();

  const deleteOrdersMutation = useMutation({
    mutationFn: ordersApi.deleteOrders,
    onError: (error) => {
      console.error(error);
      toast.error('Произошла ошибка при удалении заказов'); 
    },
    onSuccess: () => {
      toast.success('Заказы успешно удалены');
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
