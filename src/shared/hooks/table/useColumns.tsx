import { ColumnDef, Table } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";
import { RemainsDropDown } from "@/shared/component/remainsDropDown";
import { SelectCell } from "@/shared/component/selectCell";
import { configTableType } from "@/shared/types/table/columnTableTypes";
import { RemainsDropDownProps } from "@/shared/types/remainsDropDownProps";
import { CustomCheckbox } from "@/shared/UI/CustomCheckBox";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { Typography } from "@/shared/UI/Typography";
import { filterIncludesSome } from "@/shared/utils/filters/filterIncludesSome";
import { formatDateTime } from "@/shared/utils/formateDateTime";
import { filterByCategory } from "@/shared/utils/filters/filterByCategory";

export function useColumns<T extends Record<string, any>>(
  configTable: configTableType | "categories"
): ColumnDef<T>[] {
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
              to="/warehouse/orders/$orderId/edit"
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
              to="/warehouse/parties/$partyId/edit"
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
      id: "Товар",
      accessorKey: "name",
      header: () => (
        <Typography className={`${contentThStyle} pl-[27px]`}>товар</Typography>
      ),
      cell: ({ row }) => {
        // console.log(row)
        return (
          <div
            className={`flex items-center justify-between gap-2 ${contentTdStyle} ${returnBorderStyle(row?.getIsSelected())}`}
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
                to="/warehouse/products/$productsId/edit/info"
                params={{
                  productsId: row.original.id,
                }}
              >
                <Typography>{row.original.name}</Typography>
              </Link>
            </div>
          </div>
        );
      },
      // filterFn: filterByCategory,
    },
    {
      id: "Коллекция",
      // accessorKey: "name",
      header: () => (
        <Typography className={`${contentThStyle}`}>коллекция</Typography>
      ),
      cell: (props) => (
        <Typography
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
        >
          {props.getValue<string>()}
        </Typography>
      ),
      filterFn: filterByCategory,
    },
    {
      id: "Пол",
      // accessorKey: "name",
      header: () => (
        <Typography className={`${contentThStyle}`}>пол</Typography>
      ),
      cell: (props) => (
        <Typography
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
        >
          {props.getValue<string>()}
        </Typography>
      ),
      // filterFn: filterByCategory,
    },
    {
      id: "Остаток",
      // accessorKey: "name",
      header: () => (
        <Typography className={`${contentThStyle}`}>остаток</Typography>
      ),
      cell: (props) => (
        <Typography
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
        >
          {props.getValue<string>()}
        </Typography>
      ),
      // filterFn: filterByCategory,
    },
    {
      id: "Цена",
      accessorKey: "price",
      header: () => (
        <Typography className={`${contentThStyle}`}>цена</Typography>
      ),
      cell: (props) => (
        <Typography
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
        >
          {(props.getValue<number>() || 0) + "₽"}
        </Typography>
      ),
      // filterFn: filterByCategory,
    },
  ];

  const categoriesColumn: ColumnDef<T>[] = [
    {
      id: "Категории",
      accessorKey: "category.name",
      header: () => (
        <Typography className={`${contentThStyle}`}>категории</Typography>
      ),
      cell: ({ row }) => {
        if (Object.keys(row.original).length == 2) {
          return (
            <Typography className={`${contentTdStyle} border-transparent`}>
              {row.original.name}
            </Typography>
          );
        }
      },
      filterFn: filterIncludesSome,
    },
  ];

  const productRemainsColumns: ColumnDef<T>[] = [
    {
      id: "Наименование",
      accessorKey: "name",
      header: () => (
        <Typography className={contentThStyle}>наименование</Typography>
      ),
      cell: (props) => {
        return (
          <div
            className={`flex items-center justify-between gap-2 ${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())}`}
          >
            <CustomCheckbox
              {...{
                checked: props.row.getIsSelected(),
                disabled: !props.row.getCanSelect(),
                onChange: props.row.getToggleSelectedHandler(),
              }}
              className="ml-[6px]"
            />
            <div className="grow">
              <Typography>{props.getValue<string>()}</Typography>
            </div>
          </div>
        );
      },
      filterFn: filterIncludesSome,
    },
    {
      id: "Остаток",
      accessorKey: "modifications",
      header: () => <Typography className={contentThStyle}>остаток</Typography>,
      cell: (props) => {
        const remainsData = props.getValue<RemainsDropDownProps[]>();
        return <RemainsDropDown modifications={remainsData} />;
      },
      filterFn: filterIncludesSome,
    },
    {
      id: "Предзаказ",
      // accessorKey: "modifications",
      header: () => (
        <Typography className={contentThStyle}>предзаказ</Typography>
      ),
      cell: (props) => (
        <Typography
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())} `}
        >
          нет данных
        </Typography>
      ),
      filterFn: filterIncludesSome,
    },
    {
      id: "Себестоимость",
      accessorKey: "cost_price",
      header: () => (
        <Typography className={contentThStyle}>себестоимость</Typography>
      ),
      cell: (props) => (
        <Typography
          className={`${contentTdStyle} ${returnBorderStyle(props.row.getIsSelected())} `}
        >
          {props.getValue<number>()}
        </Typography>
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
          page="remains"
        />
      ),
      filterFn: filterIncludesSome,
    },
    {
      id: "Сумма",
      // accessorKey: "amount",
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

  switch (configTable) {
    case "orderTable":
      return ordersColumns;
    case "partiesTable":
      return partiesColumns;
    case "productsTable":
      return productsColumns;
    case "categories":
      return categoriesColumn;
    case "remainsTable":
      return productRemainsColumns;
    default:
      return [];
  }
}
