import React, { useEffect, useState } from "react";
import HoverBorderedEl from "../../../../shared/UI/HoverBorderedEl";
import { Text } from "../../../../shared/UI/Text";
import { OrdersType } from "../types/tableTypes";
import { Table } from "@tanstack/react-table";

export function TableSettingsBar({ table, selectedRow }: { table: Table<OrdersType>, selectedRow:  }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsDropdownVisible((prev) => !prev);
  };

  //TODO: доделать клик не по настройкам

  //   const handleOutsideClick = (event: MouseEvent) => {
  //     const target = event.target as HTMLElement;
  //     if (!target.closest(".dropdown")) {
  //     //   setIsDropdownVisible(false);
  //         console.log(!target.closest(".dropdown"))
  //     }
  //   };

  //   useEffect(() => {
  //     if (isDropdownVisible) {
  //       document.addEventListener("click", handleOutsideClick);
  //     } else {
  //       document.removeEventListener("click", handleOutsideClick);
  //     }

  //     return () => {
  //       document.removeEventListener("click", handleOutsideClick);
  //     };
  //   }, [isDropdownVisible]);

  return (
    <div className="py-[6px] px-[30px] flex justify-between border-b border-solid border-black sticky top-[88px] backdrop-blur-[6px]">
      <div className="w-[250px] flex justify-between">
        <button className="text-[#494949]">
          <Text>Поиск</Text>
        </button>
        <button className="text-[#494949]">
          <Text>Фильтр</Text>
        </button>
      </div>
      <HoverBorderedEl
        as="button"
        onClick={handleClick}
        className="text-[#494949] relative"
      >
        <Text>Настройки</Text>
        {isDropdownVisible && (
          <div
            className="dropdown absolute w-[143px] top-full right-0 mt-[13px] py-[10px] px-[8px] bg-[#FFFFFF] border border-[#707070] rounded-md backdrop-blur-xl flex flex-col gap-[10px]"
            onClick={(e) => e.stopPropagation()}
          >
            {table.getAllLeafColumns().map((column) => {
              return (
                <div key={column.id}>
                    {/* TODO: сделать кастомный чекбокс*/}
                  <label className="flex justify-between">
                    <input
                      {...{
                        type: "checkbox",
                        checked: column.getIsVisible(),
                        onChange: column.getToggleVisibilityHandler(),
                      }}
                    />{" "}
                    <div className="grow"><Text>{column.id}</Text></div>
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
