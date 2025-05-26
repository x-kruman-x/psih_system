import React from "react";

type TextProps = {
  children: React.ReactNode;
  className?: string;
  isGray?: boolean;
  onClick?: () => void;
};

export const Typography = ({
  children,
  className = "",
  isGray = false,
  onClick,
}: TextProps) => {
  return (
    <p
      onClick={onClick}
      className={`${!isGray ? "text-black" : "text-[#8D8D8D]"} text-[13px] leading-[17px] ${className}`}
    >
      {children}
    </p>
  );
};
