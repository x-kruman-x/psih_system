import { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "../shared/utils/formateDateTime";
import { OrdersType } from "../modules/warehouse/orders/types/tableTypes";
import { Checkbox } from "../shared/UI/CheckBox";
import { Text } from "../shared/UI/Text";
import { Link } from "@tanstack/react-router";
import { StatusCell } from "../modules/status-cell/StatusCell";

export function useColumns(table: string) {
  const contentTdStyle = `py-[7px] mx-4 mb-[11px] border border-solid rounded-md group-hover:border-black`;

  const returnBorderStyle = (isSelected: boolean) => {
    return isSelected ? "border-black" : "border-transparent";
  };

  const orderColumns: ColumnDef<OrdersType>[] = [
    {
      id: "Номер",
      header: () => <Text className="pl-[23px] !text-[#8D8D8D]">номер</Text>,
      cell: ({ row }) => (
        <div
          className={`flex items-center justify-between gap-2 ${contentTdStyle} ${returnBorderStyle(row.getIsSelected())}`}
        >
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              onChange: row.getToggleSelectedHandler(),
            }}
            className="ml-[6px]"
          />
          <div className="grow">
            <Link to="">
              <Text>{row.original.id}</Text>
            </Link>
          </div>
        </div>
      ),
    },
    {
      id: "Дата",
      accessorKey: "order_date",
      header: () => <Text className="!text-[#8D8D8D]">дата</Text>,
      cell: (props) => (
        <Text
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())} `}
        >
          {formatDateTime(props.getValue<string>())}
        </Text>
      ),
    },
    {
      id: "Поставщик",
      accessorKey: "full_name",
      header: () => <Text className="!text-[#8D8D8D]">покупатель</Text>,
      cell: (props) => (
        <Text
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
        >
          {props.getValue<string>()}
        </Text>
      ),
    },
    {
      id: "Статус",
      accessorKey: "status",
      header: () => <Text className="!text-[#8D8D8D]">статус</Text>,
      cell: (props) => (
        <StatusCell status={props.getValue<string>()} />
      ),
    },
    {
      id: "Тег",
      accessorKey: "tag",
      header: () => <Text className="!text-[#8D8D8D]">тег</Text>,
      cell: (props) => (
        <Text
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
        >
          {props.getValue<string>()}
        </Text>
      ),
    },
    {
      id: "Сумма",
      accessorKey: "amount",
      header: () => <Text className="!text-[#8D8D8D]">сумма</Text>,
      cell: (props) => (
        <Text
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
        >
          {props.getValue<number>() || 0}
        </Text>
      ),
    },
  ];

  switch (table) {
    case "orderTable":
      return orderColumns;
    default:
      return [];
  }
}
