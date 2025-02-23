import HoverBorderedEl from "../../../../../shared/UI/HoverBorderedEl";
import { Typography } from "../../../../../shared/UI/Text";

type OrderDataContainerProps = {
  hiddenText: string;
  infoText: string;
  button?: boolean;
  isHiddenText?: boolean;
  border?: boolean;
};

export function DataContainerWithHidddenText({
  hiddenText,
  infoText,
  button = false,
  // оставить скрываемый текст
  isHiddenText = true,
  // постоянные границы у элемента
  border = false,
}: OrderDataContainerProps) {
  return (
    <div className="flex flex-col gap-3 group/orderDataContainer">
      <Typography
        isGray={true}
        className={`${isHiddenText ? "opacity-0 group-hover/orderDataContainer:opacity-100" : ""} transition`}
      >
        {hiddenText}
      </Typography>
      <HoverBorderedEl
        className={`text-center group-hover:border-black transition ${border ? "!border-black" : ""}`}
      >
        {!button ? (
          <Typography>{infoText}</Typography>
        ) : (
          <button>
            <img src="" alt="" />
          </button>
        )}
      </HoverBorderedEl>
    </div>
  );
}
