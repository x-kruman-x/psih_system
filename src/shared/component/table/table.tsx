import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useColumns } from "../../hooks/useColumns";
import { TableSettings } from "./table-settings";
import HoverBorderedEl from "../../UI/HoverBorderedEl";
import { Text } from "../../UI/Text";
import { configTableType } from "../../types/columnTableTypes";
import { TableHeaderBar } from "./table-header-bar";

export const Table = <T extends Record<string, any>>({ data, configTable }: { data: T[], configTable: configTableType }) => {
  const columns = useColumns(configTable);

  const [columnVisibility, setColumnVisibility] = useState({});

  const [rowSelection, setRowSelection] = useState({});
  const selectedIds = rowSelection ? Object.keys(rowSelection) : [];

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      rowSelection,
    },
    getRowId: (originalRow) => originalRow.id.toString(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="relative">
      <TableHeaderBar table={table} selectedIds={selectedIds} />
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="w-1/6 py-[5px] border-r border-solid border-black last:border-none"
                  >
                    {header.isPlaceholder ? null : (
                      <>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="group">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="w-1/6 text-center border-r border-solid border-black last:border-none"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <HoverBorderedEl
        as="button"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white z-20"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <Text>НАВЕРХ</Text>
      </HoverBorderedEl>
    </div>
  );
};
