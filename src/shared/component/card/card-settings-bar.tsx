import { Link } from "@tanstack/react-router";
import HoverBorderedEl from "../../UI/HoverBorderedEl";
import { Typography } from "../../UI/Text";
import { EditPageSettingsBar } from "../../types/table/editPageSettingsBar";
import { useConfigCardSettingsBar } from "../../hooks/table/useConfigCardSettingsBar";
import { useEffect, useRef, useState } from "react";
import { CardSheet } from "./card-sheet";
import debounce from "lodash.debounce";
import arrowsUpDown from '../../../assets/img/arrows-up-down.svg'
import { useScrollLinkContainer } from "@/shared/hooks/card/useScrollLinkContainer";

type CardSettingsBarProps<
  TItems extends { id: number },
  TItemData extends Record<string, any>,
> = {
  pageType: EditPageSettingsBar;
  items: TItems[];
  itemsData: TItemData;
};

export function CardSettingsBar<
  TItems extends { id: number },
  TItemData extends Record<string, any>,
>({ pageType, items, itemsData }: CardSettingsBarProps<TItems, TItemData>) {
  const configObj = useConfigCardSettingsBar(pageType);
  
  const listRef = useRef<HTMLDivElement>(null);
  const {canScrollUp, canScrollDown, scrollContainerBy} = useScrollLinkContainer(listRef)

  if (!configObj) {
    throw new Error(`Некорректный pageType: ${pageType}`);
  }

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  // TODO: доделать клик вне области
  // const handleOutsideClick = (event: MouseEvent) => {
  //   const target = event.target as HTMLElement;

  //   if (target.closest("navbutton")) {
  //     return;
  //   }

  //   setIsOpenMenu(false);
  // };

  // useEffect(() => {
  //   if (isOpenMenu) {
  //     document.addEventListener("click", handleOutsideClick);
  //   } else {
  //     document.removeEventListener("click", handleOutsideClick);
  //   }

  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, [isOpenMenu]);
  

  return (
    <div className="flex items-center justify-between py-[10px] px-[30px] relative border-b border-black border-solid">
      <div className={`flex ${configObj.gap}`}>
        <HoverBorderedEl>
          <Link to={configObj.linkBackPath}>
            <Typography>Назад</Typography>
          </Link>
        </HoverBorderedEl>
        <div className="flex gap-10">
          {configObj.leftEl}
          {configObj.rightEl}
        </div>
      </div>
      {/* TODO: доделать навигацию */}
      <div
        className={`navbutton absolute left-1/2 -translate-x-1/2 flex ${isOpenMenu ? "top-[10px] z-20" : ""}`}
      >
        <HoverBorderedEl
          className={`cursor-pointer !opacity-100 ${isOpenMenu ? "px-16 !border-black bg-white !rounded-none !rounded-l-md" : ""}`}
          onClick={handleMenu}
        >
            <Typography>
              {itemsData.id
                ? `${configObj.navText} - ${itemsData.id}`
                : "Данные не загружены"}
            </Typography>
            {/* TODO: добавить img */}
            {/* <img className="" src={arrowsUpDown} alt="arrows" /> */}

            {isOpenMenu && (
              <div className="linkCardList max-h-[100px] overflow-y-auto" ref={listRef}>
                {items
                  .filter((item) => item.id !== itemsData.id)
                  .map((item) => (
                    <div key={item.id}>{configObj.Link(item)}</div>
                  ))}
              </div>
            )}
        </HoverBorderedEl>
        {isOpenMenu && (
            <div className="flex flex-col border border-l-transparent border-black border-solid rounded-r-md bg-white divide-y-[1px] divide-black">
              <button
                className="h-1/2 p-1"
                type="button"
                // disabled={!canScrollUp}
                onClick={() => {
                  scrollContainerBy(-50)
                }}
              >
                &#8593;
              </button>
              <button
              className="h-1/2 p-1"
                type="button"
                // disabled={!canScrollDown}
                onClick={() => {
                  scrollContainerBy(50)
                }}
              >
                &#8595;
              </button>
            </div>
          )}
      </div>
      <CardSheet configTable={configObj.cardSheetType} id={itemsData.id} />
    </div>
  );
}
