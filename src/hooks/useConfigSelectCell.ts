import { usePatchOrderStatus } from "../modules/warehouse/orders/hooks/use-patch-orderStatus";
import { usePatchOrderTag } from "../modules/warehouse/orders/hooks/use-patch-orderTag";

export function useConfigSelectCell(btnType: "status" | "tag") {
  const updateOrderStatus = usePatchOrderStatus();
  const updateOrderTag = usePatchOrderTag();

  switch (btnType) {
    case "status":
      return {
        selectCellContent: [
          { text: "в обработке", backgroundColor: "bg-[#5685DE]", id: 1 },
          { text: "доставлен", backgroundColor: "bg-[#56DE85]", id: 2 },
          { text: "возврат", backgroundColor: "bg-[#D6A0A0]", id: 3 },
        ],
        updateFunc:(orderId: number, newValue: any) => updateOrderStatus.handleUpdateOrderStatus({orderId, newValue})
      };
    case "tag":
      return {
        selectCellContent: [
          { text: "бартер", backgroundColor: "bg-[#5685DE]", id: 1 },
          { text: "нет", backgroundColor: "bg-[#D6A0A0]", id: 2 },
        ],
        updateFunc: (orderId: number, newValue: any) => updateOrderTag.handleUpdateOrderTag({orderId, newValue})
      };
  }
}
