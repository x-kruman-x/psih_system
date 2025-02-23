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

type EditPageSettingsBar = {
  pageType: "order" | "product" | "party";
};

export function CardSettingsBar({ pageType }: EditPageSettingsBar) {
  // TODO: сделать хук конфига
  let configObj;
  switch (pageType) {
    case "order":
      configObj = {
        gap: "gap-[170px]",
        linkPath: "/orders",
        leftEl: (
          <HoverBorderedEl>
            <Link to="">
              <Typography>CDEK</Typography>
            </Link>
          </HoverBorderedEl>
        ),
        rightEl: (
          <HoverBorderedEl>
            <Link to="">
              <Typography>Почта России</Typography>
            </Link>
          </HoverBorderedEl>
        ),
        navStyle: "absolute left-1/2 -translate-x-1/2",
      };
      break;
    case "product":
      // configObj = {
      //   gap: "",
      //   linkPath: "/products",
      //   leftEl: (
      //     <HoverBorderedEl>
      //       <Link to="">
      //         <Text>CDEK</Text>
      //       </Link>
      //     </HoverBorderedEl>
      //   ),
      //   rightEl: (
      //     <HoverBorderedEl>
      //       <Link to="">
      //         <Text>Почта России</Text>
      //       </Link>
      //     </HoverBorderedEl>
      //   ),
      //   navStyle: "absolute left-1/2 -translate-x-1/2",
      // };
      break;
    case "party":
      configObj = {
        gap: '',
        linkPath: "/parties",
        leftEl: null,
        rightEl: null,
        navStyle: '',
      };
      break
  }

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
