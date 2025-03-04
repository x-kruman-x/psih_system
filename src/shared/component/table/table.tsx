import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useColumns } from "../../hooks/table/useColumns";
import HoverBorderedEl from "../../UI/HoverBorderedEl";
import { Typography } from "../../UI/Text";
import { configTableType } from "../../types/table/columnTableTypes";
import { TableHeaderBar } from "./table-header-bar";

export const Table = <T extends Record<string, any>>({
  data,
  configTable,
}: {
  data: T[];
  configTable: configTableType;
}) => {
  const columns = useColumns(configTable);

  const [columnVisibility, setColumnVisibility] = useState({});

  const [rowSelection, setRowSelection] = useState({});

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
    getFilteredRowModel: getFilteredRowModel(),
  });
  return (
    <div className="relative">
      <TableHeaderBar
        table={table}
        configTable={configTable}
      />
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="w-1/6 py-[5px] px-0 border-l border-solid border-black first:border-none"
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
          {/* TODO: добавить tooltip */}
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="group last:group/last-pb">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="w-1/6 px-0 text-center border-l border-solid border-black first:border-none group/last-pb:pb-[300px]"
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
        <Typography>НАВЕРХ</Typography>
      </HoverBorderedEl>
    </div>
  );
};
