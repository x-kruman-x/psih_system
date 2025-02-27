import { ColumnDef } from "@tanstack/react-table";
import { configTableType } from "../types/table/columnTableTypes";

export function useCardColumns<T extends Record<string, any>>(configTable: configTableType): ColumnDef<T>[] {

    const orderColumns: ColumnDef<T>[] = [
        {
            id: "Номер",
            accessorKey: "id",
        }
    ]
}