import { useEffect, useState } from "react";
import HoverBorderedEl from "../../UI/HoverBorderedEl";
import { Typography } from "../../UI/Text";
import { Table } from "@tanstack/react-table";
import { stringToNumber } from "../../utils/stringToNumber";
import { CustomCheckbox } from "../../UI/CustomCheckBox";
import { useFilterToggle } from "@/shared/hooks/table/useFilterToggle";
import { configTableType } from "@/shared/types/table/columnTableTypes";
import { useDeleteRows } from "@/shared/hooks/table/useDeleteRows";
// import { toast } from "sonner";

export function TableSettings<T extends Record<string, any>>({
  table,
  configTable
}: {
  table: Table<T>;
  configTable: configTableType;
}) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { toggleFilter } = useFilterToggle();

  const selectedIds = Object.keys(table.getState().rowSelection)

  const deleteRows = useDeleteRows(configTable)

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
        <div className="flex items-center gap-[30px] absolute left-1/2 -translate-x-1/2">
          {selectedIds.length}
          <HoverBorderedEl
            as="button"
            onClick={() =>{
              //TODO: функция удаления для товаров и остатков
              deleteRows(stringToNumber(selectedIds))
              table.setRowSelection({})
            }}
          >
            <Typography>Удалить</Typography>
          </HoverBorderedEl>
          {/* <button
            className="toast-button"
            onClick={() => {
              toast.success('This is a success toast');
              console.log('toast')
            }}
          >
            Render toast
          </button> */}
        </div>
      ) : (
        ""
      )}
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
  );
}
