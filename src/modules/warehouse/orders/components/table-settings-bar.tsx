import { useEffect, useState } from "react";
import HoverBorderedEl from "../../../../shared/UI/HoverBorderedEl";
import { Text } from "../../../../shared/UI/Text";
import { OrdersType } from "../types/tableTypes";
import { Table } from "@tanstack/react-table";
import { useDeleteOrders } from "../hooks/use-delete-orders";
import { stringToNumber } from "../../../../shared/utils/stringToNumber";
import { ordersApi } from "../api/api";

export function TableSettingsBar({
  table,
  selectedIds,
}: {
  table: Table<OrdersType>;
  selectedIds: string[];
}) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const deleteOrders = useDeleteOrders();

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
          <Text>Поиск</Text>
        </button>
        <button className="text-[#494949]">
          <Text>Фильтр</Text>
        </button>
      </div>
      {selectedIds.length !== 0 ? (
        <div className="flex items-center gap-[30px] absolute left-[48%]">
          {selectedIds.length}
          <HoverBorderedEl
            as="button"
            // disabled={() => deleteOrders.getIsPending(stringToNumber(selectedIds))}
            //TODO: отсортировать выбранные id
            onClick={() =>
              deleteOrders.handleDeleteOrders(stringToNumber(selectedIds))
            }
            // onClick={() =>
            //   console.log(ordersApi.getOrdersQueryOptions().queryKey)
            // }
          >
            <Text>Удалить</Text>
          </HoverBorderedEl>
        </div>
      ) : (
        ""
      )}
      <HoverBorderedEl
        as="button"
        onClick={handleClick}
        className="text-[#494949] relative settingsButton"
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
                    <div className="grow">
                      <Text>{column.id}</Text>
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
