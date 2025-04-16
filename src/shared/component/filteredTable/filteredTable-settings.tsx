import { useDeleteRows } from "@/shared/hooks/table/useDeleteRows";
import { useFilteredTableFilterToggle } from "@/shared/hooks/useFilterToggle";
import { configTableType } from "@/shared/types/table/columnTableTypes";
import { CustomCheckbox } from "@/shared/UI/CustomCheckBox";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { Typography } from "@/shared/UI/Typography";
import { stringToNumber } from "@/shared/utils/stringToNumber";
import { Table } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { FilteredTable } from "./filteredTable";

export function FilteredTableSettings<T extends Record<string, any>>({
  table,
  configTable,
}: {
  table: Table<T>;
  configTable: configTableType;
}) {
  const [isShowArchive, setIsShowArchive] = useState<boolean>(false)
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { toggleFilter } = useFilteredTableFilterToggle();

  const selectedIds = Object.keys(table.getState().rowSelection);

  const deleteRows = useDeleteRows(configTable);

  const handleClick = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.closest(".settingsButton") || target.closest(".dropdown")) {
      return;
    }

    setIsDropdownVisible(false);
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownVisible]);

  return (
    <div className="py-[6px] px-[30px] flex justify-between border-b border-solid border-black sticky top-[89px] backdrop-blur-[6px] z-20">
      <div className="w-[250px] flex justify-between">
        <button className="text-[#494949]">
          <Typography>Поиск</Typography>
        </button>
        <button className="text-[#494949]" onClick={toggleFilter}>
          <Typography>Фильтр</Typography>
        </button>
      </div>
      {selectedIds.length !== 0 ? (
        <div className="flex items-center gap-[20px] absolute left-1/2 -translate-x-1/2">
          <Typography>{selectedIds.length}</Typography>
          {/* TODO!: товары не удаляются */}
          <HoverBorderedEl
            as="button"
            onClick={() => {
              deleteRows(stringToNumber(selectedIds));
              table.setRowSelection({});
            }}
          >
            <Typography>Удалить</Typography>
          </HoverBorderedEl>
        </div>
      ) : (
        ""
      )}
      <div className="flex items-center gap-4">
        <HoverBorderedEl as="button">
          <Typography>Архив</Typography>
        </HoverBorderedEl>
        <HoverBorderedEl
          as="button"
          onClick={handleClick}
          className="text-[#494949] relative settingsButton"
        >
          <Typography>Настройки</Typography>
          {isDropdownVisible && (
            <div
              className="dropdown absolute w-[143px] top-full right-0 mt-[13px] py-[10px] px-[8px] bg-[#FFFFFF] border border-[#707070] rounded-md backdrop-blur-xl flex flex-col gap-[10px]"
              onClick={(e) => e.stopPropagation()}
            >
              {table.getAllLeafColumns().map((column) => {
                return (
                  <div key={column.id}>
                    <label className="flex justify-between">
                      <CustomCheckbox
                        {...{
                          checked: column.getIsVisible(),
                          onChange: column.getToggleVisibilityHandler(),
                        }}
                      />{" "}
                      <div className="grow">
                        <Typography>{column.id}</Typography>
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        </HoverBorderedEl>
      </div>
      {/* TODO!: архив тут */}
      {/* {isShowArchive && <FilteredTable combinedData={} configTable="archiveTable"/>} */}
    </div>
  );
}
