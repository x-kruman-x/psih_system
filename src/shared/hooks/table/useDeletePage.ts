import { useDeleteOrder } from "@/modules/warehouse/orders/hooks/use-delete-order";
import { useDeleteParty } from "@/modules/warehouse/parties/hooks/use-delete-party";
import { configTableType } from "@/shared/types/table/columnTableTypes";

export function useDeletePage(configTable: configTableType) {
  const deleteOrder = useDeleteOrder();
  const deleteParty = useDeleteParty();

  switch (configTable) {
    case "orderTable":
      return {
        deleteFunc: (id: number) => deleteOrder.handleDelete(id),
        text: "заказ",
      };
    case "partiesTable":
      return {
        deleteFunc: (id: number) => deleteParty.handleDelete(id),
        text: "партию",
      };
    // TODO!: сделать функцию удаления страницы товара
    case "productsTable":
      return {
        deleteFunc: (id: number) => console.log(`удалил товар с ${id}`),
        text: "товар",
      };
    case "remainsTable":
    case "buyersTable":
    default:
      throw new Error("Неизвестный тип таблицы");
  }
}
