import { useFilteredTableFilterToggle } from "@/shared/hooks/useFilterToggle";
import { configTableType } from "@/shared/types/table/columnTableTypes";
import { FilteredTableFilter } from "./filteredTable-filter";
import { FilteredTableSettings } from "./filteredTable-settings";
import { Table } from "@tanstack/react-table";

export function FilteredTableHeaderBar<T extends Record<string, any>>({
  table,
  configTable,
}: {
  table: Table<T>;
  configTable: configTableType;
}) {
  const { isFilteredTableFilterOpen } = useFilteredTableFilterToggle();

  return !isFilteredTableFilterOpen ? (
    <FilteredTableSettings table={table}  configTable={configTable}/>
  ) : (
    <FilteredTableFilter table={table} />
  );
}
