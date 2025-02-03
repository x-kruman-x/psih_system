import { HTMLProps } from 'react';

type CheckboxProps = {
  className?: string;
} & Omit<HTMLProps<HTMLInputElement>, 'type'>; 

export const Checkbox = ({ className = '', ...props }: CheckboxProps) => {
  return (
    <input
      type="checkbox"
      className={`w-[18px] h-[18px] border border-gray-300 rounded-sm bg-white cursor-pointer checked:bg-black focus:ring-0 ${className}`}
      {...props}
    />
  );
};