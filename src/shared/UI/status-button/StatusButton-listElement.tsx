import { Text } from "../Text";

type StatusButtonListElementProps = {
  text: string;
  color: string;
  className?: string;
  onClick?: () => void
};

export const StatusButtonListElement = ({ text, color, className = '', onClick }: StatusButtonListElementProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex justify-between items-center py-[7px] px-4 mb-[11px] border border-transparent border-solid rounded-md hover:border-black last:mb-0 ${className}`}
    >
      <div className={`w-6 h-1 rounded-[1px] bg-[${color}]`}></div>
      <Text className='grow'>{text}</Text>
    </button>
  );
}