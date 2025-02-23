import { Table } from "@tanstack/react-table";

export function clearAllFilters(table: Table<any>) {
  table.resetColumnFilters();
}