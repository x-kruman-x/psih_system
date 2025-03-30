import { Typography } from "../Typography";

type SelectButtonListElementProps = {
  text: string;
  backgroundColor: string;
  className?: string;
  onClick?: () => void
};

export const SelectButtonListElement = ({ text, backgroundColor, className = '', onClick }: SelectButtonListElementProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex justify-between items-center py-[7px] px-4 mb-[11px] border border-transparent border-solid rounded-md hover:border-black last:mb-0 ${className}`}
    >
      <div className={`w-6 h-1 rounded-[1px] ${backgroundColor}`}></div>
      <Typography className='grow'>{text}</Typography>
    </button>
  );
}