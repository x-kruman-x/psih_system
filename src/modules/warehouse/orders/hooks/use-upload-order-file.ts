import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../api/api";

export function useUploadOrderFile() {
  const queryClient = useQueryClient();

  const uploadOrderFileMutation = useMutation({
    mutationFn: async({
      orderId,
      formData,
    }: {
      orderId: number;
      formData: FormData;
    }) => {
      return await ordersApi.uploadOrderFile(orderId, formData);
    },
    onError: (error) => {
        console.error(error);
    }
  });

  return {
    handleUploadOrderFile: uploadOrderFileMutation.mutateAsync
  }
}
