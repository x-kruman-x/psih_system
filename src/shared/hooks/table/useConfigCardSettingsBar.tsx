import { configTableType } from "@/shared/types/table/columnTableTypes";
import { EditPageSettingsBar } from "@/shared/types/table/editPageSettingsBar";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { Typography } from "@/shared/UI/Text";
import { Link } from "@tanstack/react-router";

interface ConfigSettingsBar {
  gap: string;
  linkBackPath: string;
  leftEl: React.ReactNode | null;
  rightEl: React.ReactNode | null;
  navStyle: string;
  navText: string;
  Link: (item: { id: number }) => JSX.Element;
  cardSheetType: configTableType;
}

export function useConfigCardSettingsBar(pageType: EditPageSettingsBar): ConfigSettingsBar {
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
        navText: 'Заказ',
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
        cardSheetType: 'orderTable'
      };
    case "party":
      return {
        gap: "",
        linkBackPath: "/parties",
        leftEl: null,
        rightEl: null,
        navStyle: "",
        navText: 'Партия',
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
        cardSheetType: 'partiesTable'
      };
    case "product":
      return {
        gap: "",
        linkBackPath: "/products",
        leftEl: null,
        rightEl: null,
        navStyle: "",
        navText: 'Товар',
        Link: (item: { id: number }) => (
          <Link
            to=""
          >
            <Typography key={item.id}>{item.id}</Typography>
          </Link>
        ),
        cardSheetType: 'productsTable'
      };
    default:
      throw new Error(`Некорректный pageType: ${pageType}`);
  }
}