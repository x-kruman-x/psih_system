import React, { ReactNode, MouseEvent, ElementType } from "react";
import { Link as TanStackLink, LinkProps as TanStackLinkProps } from "@tanstack/react-router";

type HoverBorderedElProps<C extends ElementType> = {
  children: ReactNode;
  className?: string;
  as?: C;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  to?: C extends typeof TanStackLink ? TanStackLinkProps["to"] : never;
  disabled?: (() => boolean) | undefined;
};

const HoverBorderedEl = <C extends ElementType = "div">({
  children,
  className = "",
  as: Component = "div" as C,
  onClick,
  to,
  disabled = () => true
}: HoverBorderedElProps<C>) => {
  const baseStyles = `p-[6px] ${className} border-solid border-[1px] border-transparent rounded-md hover:border-black`;

  const isLink = Component === TanStackLink;

  const isClickableElement = ["button", "a"].includes(Component as unknown as string) || isLink;

  const componentProps =
    isLink && to
      ? { to, className: baseStyles, onClick: isClickableElement && onClick } 
      : { className: baseStyles, onClick: isClickableElement && onClick };

  return React.createElement(Component, componentProps, children);
};

export default HoverBorderedEl;