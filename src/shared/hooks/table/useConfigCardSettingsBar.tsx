import { EditPageSettingsBar } from "@/shared/types/table/editPageSettingsBar";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { Typography } from "@/shared/UI/Text";
import { Link } from "@tanstack/react-router";

export function useConfigCardSettingsBar(pageType: EditPageSettingsBar) {
  switch (pageType) {
    case "order":
      return {
        gap: "gap-[170px]",
        linkBackPath: "/orders",
        leftEl: (
          <HoverBorderedEl>
            <Typography>CDEK</Typography>
          </HoverBorderedEl>
        ),
        rightEl: (
          <HoverBorderedEl>
            <Typography>Почта России</Typography>
          </HoverBorderedEl>
        ),
        navStyle: "absolute left-1/2 -translate-x-1/2",
        Link: (item: { id: number }) => (
          <Link
            to="/orders/$orderId/edit"
            params={{
              orderId: String(item.id),
            }}
          >
            <Typography key={item.id}>Заказ - {item.id}</Typography>
          </Link>
        ),
      };
    case "party":
      return {
        gap: "",
        linkBackPath: "/parties",
        leftEl: null,
        rightEl: null,
        navStyle: "",
        Link: (item: { id: number }) => (
          <Link
            to="/parties/$partyId/edit"
            params={{
              partyId: String(item.id),
            }}
          >
            <Typography key={item.id}>Партия - {item.id}</Typography>
          </Link>
        ),
      };
    case "product":
      return {
        gap: "",
        linkBackPath: "/products",
        leftEl: null,
        rightEl: null,
        navStyle: "",
        Link: (item: { id: number }) => (
          <Link
            to=""
          >
            <Typography key={item.id}>{item.id}</Typography>
          </Link>
        ),
      };
    default:
      throw new Error(`Некорректный pageType: ${pageType}`);
  }
}