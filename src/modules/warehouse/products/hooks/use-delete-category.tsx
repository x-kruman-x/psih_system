import { productsApi } from "@/modules/warehouse/products/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export function useDeleteCategory() {
  const queryClient = useQueryClient();

  const deleteCategoryMutation = useMutation({
    mutationFn: productsApi.deleteCategoryById,
    onError: (error) => {
      console.error(error);
      toast.error("Произошла ошибка при удалении категории");
    },
    onSuccess: () => {
      toast.success("Партии успешно удалены");
    },
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [productsApi.basekey, "getParties"],
      });
    },
  });

  return {
    deleteMutation: deleteCategoryMutation.mutate,
  };
}
