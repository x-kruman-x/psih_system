import { configTableType } from "@/shared/types/table/columnTableTypes";
import { CustomCheckbox } from "@/shared/UI/CustomCheckBox";
import { Typography } from "@/shared/UI/Text";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "lucide-react";

export function useCardColumns<T extends Record<string, any>>(
  configTable: configTableType
): ColumnDef<T>[] {
  const contentThStyle = `!text-[#8D8D8D]`;
  const contentTdStyle = `py-[7px] mx-4 mb-[11px] border border-solid rounded-md group-hover:border-black`;

  const returnBorderStyle = (isSelected: boolean) => {
    return isSelected ? "border-black" : "border-transparent";
  };

  const orderColumns: ColumnDef<T>[] = [
    {
      id: "Товар",
      // accessorKey: "id",
      header: () => (
        <Typography className={`pl-[23px] ${contentThStyle}`}>товар</Typography>
      ),
      cell: ({ row }) => {
        return (
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
              <div className="flex justify-around items-center">
                <Typography>
                  {row.original.modification?.productInfo?.name}
                </Typography>
                <Typography>
                  {
                    row.original.modification?.productInfo?.modifications[0]
                      ?.size
                  }
                </Typography>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      id: "Коллекция",
      // accessorKey: "order_date",
      header: () => (
        <Typography className={contentThStyle}>коллекция</Typography>
      ),
      // cell: (props) => (
      //   <Typography
      //     className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())} `}
      //   >
      //     {formatDateTime(props.getValue<string>())}
      //   </Typography>
      // ),
    },
    {
      id: "Цена",
      accessorKey: "modification.productInfo.price",
      header: () => <Typography className={contentThStyle}>цена</Typography>,
      cell: (props) => {
        console.log(props);
        return (
          <Typography
            className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
          >
            {props.row.original?.modification?.productInfo?.price}
          </Typography>
        );
      },
    },
    {
      id: "Количество",
      accessorKey: "amount",
      header: () => (
        <Typography className={contentThStyle}>количество</Typography>
      ),
      // cell: (props) => {
      //   console.log(props)
      //   return (
      //   <Typography
      //     className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
      //   >
      //     {props.row.original?.modification?.productInfo?.price}
      //   </Typography>
      // )},
    },
    {
      id: "Остаток",
      accessorKey: "modification.remaining",
      header: () => <Typography className={contentThStyle}>остаток</Typography>,
      cell: (props) => {
        console.log(props);
        return (
          <Typography
            className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
          >
            {props.row.original?.modification?.remaining}
          </Typography>
        );
      },
    },
    {
      id: "Сумма",
      // accessorKey: "modification.remaining",
      header: () => <Typography className={contentThStyle}>сумма</Typography>,
      cell: (props) => {
        console.log(props);
        return (
          <Typography
            className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
          >
            {props.row.original?.modification?.productInfo?.price * 1 + ' р'}
          </Typography>
        );
      },
    },
  ];

  switch (configTable) {
    case "orderTable":
      return orderColumns;
    case "partiesTable":
      return [];
    case "productsTable":
      return [];
    case "remainsTable":
      return [];
    default:
      return [];
  }
}
