import { Link } from "@tanstack/react-router";
import HoverBorderedEl from "../UI/HoverBorderedEl";
import { Typography } from "../UI/Text";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Sheet,
} from "../UI/sheet";
import { EditPageSettingsBar } from "../types/table/editPageSettingsBar";
import { useConfigCardSettingsBar } from "../hooks/table/useConfigCardSettingsBar";
import { useState } from "react";

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
      {/* TODO: добавить кнопку удаления itema  */}
      {/* TODO: добавить список тегов  */}
      {/* TODO: добавить кнопку создания тегов */}
      <Sheet>
        <SheetTrigger>
          <HoverBorderedEl>
            <Typography>Настройки</Typography>
          </HoverBorderedEl>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
