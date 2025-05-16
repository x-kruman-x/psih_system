import { Typography } from "@/shared/UI/Typography.tsx";
import arrow from "@/assets/img/arrow.svg";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl.tsx";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import classNames from "classnames";

type TItem = {
  key?: string | number | undefined;
  value: string;
};

interface OptionsProps {
  placeholder?: string;
  className: string | undefined;
  items: TItem[];
  value?: TItem["key"];
  onChange: (key: TItem["key"]) => void;
}

export default function Options({
  placeholder = "Выберите вариант",
  items,
  className,
  onChange,
  value,
}: OptionsProps) {
  const [selected, select] = useState<TItem | undefined>(undefined);
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    select(items?.find((item) => item?.key === value));
  }, [value]);

  const onItemSelect = (index: number) => {
    select(items[index]);
    onChange(items?.[index].key);
    setOpen(false);
  };

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  return (
    <div className={classNames("relative", className)} ref={ref}>
      <HoverBorderedEl
        className={classNames(
          "items-center flex h-full select-none cursor-pointer",
        )}
        onClick={() => setOpen(!isOpen)}
      >
        <Typography className="absolute left-1/2 transform -translate-x-1/2 text-[13px] leading-[17px] text-black text-center">
          {selected !== undefined ? selected.value : placeholder}
        </Typography>
        <img
          className={`w-[15px] ${isOpen ? "rotate-180" : "rotate-0"} duration-300 right-[10px] absolute`}
          src={arrow}
          alt="arrow"
        />
      </HoverBorderedEl>
      {isOpen && (
        <div className="absolute w-full border-solid border-[1px] backdrop-blur-[6px] rounded-md border-black opacity-100 flex flex-col top-[40px] z-10">
          {items.map((item, key) => {
            return (
              <>
                <Typography
                  key={item.key}
                  className="p-1 text-sm text-center select-none cursor-pointer"
                  onClick={() => onItemSelect(key)}
                >
                  <HoverBorderedEl>{item.value}</HoverBorderedEl>
                </Typography>
                {items.length > 1 && (
                  <div className="w-full bg-black h-[1px]" />
                )}
              </>
            );
          })}
        </div>
      )}
    </div>
  );
}
