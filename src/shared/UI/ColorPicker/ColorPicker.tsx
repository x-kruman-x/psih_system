import { memo, useEffect, useRef, useState } from "react";
import styles from "./ColorPicker.module.css";
import { hsvaToHex, Hue, Saturation } from "@uiw/react-color";
import classNames from "classnames";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl.tsx";
import { Typography } from "@/shared/UI/Typography.tsx";
import { useOnClickOutside } from "usehooks-ts";

interface ColorPickerProps {
  className?: string;
  onChange?: (hex: string) => void;
}

const ColorPicker = memo(function ({ className, onChange }: ColorPickerProps) {
  const [hsva, setHsva] = useState({ h: 0, s: 0, v: 68, a: 1 });
  const [isOpen, setOpen] = useState(false);
  const pickerRef = useRef(null);

  useOnClickOutside(pickerRef, () => {
    setOpen(false);
  });

  useEffect(() => {
    if (onChange) {
      onChange(hsvaToHex(hsva));
    }
  }, [hsva]);

  return (
    <div className="relative">
      <HoverBorderedEl className={className} onClick={() => setOpen(true)}>
        <Typography className="flex gap-5 items-center justify-center">
          Выбрать цвет
          <div
            style={{
              backgroundColor: hsvaToHex(hsva),
            }}
            className={`w-[26px] h-[5px] rounded-sm`}
          ></div>
        </Typography>
      </HoverBorderedEl>
      {isOpen && (
        <div
          ref={pickerRef}
          className={classNames(
            "absolute top-0 w-[180px] h-[120px] p-2.5 flex bg-[#B5B2B2] gap-3 justify-center items-center rounded-[8px]",
            styles.root,
          )}
        >
          <Saturation
            style={{
              width: "125px",
              height: "100px",
              borderRadius: "5px",
            }}
            hsva={hsva}
            onChange={(color) => {
              setHsva(color);
            }}
          />
          <Hue
            direction="vertical"
            width="27px"
            height="100px"
            style={{
              borderRadius: "25px",
            }}
            hue={hsva.h}
            onChange={(hue) => {
              setHsva({ ...hsva, ...hue });
            }}
          />
        </div>
      )}
    </div>
  );
});

export { ColorPicker };
