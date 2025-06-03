import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { productsApi } from "../api/api";

export function useUploadProductImg() {
  const queryClient = useQueryClient();

  const uploadProductImgMutation = useMutation({
    mutationFn: async ({
      productId,
      file,
    }: {
      productId: number;
      file: any;
    }) => {
      return await productsApi.uploadProductImg(productId, file);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Произошла ошибка при добавлении фото");
    },
    onSuccess: () => {
      toast.success("Фото успешно добавлено");
    },
  });

  const updateProductPage = (productId: number) => {
    console.log('обновляем product')
    queryClient.invalidateQueries({
      queryKey: productsApi.getProductByIdQueryOptions(String(productId)).queryKey,
    });
  };

  return {
    handleUploadProductImg: uploadProductImgMutation.mutateAsync,
    updateProductPage
  };
}
