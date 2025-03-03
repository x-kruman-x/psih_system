import { useDeleteOrders } from "@/modules/warehouse/orders/hooks/use-delete-orders";
import { configTableType } from "../../types/table/columnTableTypes";
import { useDeleteParties } from "@/modules/warehouse/parties/hooks/use-delete-parties";
import { useDeleteProducts } from "@/modules/warehouse/products/hooks/use-delete-products";

export function useDeleteRows(configTable: configTableType) {
  const deleteOrders = useDeleteOrders();
  const deleteParties = useDeleteParties();
  const deleteProducts = useDeleteProducts();

  switch (configTable) {
    case "orderTable":
      return (id: number[]) => deleteOrders.handleDelete(id);
    case "partiesTable":
      return (id: number[]) => deleteParties.handleDelete(id);
    case "productsTable":
      return (id: number[]) => deleteProducts.handleDelete(id);
    case "remainsTable":
      return (id: number[]) => console.log(`удалил остатки с таким ${id}`);
  }
}
