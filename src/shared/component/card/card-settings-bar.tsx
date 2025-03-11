import { Link } from "@tanstack/react-router";
import HoverBorderedEl from "../../UI/HoverBorderedEl";
import { Typography } from "../../UI/Text";
import { EditPageSettingsBar } from "../../types/table/editPageSettingsBar";
import { useConfigCardSettingsBar } from "../../hooks/table/useConfigCardSettingsBar";
import { useState } from "react";
import { CardSheet } from "./card-sheet";

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

  if (!configObj) {
    throw new Error(`Некорректный pageType: ${pageType}`);
  }

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

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
        className={`absolute left-1/2 -translate-x-1/2 ${isOpenMenu ? "top-[10px] z-20" : ""}`}
      >
        <HoverBorderedEl
          className={`cursor-pointer ${isOpenMenu ? "px-16 !border-black bg-white" : ""}`}
          onClick={handleMenu}
        >
          <Typography>
            {itemsData.id ? `Заказ - ${itemsData.id}` : "Данные не загружены"}
          </Typography>

          {isOpenMenu && (
            <div className="max-h-[100px] overflow-y-auto">
              {items
                .filter((item) => item.id !== itemsData.id)
                .map((item) => (
                  <div key={item.id}>{configObj.Link(item)}</div>
                ))}
            </div>
          )}
        </HoverBorderedEl>
      </div>
      <CardSheet configTable={configObj.cardSheetType} id={itemsData.id}/>
    </div>
  );
}
