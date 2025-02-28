import { useDeleteOrders } from "@/modules/warehouse/orders/hooks/use-delete-orders";
import { configTableType } from "../../types/table/columnTableTypes";
import { useDeleteParties } from "@/modules/warehouse/parties/hooks/use-delete-parties";

export function useDeleteRows(configTable: configTableType) {
    const deleteOrders = useDeleteOrders();
    const deleteParties = useDeleteParties()

    switch(configTable){
        case "orderTable":
            return (id: number[]) => deleteOrders.handleDelete(id)
        case "partiesTable":
            return (id: number[]) => deleteParties.handleDelete(id)
    }
}