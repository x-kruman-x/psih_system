import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { configTableType } from "../../types/table/columnTableTypes";
import { useColumns } from "@/shared/hooks/table/useColumns";

export const FilteredTable = <T extends Record<string, any>>({
  combinedData,
  configTable,
}: {
  combinedData: { products: T[]; categories: T[] };
  configTable: configTableType;
}) => {
  const { products, categories } = combinedData;

  const productColumns = useColumns<T>(configTable);
  const categoryColumns = useColumns<T>("categories");

  const [productСolumnVisibility, setProductColumnVisibility] = useState({});
  const [categoryСolumnVisibility, setCategoryColumnVisibility] = useState({});

  const [productRowSelection, setProductRowSelection] = useState({});
  const [categoryRowSelection, setCategoryRowSelection] = useState({});

  const productTable = useReactTable({
    data: products,
    columns: productColumns,
    state: {
      columnVisibility: productСolumnVisibility,
      rowSelection: productRowSelection,
    },
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
      rowSelection: categoryRowSelection,
    },
    onColumnVisibilityChange: setCategoryColumnVisibility,
    onRowSelectionChange: setCategoryRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="relative">
      <table className="w-full">
        <thead>
          <tr>
            {categoriesTable.getHeaderGroups().flatMap((headerGroup) =>
              headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="w-1/6 py-[5px] border-r border-solid border-black"
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
            {productTable.getHeaderGroups().flatMap((headerGroup) =>
              headerGroup.headers.map((header) => (
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
              ))
            )}
          </tr>
        </thead>
        <tbody>
     
        </tbody>
      </table>
    </div>
  );
};
