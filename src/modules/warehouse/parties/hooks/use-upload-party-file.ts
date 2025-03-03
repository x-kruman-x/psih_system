import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partiesApi } from "../api/api";
import { toast } from "sonner";

export function useUploadPartyFile() {
  const queryClient = useQueryClient();

  const uploadPartyFileMutation = useMutation({
    mutationFn: async ({
      partyId,
      formData,
    }: {
      partyId: number;
      formData: FormData;
    }) => {
      return await partiesApi.uploadPartyFile(partyId, formData);
    },
    onError: (error) => {
      console.error(error);
      toast.error('Произошла ошибка при добавлении файла'); 
    },
    onSuccess: () => {
      toast.success('Файл успешно добавлен');
    },
  });

  return {
    handleUploadPartyFile: uploadPartyFileMutation.mutateAsync,
    updatePartyPage: queryClient.invalidateQueries({
      queryKey: partiesApi.getPartyQueryOptions(
        String(uploadPartyFileMutation.variables?.partyId)
      ).queryKey,
    }),
  };
}
