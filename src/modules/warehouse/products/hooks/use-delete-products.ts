import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "../api/api";
import { toast } from "sonner";

export function useDeleteProducts() {
  const queryClient = useQueryClient();

  const deleteProductsMutation = useMutation({
    mutationFn: productsApi.deleteProducts,
    onError: (error) => {
      console.error(error);
      toast.error('Произошла ошибка при удалении партий'); 
    },
    onSuccess: () => {
      toast.success('Товары успешно удалены');
    },
    async onSettled(_, __, variables) {
      await queryClient.invalidateQueries({
        queryKey: [productsApi.basekey, "getProducts", variables],
      });
    },
  });

  return {
    deleteProducts: deleteProductsMutation.mutate,
  };
}
