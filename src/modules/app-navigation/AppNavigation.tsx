import { Link } from "@tanstack/react-router";
import logo from "../../assets/img/logo.svg";
import { Typography } from "../../shared/UI/Text";
import { BorderedLink } from "../../shared/UI/BorderedLink";

export function AppNavigation() {
  return (
    <nav className="flex justify-center items-center gap-[25px] py-[5px] border-b border-black sticky top-0 backdrop-blur-[6px] z-20">
      <Link to="">
        <img className="h-[36px] w-[20px]" src={logo} alt="logo" />
      </Link>
      {/* TODO!: проблема с отображением текущего пути */}
      <BorderedLink to="/orders">
        <Typography>СКЛАД</Typography>
      </BorderedLink>
      <BorderedLink to="">
        <Typography>СООБЩЕНИЯ</Typography>
      </BorderedLink>
      <BorderedLink to="">
        <Typography>САЙТ</Typography>
      </BorderedLink>
      <BorderedLink to="">
        <Typography>АНАЛИТИКА</Typography>
      </BorderedLink>
      <BorderedLink to="">
        <Typography>ЗАДАЧИ</Typography>
      </BorderedLink>
      <BorderedLink to="">
        <Typography>ВХОД</Typography>
      </BorderedLink>
    </nav>
  );
}
