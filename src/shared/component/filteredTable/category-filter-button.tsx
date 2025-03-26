import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { Table } from "@tanstack/react-table";
import { useEffect } from "react";

export function CategoryFilterButton<T extends Record<string, any>>({
  productTable,
  //   children,
}: {
  productTable: Table<T>;
  //   children:
}) {
  useEffect(() => {
    productTable.getHeaderGroups().flatMap((headerGroup) =>
      headerGroup.headers.map((header) => {
        console.log(header.column);
      })
    );
  }, []);
  return (
    <HoverBorderedEl
      onClick={() => {
        productTable.setGlobalFilter('кепки')
      }}
    >
      {children}/
    </HoverBorderedEl>
  );
}
