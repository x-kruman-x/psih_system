import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partiesApi } from "../api/api";
import { toast } from "sonner";

export function useDeleteParties() {
  const queryClient = useQueryClient();

  const deletePartiesMutation = useMutation({
    mutationFn: partiesApi.deleteParties,
    onError: (error) => {
      console.error(error);
      toast.error('Произошла ошибка при удалении партий'); 
    },
    onSuccess: () => {
      toast.success('Партии успешно удалены');
    },
    async onSettled() {
      await queryClient.invalidateQueries({
        queryKey: [partiesApi.basekey, "getParties"],
      });
    },
  });

  return {
    handleDelete: deletePartiesMutation.mutate,
  };
}
