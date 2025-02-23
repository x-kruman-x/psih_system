import { Link } from "@tanstack/react-router";
import HoverBorderedEl from "../../../../../shared/UI/HoverBorderedEl";
import { Typography } from "../../../../../shared/UI/Text";

type EditPageSettingsBar = {
  pageType: "order" | "product" | "party";
};

export function EditPageSettingsBar({ pageType }: EditPageSettingsBar) {
  const containerStyle = `flex items-center justify-items py-[10px] px-[30px] relative`;
  switch (pageType) {
    case "order":
      return (
        <div className={containerStyle}>
          <div className="flex gap-[170px]">
            <HoverBorderedEl>
              <Link to="/orders">
                <Typography>Назад</Typography>
              </Link>
            </HoverBorderedEl>
            <div className="flex gap-10">
              <HoverBorderedEl>
                <Link to="">
                  <Typography>CDEK</Typography>
                </Link>
              </HoverBorderedEl>
              <HoverBorderedEl>
                <Link to="">
                  <Typography>Почта России</Typography>
                </Link>
              </HoverBorderedEl>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2">Заказ - 666</div>
          
        </div>
      );
    case "product":
    case "party":
  }
}
