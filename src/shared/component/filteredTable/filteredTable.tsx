import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { memo, useState } from "react";
import { configTableType } from "../../types/table/columnTableTypes";
import { useColumns } from "@/shared/hooks/table/useColumns";
import { filterByCategory } from "@/shared/utils/filters/filterByCategory";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { Typography } from "@/shared/UI/Typography";
import { ProductsDetailsDialog } from "./products-details-dialog.tsx";
import { ProductCombinedData } from "@/modules/warehouse/products/types/ProductCombinedData";
import { NewProductDialog } from "@/shared/component/filteredTable/NewProductDialog.tsx";

// TODO!: сделать таблицу категорий
export const FilteredTable = memo(function ({
  combinedData,
  configTable,
}: {
  combinedData: ProductCombinedData;
  configTable: configTableType;
}) {
  const { products, categories } = combinedData;
  const productColumns = useColumns(configTable);
  const categoryColumns = useColumns("categories");

  const [productColumnVisibility, setProductColumnVisibility] = useState({});
  const [categoryColumnVisibility, setCategoryColumnVisibility] = useState({});
  const [productRowSelection, setProductRowSelection] = useState({});
  const [_, setCategoryFilter] = useState<any>([]);

  const [isOpenNewProductDialog, setIsOpenNewProductDialog] =
    useState<boolean>(false);

  const productTable = useReactTable({
    data: products,
    columns: productColumns,
    state: {
      columnVisibility: productColumnVisibility,
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
      columnVisibility: categoryColumnVisibility,
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
      {/*<EditDataDialog />*/}
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
                        header.getContext(),
                      )}
                    </>
                  )}
                </th>
              )),
            )}
          </tr>
        </thead>
        <tbody>
          {categoriesTable.getRowModel().rows.map((row, index) => {
            const isLastCell =
              index === categoriesTable.getRowModel().rows.length - 1;
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
                        cell.getContext(),
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
      <div className="w-5/6 relative">
        <table className="w-full">
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
                          header.getContext(),
                        )}
                      </>
                    )}
                  </th>
                )),
              )}
            </tr>
          </thead>
          <tbody>
            {productTable.getRowModel().rows.map((row, index) => {
              const isLastCell =
                index === productTable.getRowModel().rows.length - 1;
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
                          cell.getContext(),
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
          className="fixed bottom-4 left-[25%] -translate-x-1/2 bg-white z-20"
          onClick={() => {
            setIsOpenNewProductDialog((prev) => !prev);
          }}
        >
          <Typography>
            <span className="text-[16px]">+</span> Товар
          </Typography>
        </HoverBorderedEl>
        {isOpenNewProductDialog && (
          <ProductsDetailsDialog
            initialData={combinedData}
            onClose={() => setIsOpenNewProductDialog(false)}
          />
        )}
        <NewProductDialog />
      </div>
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
});
