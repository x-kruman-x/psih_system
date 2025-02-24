import { useUploadPartyFile } from "@/modules/warehouse/parties/hooks/use-upload-party-file";
import { useUploadOrderFile } from "../../modules/warehouse/orders/hooks/use-upload-order-file";
import { savePlaceType } from "../types/savePlaceTypes";
import { useQueryClient } from "@tanstack/react-query";
import { ordersApi } from "@/modules/warehouse/orders/api/api";

export const useConfigUploadBtn = (savePlace: savePlaceType, id: number) => {
  const queryClient = useQueryClient()
  const { handleUploadOrderFile, updateOrderPage } = useUploadOrderFile();
  const { handleUploadPartyFile, updatePartyPage } = useUploadPartyFile();

  switch (savePlace) {
    case "order":
      return {
        uploadFunc: async (orderId: number, formData: FormData) => {
          await handleUploadOrderFile({ orderId, formData });
        },
        refreshPageFunc: updateOrderPage,
      };
    case "product":
    case "party":
      return {
        uploadFunc: async (partyId: number, formData: FormData) => {
          await handleUploadPartyFile({ partyId, formData });
        },
        refreshPageFunc: updatePartyPage,
      };
    default:
      throw new Error(`Unsupported savePlace: ${savePlace}`);
  }
};
