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
      return (ids: number[]) => deleteOrders.handleDelete(ids);
    case "partiesTable":
      return (ids: number[]) => deleteParties.handleDelete(ids);
    case "productsTable":
      return (ids: number[]) => deleteProducts.handleDelete(ids);
    case "remainsTable":
      return (ids: number[]) => console.log(`удалил остатки с таким ${ids}`);
  }
}
