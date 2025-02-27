import { usePatchOrderStatus } from "@/modules/warehouse/orders/hooks/use-patch-orderStatus";
import { usePatchOrderTag } from "@/modules/warehouse/orders/hooks/use-patch-orderTag";
import { usePatchPartyStatus } from "@/modules/warehouse/parties/hooks/use-patch-partyStatus";
import { usePatchPartyTag } from "@/modules/warehouse/parties/hooks/use-patch-partyTag";
import { SelectCellRefreshPlaceType, SelectCellPageType } from "@/shared/types/SelectCellPropsTypes";

export function useUpdateFuncSelectCell(
  refreshPlace: SelectCellRefreshPlaceType,
  page: SelectCellPageType
) {
  const updateOrderStatus = usePatchOrderStatus(refreshPlace);
  const updateOrderTag = usePatchOrderTag(refreshPlace);

  const updatePartyStatus = usePatchPartyStatus(refreshPlace);
  const updatePartyTag = usePatchPartyTag(refreshPlace);

  switch (page) {
    case "orders":
      return {
        updateStatus: async (orderId: number, newValue: any) => {
          await updateOrderStatus.handleUpdateOrderStatus({
            orderId,
            newValue,
          });
        },
        updateTag: async (orderId: number, newValue: any) => {
          await updateOrderTag.handleUpdateOrderTag({ orderId, newValue });
        },
      };
    case "parties":
      return {
        updateStatus: async (partyId: number, newValue: any) => {
          await updatePartyStatus.handleUpdateOrderStatus({
            partyId,
            newValue,
          });
        },
        updateTag: async (partyId: number, newValue: any) => {
          await updatePartyTag.handleUpdateOrderStatus({ partyId, newValue });
        },
      };
    case "remains":
      return {
        updateStatus: () => console.log('создай api для обновления статуса'),
        updateTag: () => console.log('создай api для обновления тега'),
      };
  }
}
