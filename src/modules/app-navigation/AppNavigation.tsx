import { Link } from "@tanstack/react-router";
import logo from "../../assets/img/logo.svg";
import { Typography } from "../../shared/UI/Typography";
import { BorderedLink } from "../../shared/UI/BorderedLink";

export function AppNavigation() {
  return (
    <nav className="flex justify-center items-center gap-[25px] py-[5px] border-b border-black sticky top-0 backdrop-blur-[6px] z-20">
      <Link to="">
        <img className="h-[36px] w-[20px]" src={logo} alt="logo" />
      </Link>
      <BorderedLink to="/warehouse/orders" matchPath="/warehouse">
        <Typography>СКЛАД</Typography>
      </BorderedLink>
      <button
        type="button"
        className="p-[6px] border-solid border-[1px] opacity-70 border-transparent rounded-md hover:border-black hover:opacity-100"
        style={{ background: "none", border: "none", cursor: "pointer" }}
        onClick={() => {
          const access = localStorage.getItem("access_token");
          const refresh = localStorage.getItem("refresh_token");
          const url = `http://82.202.143.118:8080/?access=${encodeURIComponent(access ?? "")}&refresh=${encodeURIComponent(refresh ?? "")}`;
          window.location.href = url;
        }}
      >
        <Typography>СООБЩЕНИЯ</Typography>
      </button>
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
