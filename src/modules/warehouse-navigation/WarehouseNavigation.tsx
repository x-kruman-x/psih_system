import { Text } from "../../shared/UI/Text";
import { BorderedLink } from "../../shared/UI/BorderedLink";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { useFilterToggle } from "@/shared/hooks/useFilterToggle";

export function WarehouseNavigation() {
  const { isFilterOpen, toggleFilter } = useFilterToggle();

  return (
    <div className="sticky top-[47px] backdrop-blur-[6px] z-20">
      {isFilterOpen && (
        <div className="absolute left-[30px] top-[5px] flex gap-[20px]">
          <HoverBorderedEl as="button">
            <Text>Очистить</Text>
          </HoverBorderedEl>
          <HoverBorderedEl as="button" onClick={toggleFilter}>
            <Text>Закрыть</Text>
          </HoverBorderedEl>
        </div>
      )}
      <nav className="flex justify-center items-center gap-[25px] py-[5px] border-b border-black">
        <BorderedLink to="/orders">
          <Text>ЗАКАЗЫ</Text>
        </BorderedLink>
        <BorderedLink to="/products">
          <Text>ТОВАРЫ</Text>
        </BorderedLink>
        <BorderedLink to="/remains">
          <Text>ОСТАТКИ</Text>
        </BorderedLink>
        <BorderedLink to="/parties">
          <Text>ПАРТИИ</Text>
        </BorderedLink>
      </nav>
    </div>
  );
}
