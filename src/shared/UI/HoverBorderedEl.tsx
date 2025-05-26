import React, { ReactNode, MouseEvent, ElementType } from "react";

type HoverBorderedElProps<C extends ElementType> = {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  as?: C;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

const HoverBorderedEl = <C extends ElementType = "div">({
  children,
  className = "",
  as: Component = "div" as C,
  onClick,
  isActive = false,
}: HoverBorderedElProps<C>) => {
  const baseStyles = `p-[6px] ${className} border-solid opacity-70 border-[1px] backdrop-blur-[6px] rounded-md hover:border-black hover:opacity-100 ${isActive ? "border-black" : "border-transparent"}`;

  // const isClickableElement = ["button", "a"].includes(Component as unknown as string)

  const componentProps = { className: baseStyles, onClick: onClick };

  return React.createElement(Component, componentProps, children);
};

export default HoverBorderedEl;
