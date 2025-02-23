import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partiesApi } from "../api/api";

export function useDeleteParties() {
  const queryClient = useQueryClient();

  const deletePartiesMutation = useMutation({
    mutationFn: partiesApi.deleteParties,
    async onError(error) {
      console.error("Failed to delete parties:", error);
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
