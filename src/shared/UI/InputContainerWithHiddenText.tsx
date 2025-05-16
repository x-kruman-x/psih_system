import React, { forwardRef } from "react";
import HoverBorderedEl from "./HoverBorderedEl";
import { Typography } from "./Typography";
import classNames from "classnames";

type InputContainerWithHiddenTextProps = {
  hiddenText: string;
  textarea?: boolean;
  inputText?: string | number;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

export const InputContainerWithHiddenText = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputContainerWithHiddenTextProps
>(function (
  { hiddenText, textarea = false, inputText = "", className, ...inputProps },
  ref,
) {
  return (
    <div
      className={classNames(
        className,
        "flex flex-col gap-[3px] group/orderDataContainer",
      )}
    >
      <Typography
        isGray
        className={`${
          inputText !== ""
            ? "opacity-0 group-hover/orderDataContainer:opacity-100"
            : ""
        } transition`}
      >
        {hiddenText}
      </Typography>

      <HoverBorderedEl
        className={`text-center group-hover:border-black transition !p-[2px] ${
          inputText === "" ? "!border-black" : ""
        }`}
      >
        {!textarea ? (
          <input
            type="text"
            className="text-[13px] leading-[17px] text-black outline-none w-full px-1"
            ref={ref as React.Ref<HTMLInputElement>}
            {...(inputProps as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        ) : (
          <textarea
            className="text-[13px] leading-[17px] text-black outline-none w-full h-[212px] resize-none p-2"
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...(inputProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        )}
      </HoverBorderedEl>
    </div>
  );
});
