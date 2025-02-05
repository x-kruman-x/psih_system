import { Link } from "@tanstack/react-router";
import HoverBorderedEl from "../../shared/UI/HoverBorderedEl";
import { Text } from "../../shared/UI/Text";
import { BorderedLink } from "../../shared/UI/BorderedLink";

export function WarehouseNavigation() {
  return (
    <nav className=" flex justify-center items-center gap-[25px] py-[5px] border-b border-black sticky top-[47px] backdrop-blur-[6px] z-20">
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
  );
}
