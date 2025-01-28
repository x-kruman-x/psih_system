import React from 'react';

type TextProps = {
  children: React.ReactNode;
  className?: string;
};

export const Text = ({ children, className = "" }: TextProps) => {
  return (
    <p className={`text-black text-[13px] leading-[17px] ${className}`}>
      {children}
    </p>
  );
};