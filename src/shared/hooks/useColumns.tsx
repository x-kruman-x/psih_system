import { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "../utils/formateDateTime";
import { CustomCheckbox } from "../UI/CustomCheckBox";
import { Typography } from "../UI/Text";
import { Link } from "@tanstack/react-router";
import { SelectCell } from "../component/selectCell";
import { filterIncludesSome } from "../utils/filterIncludesSome";
import { configTableType } from "../types/columnTableTypes";
import { CategoriesTypes } from "../types/categoriesTypes";
import { CategoriesButton } from "../component/table/categories-button";

export function useColumns<T extends Record<string, any>>(params: {
  configTable: configTableType;
  categoriesData?: CategoriesTypes;
}): ColumnDef<T>[] {
  const { configTable, categoriesData } = params;
  const contentThStyle = `!text-[#8D8D8D]`;
  const contentTdStyle = `py-[7px] mx-4 mb-[11px] border border-solid rounded-md group-hover:border-black`;

  const returnBorderStyle = (isSelected: boolean) => {
    return isSelected ? "border-black" : "border-transparent";
  };

  const ordersColumns: ColumnDef<T>[] = [
    {
      id: "Номер",
      accessorKey: "id",
      header: () => (
        <Typography className={`pl-[23px] ${contentThStyle}`}>номер</Typography>
      ),
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
              <Typography>{row.original.id}</Typography>
            </Link>
          </div>
        </div>
      ),
      filterFn: filterIncludesSome,
    },
    {
      id: "Дата",
      accessorKey: "order_date",
      header: () => <Typography className={contentThStyle}>дата</Typography>,
      cell: (props) => (
        <Typography
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())} `}
        >
          {formatDateTime(props.getValue<string>())}
        </Typography>
      ),
      filterFn: filterIncludesSome,
    },
    {
      id: "Покупатель",
      accessorKey: "full_name",
      header: () => (
        <Typography className={contentThStyle}>покупатель</Typography>
      ),
      cell: (props) => (
        <Typography
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
        >
          {props.getValue<string>()}
        </Typography>
      ),
      filterFn: filterIncludesSome,
    },
    {
      id: "Статус",
      accessorKey: "status",
      header: () => <Typography className={contentThStyle}>статус</Typography>,
      cell: (props) => (
        <SelectCell
          currentValue={props.getValue<string>()}
          buttonStyle={`${returnBorderStyle(props.row.getIsSelected())}`}
          orderId={props.row.original.id}
          btnType="status"
          refreshPlace="list"
          page="orders"
        />
      ),
      filterFn: filterIncludesSome,
    },
    {
      id: "Тег",
      accessorKey: "tag",
      header: () => <Typography className={contentThStyle}>тег</Typography>,
      cell: (props) => (
        <SelectCell
          currentValue={props.getValue<string>()}
          buttonStyle={`${returnBorderStyle(props.row.getIsSelected())}`}
          orderId={props.row.original.id}
          btnType="tag"
          refreshPlace="list"
          page="orders"
        />
      ),
      filterFn: filterIncludesSome,
    },
    {
      id: "Сумма",
      accessorKey: "amount",
      header: () => <Typography className={contentThStyle}>сумма</Typography>,
      cell: (props) => (
        <Typography
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
        >
          {props.getValue<number>() || 0}
        </Typography>
      ),
      filterFn: filterIncludesSome,
    },
  ];

  const partiesColumns: ColumnDef<T>[] = [
    {
      id: "Номер",
      accessorKey: "id",
      header: () => (
        <Typography className={`pl-[23px] ${contentThStyle}`}>номер</Typography>
      ),
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
              to="/parties/$partyId/edit"
              params={{
                partyId: row.original.id.toString(),
              }}
            >
              <Typography>{row.original.id}</Typography>
            </Link>
          </div>
        </div>
      ),
      filterFn: filterIncludesSome,
    },
    {
      id: "Дата",
      accessorKey: "party_date",
      header: () => <Typography className={contentThStyle}>дата</Typography>,
      cell: (props) => (
        <Typography
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())} `}
        >
          {formatDateTime(props.getValue<string>())}
        </Typography>
      ),
      filterFn: filterIncludesSome,
    },
    {
      id: "Поставщик",
      accessorKey: "agent_name",
      header: () => (
        <Typography className={contentThStyle}>покупатель</Typography>
      ),
      cell: (props) => (
        <Typography
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
        >
          {props.getValue<string>()}
        </Typography>
      ),
      filterFn: filterIncludesSome,
    },
    {
      id: "Статус",
      accessorKey: "status",
      header: () => <Typography className={contentThStyle}>статус</Typography>,
      cell: (props) => (
        <SelectCell
          currentValue={props.getValue<string>()}
          buttonStyle={`${returnBorderStyle(props.row.getIsSelected())}`}
          orderId={props.row.original.id}
          btnType="status"
          refreshPlace="list"
          page="parties"
        />
      ),
      filterFn: filterIncludesSome,
    },
    {
      id: "Тег",
      accessorKey: "tag",
      header: () => <Typography className={contentThStyle}>тег</Typography>,
      cell: (props) => (
        <SelectCell
          currentValue={props.getValue<string>()}
          buttonStyle={`${returnBorderStyle(props.row.getIsSelected())}`}
          orderId={props.row.original.id}
          btnType="tag"
          refreshPlace="list"
          page="parties"
        />
      ),
      filterFn: filterIncludesSome,
    },
    {
      id: "Сумма",
      accessorKey: "amount",
      header: () => <Typography className={contentThStyle}>сумма</Typography>,
      cell: (props) => (
        <Typography
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
        >
          {props.getValue<number>() || 0}
        </Typography>
      ),
      filterFn: filterIncludesSome,
    },
  ];

  const productsColumns: ColumnDef<T>[] = [
    {
      id: 'Категории',
      header: () => (
        <Typography className={`pl-[23px] ${contentThStyle}`}>категории</Typography>
      ),
      cell: () => {
        return (
          <div>
            {categoriesData ? (
              <CategoriesButton categoriesData={categoriesData} />
            ) : (
              <Typography>Нет категорий</Typography>
            )}
          </div>
        );
      },
    },
  ];

  switch (configTable) {
    case "orderTable":
      return ordersColumns;
    case "partiesTable":
      return partiesColumns;
    default:
      return [];
  }
}
