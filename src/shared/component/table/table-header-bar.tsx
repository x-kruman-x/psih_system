import { Table } from "@tanstack/react-table";
import { TableSettings } from "./table-settings";
import { useFilterToggle } from "@/shared/hooks/useFilterToggle";
import { TableFilter } from "./table-filter";
import { configTableType } from "@/shared/types/table/columnTableTypes";

export function TableHeaderBar<T extends Record<string, any>>({
  table,
  configTable
}: {
  table: Table<T>;
  configTable: configTableType;
}) {
  const { isFilterOpen } = useFilterToggle();

  return !isFilterOpen ? (
    <TableSettings table={table}  configTable={configTable}/>
  ) : (
    <TableFilter table={table} />
  );
}
