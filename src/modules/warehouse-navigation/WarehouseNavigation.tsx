import { Typography } from "../../shared/UI/Text";
import { BorderedLink } from "../../shared/UI/BorderedLink";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { useFilterToggle } from "@/shared/hooks/table/useFilterToggle";

export function WarehouseNavigation() {
  const { isFilterOpen, toggleFilter } = useFilterToggle();
  
  return (
    <div className="sticky top-[47px] backdrop-blur-[6px] z-20">
      {isFilterOpen && (
        <div className="absolute left-[30px] top-[5px] flex gap-[20px]">
          <HoverBorderedEl as="button">
            <Typography>Очистить</Typography>
          </HoverBorderedEl>
          <HoverBorderedEl as="button" onClick={toggleFilter}>
            <Typography>Закрыть</Typography>
          </HoverBorderedEl>
        </div>
      )}
      <nav className="flex justify-center items-center gap-[25px] py-[5px] border-b border-black">
        <BorderedLink to="/orders">
          <Typography>ЗАКАЗЫ</Typography>
        </BorderedLink>
        <BorderedLink to="/products">
          <Typography>ТОВАРЫ</Typography>
        </BorderedLink>
        <BorderedLink to="/productsRemains">
          <Typography>ОСТАТКИ</Typography>
        </BorderedLink>
        <BorderedLink to="/parties">
          <Typography>ПАРТИИ</Typography>
        </BorderedLink>
      </nav>
    </div>
  );
}
