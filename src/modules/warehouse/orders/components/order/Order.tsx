import { Link } from "@tanstack/react-router";
import HoverBorderedEl from "../../../../../shared/UI/HoverBorderedEl";
import { Typography } from "../../../../../shared/UI/Typography";
import { InputContainerWithHiddenText } from "../../../../../shared/UI/InputContainerWithHiddenText";
import { OrdersType, OrderType } from "../../types/ordersTableTypes";
import { SelectCell } from "../../../../../shared/component/selectCell";
import { formatDateTime } from "../../../../../shared/utils/formateDateTime";
import { FileContainer } from "../../../../../shared/component/files/fileContainer";
import { CardSettingsBar } from "@/shared/component/card/card-settings-bar";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { ordersApi } from "../../api/api";
import { CardTableDataValidation } from "@/shared/component/cardTable/CardTableDataValidation";
import { CardTable } from "@/shared/component/cardTable/CardTable";

type OrderProps = {
  orderData: OrderType;
};

export function Order({ orderData }: OrderProps) {
  const queryClient = useQueryClient();
  
  const cachedOrders = queryClient.getQueryData<OrdersType[]>([ordersApi.basekey, "getOrders"]);
  const { data: orders } = cachedOrders ? { data: cachedOrders } : useSuspenseQuery(ordersApi.getOrdersQueryOptions());
  return (
    <>
      <CardSettingsBar<OrdersType, OrderType> pageType={"order"} items={orders} itemsData={orderData}/>
      <div className="grid grid-cols-3 grid-rows-2 border-b border-black border-solid">
        <div className="row-span-2 px-20 pb-[23px] border-r border-black border-solid group/title">
          <h2 className="text-center transition opacity-0 group-hover/title:opacity-100">
            <Typography isGray={true}>информация доставки</Typography>
          </h2>
            {/* TODO!:поменялся компонент, надо переделать */}
            <div className="mt-[100px] grid grid-cols-3 grid-rows-2 gap-x-5 gap-y-2">
            <InputContainerWithHiddenText
              hiddenText="страна"
              inputText="Россия"
            />
            <InputContainerWithHiddenText
              hiddenText="город"
              inputText="Москва"
            />
            <InputContainerWithHiddenText
              hiddenText="страна"
              inputText="Россия"
            />
            <InputContainerWithHiddenText
              hiddenText="улица"
              inputText="Кащенко"
            />
            <InputContainerWithHiddenText hiddenText="дом" inputText="6" />
            <InputContainerWithHiddenText
              hiddenText="квартира | офис"
              inputText="666"
            />
          </div>
          <Typography className="text-center mt-[30px] text-[#494949]">
            Кащенко 666
          </Typography>
          <Typography className="text-center mt-[66px]">63936</Typography>
          {/* TODO: дождаться интеграции с сервисами */}
          <div className="flex justify-center mt-[66px]">
            {/* <EditDataDialog /> */}
          </div>
        </div>
        <div className="border-b border-r border-black border-solid px-20 pb-[30px] group/title">
          <h2 className="text-center mb-5 transition opacity-0 group-hover/title:opacity-100">
            <Typography isGray={true}>данные заказа</Typography>
          </h2>
          <div className="flex justify-center">
            <HoverBorderedEl>
              <Typography>Дарков Владислав</Typography>
            </HoverBorderedEl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2">
            <div className="flex flex-col gap-2 items-start row-span-2">
              <InputContainerWithHiddenText
                hiddenText="email"
                inputText="dotdarkk@gmail.com"
              />
              <InputContainerWithHiddenText
                hiddenText="телефон"
                inputText="89639366661"
              />
            </div>
            <div className="flex justify-end items-end">
              <HoverBorderedEl>
                <Link to="">
                  <Typography>Сообщения</Typography>
                </Link>
              </HoverBorderedEl>
            </div>
          </div>
        </div>
        <div className="col-start-2 row-start-2 border-r border-black border-solid px-[35px] pb-[30px] flex flex-col justify-between group/title">
          <h2 className="text-center mb-5 transition opacity-0 group-hover/title:opacity-100">
            <Typography isGray={true}>дополнительная информация</Typography>
          </h2>
          <div className="flex items-center justify-between">
            <SelectCell
              currentValue={orderData.status}
              orderId={orderData.id}
              btnType={"status"}
              wFull={true}
              refreshPlace="card"
              page="orders"
            />
            <SelectCell
              currentValue={orderData.tag}
              orderId={orderData.id}
              btnType={"tag"}
              wFull={true}
              refreshPlace="card"
              page="orders"
            />
          </div>
          <Typography isGray={true} className="text-center">
            {formatDateTime(orderData.order_date)}
          </Typography>
        </div>
        <div className="col-start-3 row-start-1 row-span-2 group/title px-[50px] pb-[20px]">
          <h2 className="text-center mb-5 transition opacity-0 group-hover/title:opacity-100">
            <Typography isGray={true}>файлы</Typography>
          </h2>
          <FileContainer
            files={orderData.files}
            id={orderData.id}
            savePlace="order"
          />
        </div>
      </div>
      <CardTableDataValidation products={orderData.modifications_in_order} configTable='orderTable' />
      {/* <CardTable data={orderData.modifications_in_order} configTable='orderTable' /> */}
    </>
  );
}
