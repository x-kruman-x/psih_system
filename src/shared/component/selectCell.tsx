import { useState, useEffect } from "react";
import { useConfigSelectCell } from "../hooks/select/useConfigSelectCell";
import { SelectButton } from "../UI/status-button/SelectButton";
import { SelectButtonListElement } from "../UI/status-button/SelectButton-listElement";
import { SelectCellProps } from "../types/SelectCellPropsTypes";

export function SelectCell({
  currentValue,
  buttonStyle,
  orderId,
  btnType,
  refreshPlace,
  page,
  wFull = false,
}: SelectCellProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const {selectCellContent, updateFunc} = useConfigSelectCell(btnType, refreshPlace, page);

  const buttonContent = selectCellContent.find(
    (content) => content.text === currentValue
  );
  
  const handleMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  //TODO: пофиксить отображениие списка при нажатии на другой список
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.closest(".status-button") || target.closest(".buttonList")) {
      return;
    }

    setIsOpenMenu(false);
  };

  useEffect(() => {
    if (isOpenMenu) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpenMenu]);

  return (
    <div className={`mx-4 relative ${!wFull ? '' : 'w-full'}`}>
      <SelectButton
        onClick={handleMenu}
        text={buttonContent?.text}
        backgroundColor={buttonContent?.backgroundColor}
        imgStyle={`${isOpenMenu ? "rotate-180 duration-300" : "rotate-0 duration-300"}`}
        className={`status-button ${buttonStyle}`}
      />
      {isOpenMenu && (
        <div className="buttonList absolute bg-white rounded-md w-full py-[7px] px-4 z-10 border border-solid border-black">
          {selectCellContent.map((content) => (
            <SelectButtonListElement
              key={content.id}
              text={content.text}
              backgroundColor={content.backgroundColor}
              onClick={async () => {
                try {
                  await updateFunc(orderId, content.text);
                  setIsOpenMenu(false);
                } catch (error) {
                  console.error("Ошибка при обновлении:", error);
                }
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
