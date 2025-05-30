import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partiesApi } from "../api/api";
import { toast } from "sonner";

export function usePatchPartyTag(refreshPlace: "list" | "card") {
  const queryClient = useQueryClient();

  const updatePartyTagMutation = useMutation({
    mutationFn: async ({
      partyId,
      newValue,
    }: {
      partyId: number;
      newValue: any;
    }) => {
      return await partiesApi.updatePartyTag(partyId, newValue)
    },
    onError: (error) => {
      console.error(error);
      toast.error('Произошла ошибка при обновлении тега партии'); 
    },
    onSuccess: () => {
      toast.success('Тег партии успешно обновлен');
    },
    onSettled: async (_, __, variables) => {
      switch (refreshPlace) {
        case "list":
          await queryClient.invalidateQueries({
            queryKey: partiesApi.getPartiesQueryOptions().queryKey,
          });
          break;
        case "card":
          await queryClient.invalidateQueries({
            queryKey: partiesApi.getPartyQueryOptions(String(variables.partyId)).queryKey
          });
          break;
      }
    },
  });

  return {
    handleUpdateOrderStatus: updatePartyTagMutation.mutateAsync,
  };
}
