import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { configTableType } from "../../types/table/columnTableTypes";
import { useColumns } from "@/shared/hooks/table/useColumns";
import { Typography } from "@/shared/UI/Text";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";

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

  // const categoriesTable = useReactTable({
  //   data: categories,
  //   columns: categoryColumns,
  //   state: {
  //     columnVisibility: categoryСolumnVisibility,
  //     rowSelection: categoryRowSelection,
  //   },
  //   onColumnVisibilityChange: setCategoryColumnVisibility,
  //   onRowSelectionChange: setCategoryRowSelection,
  //   getCoreRowModel: getCoreRowModel(),
  //   getFilteredRowModel: getFilteredRowModel(),
  // });
  // console.log(categoriesTable.getRowModel())
  console.log(productTable.getRowModel());
  return (
    <div className="relative">
      <table className="w-full">
        <thead>
          <tr>
            {/* {categoriesTable.getHeaderGroups().flatMap((headerGroup) =>
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
            )} */}
            <th className="w-1/6 py-[5px] border-r border-solid border-black last:border-none">
              <Typography className={`!text-[#8D8D8D] `}>категории</Typography>
            </th>
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
          <div className="flex w-full">
            <div className="flex flex-col">
              {categories.map((category) => (
                <HoverBorderedEl key={category.id}>
                  {category.name}
                </HoverBorderedEl>
              ))}
            </div>
            <div className="">
              {productTable.getRowModel().rows.map((row) => (
                <tr key={row.id} className="group last:group/last-pb">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="w-1/6 px-0 text-center border-l border-solid border-black first:border-none group/last-pb:pb-[300px]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </div>
          </div>
        </tbody>
      </table>
    </div>
  );
};
