import React from 'react';

type TextProps = {
  children: React.ReactNode;
  className?: string;
  isGray?: boolean;
};

export const Typography = ({ children, className = "", isGray = false }: TextProps) => {
  return (
    <p className={`${!isGray ? 'text-black' : 'text-[#8D8D8D]'} text-[13px] leading-[17px] ${className}`}>
      {children}
    </p>
  );
};