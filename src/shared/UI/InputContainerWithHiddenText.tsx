import HoverBorderedEl from "./HoverBorderedEl";
import { Typography } from "./Typography";

interface OrderDataContainerProps {
  hiddenText: string;
  inputText?: string | number;
  textarea?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export function InputContainerWithHiddenText({
  hiddenText,
  inputText = "",
  textarea = false,
  onChange,
  inputProps,
}: OrderDataContainerProps) {
  return (
    <div className="flex flex-col gap-[3px] group/orderDataContainer">
      <Typography
        isGray={true}
        className={`${inputText !== "" ? "opacity-0 group-hover/orderDataContainer:opacity-100" : ""} transition`}
      >
        {hiddenText}
      </Typography>

      <HoverBorderedEl
        className={`text-center group-hover:border-black transition !p-0 ${inputText == "" ? "!border-black" : ""}`}
      >
        {!textarea ? (
          <input
            type="text"
            className="text-[13px] leading-[17px] text-black outline-none w-full px-1"
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            value={inputText}
            {...inputProps as React.InputHTMLAttributes<HTMLInputElement>}
          />
        ) : (
          <textarea
            className="text-[13px] leading-[17px] text-black outline-none w-full h-[212px] resize-none p-2"
            onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
            value={inputText}
            {...inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
          />
        )}
      </HoverBorderedEl>
    </div>
  );
}