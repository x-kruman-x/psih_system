import { useMutation, useQueryClient } from "@tanstack/react-query";
import { partiesApi } from "../api/api";

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
    },
    onSettled: (data) => console.log(data),
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
