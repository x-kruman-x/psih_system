import { useMutation } from "@tanstack/react-query";
import { ordersApi } from "../api/api";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function useDeleteOrder() {
  const navigate = useNavigate({ from: "/warehouse/orders/$orderId/edit" });

  const deleteOrderMutation = useMutation({
    mutationFn: ordersApi.deleteOrder,
    onError: (error) => {
      console.error(error);
      toast.error("Произошла ошибка при удалении заказа");
    },
    onSuccess: () => {
      toast.success("Заказ успешно удален");
    },
    async onSettled() {
      navigate({ to: "/warehouse/orders" });
    },
  });
  
  return {
    handleDelete: deleteOrderMutation.mutate,
  };
}
