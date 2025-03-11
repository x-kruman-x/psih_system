import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partiesApi } from "../api/api";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function useDeleteParty() {
  const navigate = useNavigate({ from: "/parties/$partyId/edit" });

  const deletePartyMutation = useMutation({
    mutationFn: partiesApi.deleteParty,
    onError: (error) => {
      console.error(error);
      toast.error("Произошла ошибка при удалении партии");
    },
    onSuccess: () => {
      toast.success("Партия успешно удалена");
    },
    async onSettled() {
      navigate({ to: "/parties" });
    },
  });
  
  return {
    handleDelete: deletePartyMutation.mutate,
  };
}
