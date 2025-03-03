import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "../api/api";
import { toast } from "sonner";

export function useUploadOrderFile() {
  const queryClient = useQueryClient();

  const uploadOrderFileMutation = useMutation({
    mutationFn: async ({
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
      toast.error('Произошла ошибка при добавлении файла'); 
    },
    onSuccess: () => {
      toast.success('Файл успешно добавлен');
    },
  });

  return {
    handleUploadOrderFile: uploadOrderFileMutation.mutateAsync,
    updateOrderPage: queryClient.invalidateQueries({
      queryKey: ordersApi.getOrderQueryOptions(
        String(uploadOrderFileMutation.variables?.orderId)
      ).queryKey,
    }),
  };
}
