import { Table } from "@tanstack/react-table";
import { TableSettings } from "./table-settings";
import { useFilterToggle } from "@/shared/hooks/useFilterToggle";
import { TableFilter } from "./table-filter";

export function TableHeaderBar<T extends Record<string, any>>({
  table,
  selectedIds,
}: {
  table: Table<T>;
  selectedIds: string[];
}) {
  const { isFilterOpen } = useFilterToggle();
  console.log(isFilterOpen)
  return !isFilterOpen ? (
    <TableSettings table={table} selectedIds={selectedIds} />
  ) : (
    <TableFilter />
  );
}
