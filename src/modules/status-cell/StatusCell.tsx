import { useEffect, useState } from "react";
import { StatusButton } from "../../shared/UI/status-button/StatusButton";
import { StatusButtonListElement } from "../../shared/UI/status-button/StatusButton-listElement";

export const StatusCell = ({
  status,
  buttonStyle,
}: {
  status: string;
  buttonStyle?: string;
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  //TODO: пофиксить отображениие списка при нажатии на другой список
  const handleOutsideClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.closest(".status-button") || target.closest(".buttonList")) {
      return;
    }

    setIsOpenMenu(false);
  };

  useEffect(() => {
    if (isOpenMenu) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpenMenu]);

  const statusContent = [
    { text: "в обработке", color: "#5685DE", id: 1 },
    { text: "доставлен", color: "#56DE85", id: 2 },
    { text: "возврат", color: "#D6A0A0", id: 3 },
  ];

  let buttonContent = statusContent.find((content) => content.text === status);
  if (!buttonContent) {
    buttonContent = { text: "неизвестный", color: "#CCCCCC", id: 0 };
  }

  return (
    <div className="mx-4 relative">
      <StatusButton
        onClick={handleMenu}
        text={buttonContent.text}
        color={buttonContent.color}
        imgStyle={`${isOpenMenu ? "rotate-180 duration-300" : "rotate-0 duration-300"}`}
        className={`status-button ${buttonStyle}`}
      />
      {isOpenMenu && (
        <div className="buttonList absolute bg-white rounded-md w-full py-[7px] px-4 z-10 border border-solid border-black">
          {statusContent.map((content) => (
            <StatusButtonListElement
              key={content.id}
              text={content.text}
              color={content.color}
            />
          ))}
        </div>
      )}
    </div>
  );
};
