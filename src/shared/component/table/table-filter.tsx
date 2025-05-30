import { useFilterToggle } from "@/shared/hooks/useFilterToggle";
import { Filter } from "@/shared/UI/Filter";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { Typography } from "@/shared/UI/Typography";
import { clearAllFilters } from "@/shared/utils/clearAllFilters";
import { Table } from "@tanstack/react-table";

export function TableFilter<T extends Record<string, any>>({
  table,
}: {
  table: Table<T>;
}) {
  const { toggleFilter } = useFilterToggle();

  return (
    <div className="w-full flex relative">
      {table.getHeaderGroups().flatMap((headerGroup) =>
        headerGroup.headers.map((header) => {
          if (header.column.getCanFilter()) {
            return (
              <div
                key={header.id}
                className="w-1/6 flex border-l border-b border-black border-solid p-[15px] text-center first:border-l-0 transition-all duration-300"
              >
                <Filter column={header.column} />
              </div>
            );
          }
          return null;
        })
      )}
      <div className="absolute left-[30px] top-[-36px] flex gap-[20px] z-20">
        <HoverBorderedEl as="button" onClick={() => clearAllFilters(table)}>
          <Typography>Очистить</Typography>
        </HoverBorderedEl>
        <HoverBorderedEl as="button" onClick={toggleFilter}>
          <Typography>Закрыть</Typography>
        </HoverBorderedEl>
      </div>
    </div>
  );
}

// function FilterItem() {
//   return (
//     <div className="w-1/6 flex border-r border-b border-black border-solid p-[15px] text-center last:border-r-0 transition-all duration-300">
//       <textarea
//         className="w-full resize-none text-[13px] leading-[17px] text-black border-none overflow-visible focus:outline-none max-h-[50vh] h-auto"
//         onInput={(event) => {
//           const textarea = event.target as HTMLTextAreaElement;
//           textarea.style.height = "auto";
//           textarea.style.height = `${textarea.scrollHeight}px`;
//         }}
//       />
//     </div>
//   );
// }
// не окончательный вариант
