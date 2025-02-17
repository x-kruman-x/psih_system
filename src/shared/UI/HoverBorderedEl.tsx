import React, { ReactNode, MouseEvent, ElementType } from "react";

type HoverBorderedElProps<C extends ElementType> = {
  children: ReactNode;
  className?: string;
  as?: C;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
};

const HoverBorderedEl = <C extends ElementType = "div">({
  children,
  className = "",
  as: Component = "div" as C,
  onClick,
}: HoverBorderedElProps<C>) => {
  const baseStyles = `p-[6px] ${className} border-solid border-[1px] border-transparent rounded-md hover:border-black`;

  // const isClickableElement = ["button", "a"].includes(Component as unknown as string)

  const componentProps = { className: baseStyles, onClick: onClick };

  return React.createElement(Component, componentProps, children);
};

export default HoverBorderedEl;