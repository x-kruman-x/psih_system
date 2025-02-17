import { useUploadOrderFile } from "../../modules/warehouse/orders/hooks/use-upload-order-file";

export const useConfigUploadBtn = (savePlace: "order" | "product") => {
  const uploadOrderFiles = useUploadOrderFile();

  switch (savePlace) {
    case "order":
      return async (orderId: number, formData: FormData) => {
        await uploadOrderFiles.handleUploadOrderFile({ orderId, formData });
      };
  }
};
