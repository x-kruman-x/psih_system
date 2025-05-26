import { Link } from "@tanstack/react-router";
import HoverBorderedEl from "../../UI/HoverBorderedEl";
import { Typography } from "../../UI/Typography";
import { EditPageSettingsBar } from "../../types/table/editPageSettingsBar";
import { useConfigCardSettingsBar } from "../../hooks/table/useConfigCardSettingsBar";
import { useEffect, useRef, useState } from "react";
import { CardSheet } from "./card-sheet";
import { useScrollLinkContainer } from "@/shared/hooks/card/useScrollLinkContainer";
import useOrdersTableSearch from "@/shared/hooks/card/useOrdersTableSearch";

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

  const [searchText, setSearchText] = useState("");

  const [foundOrders, findOrders] = useOrdersTableSearch<TItems>(items);

  const { scrollContainerBy } = useScrollLinkContainer(listRef);

  useEffect(() => {
    findOrders(searchText);
  }, [searchText]);

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
  //   console.log(target.closest('navbutton'))
  //   if (!target.closest("navbutton")) {
  //     console.log('клик возле навбатон', target.closest("navbutton"))
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
    //  TODO: переделать верстку под новый дизайн
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
      <div
        className={`navbutton absolute left-1/2 -translate-x-1/2 flex flex-col ${isOpenMenu ? "top-[10px] z-20" : ""}`}
      >
        <div className="flex">
          <HoverBorderedEl
            className={`cursor-pointer !opacity-100 ${isOpenMenu ? "px-16 !border-black bg-white !rounded-none !rounded-tl-md" : ""}`}
            onClick={handleMenu}
          >
            {/* TODO!: на странице товара отображается id, а не name*/}
            <Typography className="text-center">
              {itemsData.id
                ? `${configObj.navText}${itemsData.id}`
                : "Данные не загружены"}
            </Typography>
            {/* TODO!: добавить img */}
            {/* <img className="" src={arrowsUpDown} alt="arrows" /> */}

            {isOpenMenu && (
              <div
                className="linkCardList max-h-[100px] overflow-y-auto text-center"
                ref={listRef}
              >
                {(searchText.length > 0 ? foundOrders : items)
                  .filter((item) => item.id !== itemsData.id)
                  .map((item) => (
                    <div key={item.id}>{configObj.Link(item)}</div>
                  ))}
              </div>
            )}
          </HoverBorderedEl>
          {isOpenMenu && (
            <div className="flex flex-col border border-l-transparent border-black border-solid rounded-tr-md bg-white divide-y-[1px] divide-black">
              <button
                className="h-1/2 p-1"
                type="button"
                // disabled={!canScrollUp}
                onClick={() => {
                  scrollContainerBy(-50);
                }}
              >
                &#8593;
              </button>
              <button
                className="h-1/2 p-1"
                type="button"
                // disabled={!canScrollDown}
                onClick={() => {
                  scrollContainerBy(50);
                }}
              >
                &#8595;
              </button>
            </div>
          )}
        </div>
        {isOpenMenu && (
          <input
            type="text"
            placeholder="поиск"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full py-[1px] text-center text-black text-[13px] leading-[17px] focus:outline-none bg-white border border-t-transparent border-black border-solid rounded-b-lg"
          />
        )}
      </div>
      <CardSheet configTable={configObj.cardSheetType} id={itemsData.id} />
    </div>
  );
}
