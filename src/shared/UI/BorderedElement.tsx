import React from 'react';

type BorderedElementProps = {
  children?: React.ReactNode;
  variant?: 'default' | 'button';
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  type?: string;
  name?: string;
  onClick?: () => void; 
  disabled?: boolean;
};

export const BorderedElement = ({
  children,
  variant = 'default',
  as: Tag = 'input',
  className = "",
  type = '',
  name = '',
  onClick,
  disabled = false,
}: BorderedElementProps) => {
  let baseClasses = '';

  switch (variant) {
    case 'button':
      // TODO!: добавить новые стили
      baseClasses = 'py-[6px] flex justify-center border border-[1px] border-black rounded-md text-[13px] leading-[17px]';
      break;
    default:
      baseClasses = 'border border-[1px] border-black rounded-md py-[6px] pl-[5px] text-[13px] leading-[17px]';
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (Tag === 'input') {
    return (
      <Tag
        type={type}
        name={name}
        className={`${baseClasses} ${className}`}
        disabled={disabled}
      />
    );
  }

  return (
    <Tag
      className={`${baseClasses} ${className}`}
      onClick={Tag === 'button' ? handleClick : undefined}
      disabled={disabled}
    >
      {children}
    </Tag>
  );
};