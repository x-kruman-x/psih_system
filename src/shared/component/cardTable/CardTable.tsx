// import { useCardColumns } from "@/shared/hooks/cardTable/useCardColumns";
import { useCardColumns } from "@/shared/hooks/cardTable/useCardColumns";
import { configTableType } from "@/shared/types/table/columnTableTypes";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { useState } from "react";

// TODO: доделать
export const CardTable = <T extends Record<string, any>>({
  data,
  configTable,
}: {
  data: T[];
  configTable: configTableType;
}) => {
//   console.log(data)
  const columns = useCardColumns(configTable);
  const [rowSelection, setRowSelection] = useState({});

  const cardTable = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
    },
    getRowId: (originalRow) => originalRow.id.toString(),
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    // TODO: доделать верстку таблицы
    // TODO: добавить возможность менять значение остатка
    // TODO: дописать оставшуюся логику и значения
      <div className="relative">
        <table className="w-full">
          <thead>
            {cardTable.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="w-1/6 py-[5px] border-l border-solid border-black first:border-none"
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
            {cardTable.getRowModel().rows.map((row) => (
              <tr key={row.id} className="group">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="w-1/6 text-center border-l border-solid border-black first:border-none"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
  );
};


