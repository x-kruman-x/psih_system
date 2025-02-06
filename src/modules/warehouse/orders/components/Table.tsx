import { useQueryClient } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { ordersApi } from "../api/api";
import { OrdersType } from "../types/tableTypes";
import { useColumns } from "../../../../hooks/useColumns";
import { TableSettingsBar } from "./table-settings-bar";

export const Table = () => {
  const queryClient = useQueryClient();

  const [data, _setData] = useState<OrdersType[]>(
    () => queryClient.getQueryData([ordersApi.basekey, "getOrders"]) ?? []
  );
  const columns = useColumns('orderTable')

  const [columnVisibility, setColumnVisibility] = useState({});

  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
      rowSelection
    },
    getRowId: (originalRow) => originalRow.id,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <TableSettingsBar table={table} selectedIds={Object.keys(rowSelection)}/>
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <th key={header.id} colSpan={header.colSpan} className="w-1/6 py-[5px] border-r border-solid border-black last:border-none">
                  {header.isPlaceholder ? null : (
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      
                    </>
                  )}
                </th>
              )
            })}
          </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="group">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="w-1/6 text-center border-r border-solid border-black last:border-none">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};