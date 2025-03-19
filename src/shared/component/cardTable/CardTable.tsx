// import { useCardColumns } from "@/shared/hooks/cardTable/useCardColumns";
import { useCardColumns } from "@/shared/hooks/cardTable/useCardColumns";
import { useIntegrationData } from "@/shared/hooks/cardTable/useIntergrationData";
import { configTableType } from "@/shared/types/table/columnTableTypes";
import { Typography } from "@/shared/UI/Text";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import { CardTableSettings } from "./CardTableSettings";

export const CardTable = <T extends Record<string, any>>({
  data,
  configTable,
}: {
  data: T[];
  configTable: configTableType;
}) => {
  console.log('CardTable: ', data)
  const columns = useCardColumns(configTable);
  const intergationData = useIntegrationData(configTable);
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
  // TODO!: при переходе между элементами таблица товаров не меняется 
  return (
    <div className="relative">
      <CardTableSettings table={cardTable} configTable={configTable} />
      <table className="w-full border-b border-solid border-black">
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
      <Typography className="pt-3 pl-5">общая сумма = 34234234</Typography>
      <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2">{intergationData}</div>
    </div>
  );
};
