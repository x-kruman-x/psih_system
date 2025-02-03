import { Link } from "@tanstack/react-router";
import logo from "../../assets/img/logo.svg";
import HoverBorderedEl from "../../shared/UI/HoverBorderedEl";
import { Text } from "../../shared/UI/Text";

export function AppNavigation() {
  return (
    <nav className="flex justify-center items-center gap-[25px] py-[5px] border-b border-black sticky top-0 backdrop-blur-[6px]">
      {/* TODO: сделать активные ссылки */}
      <Link to="">
        <img className="h-[36px] w-[20px]" src={logo} alt="logo" />
      </Link>
      <HoverBorderedEl as={Link} to="/orders">
        <Text>СКЛАД</Text>
      </HoverBorderedEl>
      <HoverBorderedEl as={Link} to="">
        <Text>СООБЩЕНИЯ</Text>
      </HoverBorderedEl>
      <HoverBorderedEl as={Link} to="">
        <Text>САЙТ</Text>
      </HoverBorderedEl>
      <HoverBorderedEl as={Link} to="">
        <Text>АНАЛИТИКА</Text>
      </HoverBorderedEl>
      <HoverBorderedEl as={Link} to="">
        <Text>ЗАДАЧИ</Text>
      </HoverBorderedEl>
      <HoverBorderedEl as={Link} to="">
        <Text>ВХОД</Text>
      </HoverBorderedEl>
    </nav>
  );
}
