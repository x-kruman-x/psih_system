import { Column, Table } from "@tanstack/react-table";
import { useState, useEffect } from "react";

export function TableFilter<T extends Record<string, any>>({ table }: { table: Table<T> }) {
  return (
    <div className="w-full flex">
      {table.getHeaderGroups().flatMap((headerGroup) =>
        headerGroup.headers.map((header) => {
          if (header.column.getCanFilter()) {
            return (
              <div
                key={header.id}
                className="w-1/6 flex border-r border-b border-black border-solid p-[15px] text-center last:border-r-0 transition-all duration-300"
              >
                <Filter column={header.column} />
              </div>
            );
          }
          return null;
        })
      )}
    </div>
  );
}

function FilterItem() {
  return (
    <div className="w-1/6 flex border-r border-b border-black border-solid p-[15px] text-center last:border-r-0 transition-all duration-300">
      <textarea
        className="w-full resize-none text-[13px] leading-[17px] text-black border-none overflow-visible focus:outline-none max-h-[50vh] h-auto"
        onInput={(event) => {
          const textarea = event.target as HTMLTextAreaElement;
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }}
      />
    </div>
  );
}
// не окончательный вариант
function Filter({ column }: { column: Column<any, unknown> }) {
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