//TODO: чекбоксы доделать
type CustomCheckboxProps = {
  className?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Добавляем пропс onChange
};

export const CustomCheckbox = ({
  className,
  checked,
  onChange,
  ...rest
}: CustomCheckboxProps) => {

  return (
    <>
      <input
        type="checkbox"
        className={`w-[18px] h-[18px] border border-black rounded-sm bg-white cursor-pointer accent-black p-1 ${className}`}
        checked={checked} 
        onChange={onChange} 
        {...rest}
      />
      {/* <label
        htmlFor="wr"
        className={`w-[18px] h-[18px] border border-black rounded-sm bg-white cursor-pointer relative ${className}`}
      >
        <span
          className={`w-[12px] h-[12px] bg-black rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
            checked ? "opacity-100" : "opacity-0"
          } transition-opacity duration-200`}
        ></span>
      </label> */}
    </>
  );
};
