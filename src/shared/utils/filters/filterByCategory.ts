import { Row } from "@tanstack/react-table";

export const filterByCategory = <T extends Record<string, any>>(
  row: Row<T>,
  value: string
) => {
  console.log(row, value)
  if (!value) return true;

  const category = row.original?.category?.name?.toLowerCase();

  if (!category) return false;

  return category === value.toString().toLowerCase();
};