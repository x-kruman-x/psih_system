import { Table } from "@tanstack/react-table";
import { TableSettings } from "./table-settings";
import { useFilterToggle } from "@/shared/hooks/useFilterToggle";
import { TableFilter } from "./table-filter";
import { configTableType } from "@/shared/types/columnTableTypes";

export function TableHeaderBar<T extends Record<string, any>>({
  table,
  selectedIds,
  configTable
}: {
  table: Table<T>;
  selectedIds: string[];
  configTable: configTableType;
}) {
  const { isFilterOpen } = useFilterToggle();

  return !isFilterOpen ? (
    <TableSettings table={table} selectedIds={selectedIds} configTable={configTable}/>
  ) : (
    <TableFilter table={table} />
  );
}
