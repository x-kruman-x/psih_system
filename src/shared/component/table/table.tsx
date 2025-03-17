import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRef, useState } from "react";
import { useColumns } from "../../hooks/table/useColumns";
import HoverBorderedEl from "../../UI/HoverBorderedEl";
import { Typography } from "../../UI/Text";
import { configTableType } from "../../types/table/columnTableTypes";
import { TableHeaderBar } from "./table-header-bar";
// TODO: сделать таблицу покупателей
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

  const tableEl = useRef<HTMLDivElement>(null)
  // let tableHeight: number

  // useEffect(() => {
  //   if (tableEl.current) {
  //     tableHeight = tableEl.current?.offsetHeight;
  //   }
  // }, []); 

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
    <div className="relative" ref={tableEl}>
      <TableHeaderBar table={table} configTable={configTable} />
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
          {table.getRowModel().rows.map((row, index) => {
            const isLastCell = index === table.getRowModel().rows.length - 1;
            return (
              <tr key={row.id} className="group relative">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className={`w-1/6 px-0 text-center border-l border-solid border-black first:border-none ${
                        // isLastCell ? `pb-[calc(100vh-${tableHeight})]` : ""
                        // TODO: мб надо переделать
                        isLastCell ? `pb-[100vh]` : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
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
