import { Text } from "../Text";
import arrow from "../../../assets/img/arrow.svg";

type StatusButtonProps = {
  text: string;
  color: string;
  className?: string;
  imgStyle?: string;
  onClick: () => void;
};

export const StatusButton = ({
  text,
  color,
  className = "",
  imgStyle = "",
  onClick,
}: StatusButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex justify-between items-center py-[7px] px-4 mb-[11px] border border-transparent border-solid rounded-md group-hover:border-black ${className}`}
    >
      <div className={`w-6 h-1 rounded-[1px] bg-[${color}]`}></div>
      <Text>{text}</Text>
      <img className={`w-[15px] ${imgStyle}`} src={arrow} alt="arrow" />
    </button>
  );
};
