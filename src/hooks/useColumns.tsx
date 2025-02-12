import { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "../shared/utils/formateDateTime";
import { CustomCheckbox } from "../shared/UI/CustomCheckBox";
import { Text } from "../shared/UI/Text";
import { Link } from "@tanstack/react-router";
import { SelectCell } from "../shared/component/selectCell";

export function useColumns<T extends Record<string, any>>(table: string): ColumnDef<T>[]   {
  const contentThStyle = `!text-[#8D8D8D]`;
  const contentTdStyle = `py-[7px] mx-4 mb-[11px] border border-solid rounded-md group-hover:border-black`;

  const returnBorderStyle = (isSelected: boolean) => {
    return isSelected ? "border-black" : "border-transparent";
  };

  const orderColumns: ColumnDef<T>[] = [
    {
      id: "Номер",
      header: () => <Text className={`pl-[23px] ${contentThStyle}`}>номер</Text>,
      cell: ({ row }) => (
        <div
          className={`flex items-center justify-between gap-2 ${contentTdStyle} ${returnBorderStyle(row.getIsSelected())}`}
        >
          <CustomCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              onChange: row.getToggleSelectedHandler(),
            }}
            className="ml-[6px]"
          />
          <div className="grow">
            <Link
              to="/orders/$orderId/edit"
              params={{
                orderId: row.original.id.toString(),
              }}
            >
              <Text>{row.original.id}</Text>
            </Link>
          </div>
        </div>
      ),
    },
    {
      id: "Дата",
      accessorKey: "order_date",
      header: () => <Text className={contentThStyle}>дата</Text>,
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
      header: () => <Text className={contentThStyle}>покупатель</Text>,
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
      header: () => <Text className={contentThStyle}>статус</Text>,
      cell: (props) => (
        <SelectCell
          currentValue={props.getValue<string>()}
          buttonStyle={`${returnBorderStyle(props.row.getIsSelected())}`}
          orderId={props.row.original.id}
          btnType='status'
        />
      ),
    },
    {
      id: "Тег",
      accessorKey: "tag",
      header: () => <Text className={contentThStyle}>тег</Text>,
      cell: (props) => (
        <SelectCell
          currentValue={props.getValue<string>()}
          buttonStyle={`${returnBorderStyle(props.row.getIsSelected())}`}
          orderId={props.row.original.id}
          btnType="tag"
        />
      ),
    },
    {
      id: "Сумма",
      accessorKey: "amount",
      header: () => <Text className={contentThStyle}>сумма</Text>,
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
