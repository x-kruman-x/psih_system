import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { configTableType } from "../../types/table/columnTableTypes";
import { useColumns } from "@/shared/hooks/table/useColumns";
import { filterByCategory } from "@/shared/utils/filters/filterByCategory";

// TODO!: сделать таблицу категорий
export const FilteredTable = <T extends Record<string, any>>({
  combinedData,
  configTable,
}: {
  combinedData: { products: T[]; categories: T[] };
  configTable: configTableType;
}) => {
  const { products, categories } = combinedData;
  // console.log(combinedData)
  const productColumns = useColumns(configTable);
  const categoryColumns = useColumns("categories");

  const [productСolumnVisibility, setProductColumnVisibility] = useState({});
  const [categoryСolumnVisibility, setCategoryColumnVisibility] = useState({});

  const [productRowSelection, setProductRowSelection] = useState({});

  const [categoryFilter, setCategoryFilter] = useState<any>([]);

  const productTable = useReactTable({
    data: products,
    columns: productColumns,
    state: {
      columnVisibility: productСolumnVisibility,
      rowSelection: productRowSelection,
      // globalFilter: categoryFilter,
    },
    onGlobalFilterChange: setCategoryFilter,
    globalFilterFn: filterByCategory,
    onColumnVisibilityChange: setProductColumnVisibility,
    onRowSelectionChange: setProductRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const categoriesTable = useReactTable({
    data: categories,
    columns: categoryColumns,
    state: {
      columnVisibility: categoryСolumnVisibility,
    },
    onColumnVisibilityChange: setCategoryColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  // console.log(productTable.getState().columnFilters);
  // console.log("categoriesTable", categoriesTable.getRowModel());
  // console.log("productTable", productTable.getRowModel());
  return (
    <div className="relative flex">
      {/* TODO!: сделать table bar */}
      <table className="w-1/6">
        <thead>
          <tr>
            {categoriesTable.getHeaderGroups().flatMap((headerGroup) =>
              headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="w-1/6 py-[5px]"
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
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {categoriesTable.getRowModel().rows.map((row, index) => {
            const isLastCell = index === categoriesTable.getRowModel().rows.length - 1;
            return (
              <tr key={row.id} className="group relative">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className={`w-1/6 px-0 text-center border-l border-solid border-black first:border-none ${isLastCell ? `pb-[100vh]` : ""}`}
                    >
                      {/* <button
                        onClick={() => productTable.setGlobalFilter("кепки")}
                      > */}
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      {/* </button> */}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <table className="w-5/6">
        <thead>
          <tr>
            {productTable.getHeaderGroups().flatMap((headerGroup) =>
              headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="w-1/6 py-[5px] border-l border-solid border-black"
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
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {productTable.getRowModel().rows.map((row, index) => {
            const isLastCell = index === productTable.getRowModel().rows.length - 1;
            return (
              <tr key={row.id} className="group relative">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className={`w-1/6 px-0 text-center border-l border-solid border-black ${isLastCell ? `pb-[100vh]` : ""}`}
                    >
                      {/* TODO!: сделать отдельный компонент для фильта, чтоб передавать туда table и менять фильтр категорий */}
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
    </div>
  );
};
