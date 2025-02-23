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

    onSettled: () => {
      console.log(uploadPartyFileMutation.variables);
    },
  });

  return {
    handleUploadPartyFile: uploadPartyFileMutation.mutateAsync,
    updatePartyPage: async() =>{
      await queryClient.invalidateQueries({
        queryKey: [partiesApi.basekey, "getParty", String(uploadPartyFileMutation.variables?.partyId)]
      })
      console.log('страница обновилась')
    }
  };
}
