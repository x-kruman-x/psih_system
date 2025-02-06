import { Link } from "@tanstack/react-router";
import logo from "../../assets/img/logo.svg";
import { Text } from "../../shared/UI/Text";
import { BorderedLink } from "../../shared/UI/BorderedLink";

export function AppNavigation() {
  return (
    <nav className="flex justify-center items-center gap-[25px] py-[5px] border-b border-black sticky top-0 backdrop-blur-[6px] z-20">
      <Link to="">
        <img className="h-[36px] w-[20px]" src={logo} alt="logo" />
      </Link>
      <BorderedLink to="/orders">
        <Text>СКЛАД</Text>
      </BorderedLink>
      <BorderedLink to="">
        <Text>СООБЩЕНИЯ</Text>
      </BorderedLink>
      <BorderedLink to="">
        <Text>САЙТ</Text>
      </BorderedLink>
      <BorderedLink to="">
        <Text>АНАЛИТИКА</Text>
      </BorderedLink>
      <BorderedLink to="">
        <Text>ЗАДАЧИ</Text>
      </BorderedLink>
      <BorderedLink to="">
        <Text>ВХОД</Text>
      </BorderedLink>
    </nav>
  );
}
