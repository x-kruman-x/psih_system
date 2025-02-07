import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../api/api";
import { OrdersType } from "../types/tableTypes";

export function useDeleteOrders() {
  const queryClient = useQueryClient();

  const deleteOrdersMutation = useMutation({
    mutationFn: ordersApi.deleteOrders,
    async onError(error) {
      console.error("Failed to delete orders:", error);
    },
    // async onSuccess(data, deletedIds: number[]) {
    //   await queryClient.setQueryData(
    //     ordersApi.getOrdersQueryOptions().queryKey,
    //     (orders: OrdersType[]) => orders?.filter((item) => !deletedIds.includes(item.id))
    //   );
    //   console.log(data)
    // },
    async onSettled(data) {
      await queryClient.invalidateQueries({ queryKey: [ordersApi.basekey, 'getOrders'] });
      const updatedData = queryClient.getQueryData<OrdersType[]>([ordersApi.basekey, 'getOrders'])
      console.log(updatedData)
    },
  });
  deleteOrdersMutation.variables
  return {
    handleDeleteOrders: deleteOrdersMutation.mutate,
    getIsPending: (id: number[]): boolean => {
      return deleteOrdersMutation.isPending && deleteOrdersMutation.variables === id;
    }
  }
}
