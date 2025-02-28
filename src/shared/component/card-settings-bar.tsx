import { Link } from "@tanstack/react-router";
import HoverBorderedEl from "../UI/HoverBorderedEl";
import { Typography } from "../UI/Text";
import { Sheet } from "lucide-react";
import {
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../UI/sheet";
import { EditPageSettingsBar } from "../types/table/editPageSettingsBar";
import { useConfigCardSettingsBar } from "../hooks/table/useConfigCardSettingsBar";

type CardSettingsBarProps = {
  pageType: EditPageSettingsBar
}

export function CardSettingsBar({ pageType }: CardSettingsBarProps) {
  const configObj = useConfigCardSettingsBar(pageType)

  const containerStyle = `flex items-center justify-between py-[10px] px-[30px] relative border-b border-black border-solid`;

  return (
    <div className={containerStyle}>
      <div className={`flex ${configObj?.gap}`}>
        <HoverBorderedEl>
          <Link to={configObj?.linkPath}>
            <Typography>Назад</Typography>
          </Link>
        </HoverBorderedEl>
        <div className="flex gap-10">
          {configObj?.leftEl}
          {configObj?.rightEl}
        </div>
      </div>
      <div className={configObj?.navStyle}>Заказ - 666</div>
      {/* <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet> */}
      <HoverBorderedEl>
        <Typography>Настройки</Typography>
      </HoverBorderedEl>
    </div>
  );
}
