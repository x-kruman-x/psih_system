import { Column } from "@tanstack/react-table";
import { useState, useEffect } from "react";

export function Filter({ column }: { column: Column<any, unknown> }) {
    const columnFilterValue = column.getFilterValue();
  
    return (
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Search...`}
        className="focus:outline-none"
      />
    );
  }
  
  function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }: {
    value: string | number;
    onChange: (value: string[] | string) => void;
    debounce?: number;
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
    const [value, setValue] = useState(initialValue.toString());
  
    useEffect(() => {
      setValue(initialValue.toString());
    }, [initialValue]);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        const trimmedValue = value.trim();
        if (trimmedValue.includes(",")) {
          onChange(trimmedValue.split(",").map((item) => item.trim())); // Разделяем по запятой и удаляем пробелы
        } else {
          onChange(trimmedValue);
        }
      }, debounce);
  
      return () => clearTimeout(timeout);
    }, [value]);
  
    return (
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)} // Обновляем состояние при изменении
      />
    );
  }
  