import { Row } from "@tanstack/react-table";

export const filterIncludesSome = <T extends Record<string, any>>(
  row: Row<T>,
  columnId: string,
  value: any
) => {
  if (!value || value.length === 0) return true;

  const rowValue =
    row.getValue<string>(columnId)?.toString().toLowerCase() || "";

  if (Array.isArray(value)) {
    return value.some((v) => rowValue.includes(v.toString().toLowerCase()));
  }

  return rowValue.includes(value.toString().toLowerCase());
};
