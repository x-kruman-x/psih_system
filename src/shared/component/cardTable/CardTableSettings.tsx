import { configTableType } from "@/shared/types/table/columnTableTypes";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { Typography } from "@/shared/UI/Typography";
import { Table } from "@tanstack/react-table";

export function CardTableSettings<T extends Record<string, any>>({
  table,
  // configTable,
}: {
  table: Table<T>;
  configTable: configTableType;
}) {
  const selectedIds = Object.keys(table.getState().rowSelection);
  //   TODO: сделать функцию удаления товаров
  //   const deleteRows = useDeleteRows(configTable);
  return (
    <div className="py-[15px] flex gap-[15px] justify-center items-center border-b border-solid border-black">
      <HoverBorderedEl as="button">
        <Typography>Изменить</Typography>
      </HoverBorderedEl>
      <Typography
        className={selectedIds.length !== 0 ? "text-black" : "text-transparent"}
      >
        {selectedIds.length}
      </Typography>
      <HoverBorderedEl
        as="button"
        onClick={() => {
          //   deleteRows(stringToNumber(selectedIds));
          table.setRowSelection({});
        }}
      >
        <Typography>Удалить</Typography>
      </HoverBorderedEl>
    </div>
  );
}
