import { useEffect, useState } from "react";
import { Typography } from "@/shared/UI/Text";
import arrow from "../../assets/img/arrow.svg";
import { RemainsDropDownProps } from "../types/remainsDropDownProps";

export interface RemainsDropDownComponentProps {
  modifications: RemainsDropDownProps[];
}

export function RemainsDropDown({ modifications }: RemainsDropDownComponentProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

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
    <div className="mx-4 relative">
      <button
        onClick={handleMenu}
        className={`w-full flex justify-between items-center py-[7px] px-4 mb-[11px] border border-solid border-transparent rounded-md group-hover:border-black status-button`}
      >
        <Typography className="grow">Остаток</Typography>
        <img
          className={`${isOpenMenu ? "rotate-180 duration-300" : "rotate-0 duration-300"} w-[15px]`}
          src={arrow}
          alt="arrow"
        />
      </button>
      {isOpenMenu && (
        <div className="buttonList absolute w-full bg-white rounded-md py-[7px] px-4 z-10 border border-solid border-black flex flex-col">
          {modifications?.map((modification) => (
            <div className="flex justify-center">{`${modification.size} - ${modification.remaining}`}</div>
          ))}
        </div>
      )}
    </div>
  );
}
