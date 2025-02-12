import { Link } from "@tanstack/react-router";
import HoverBorderedEl from "../../../../shared/UI/HoverBorderedEl";
import { Text } from "../../../../shared/UI/Text";
import { EditDataDialog } from "./edit-data-dialog";
import { OrderDataContainer } from "./order-data-container";
import { orderType } from "../types/ordersTableTypes";
import { SelectCell } from "../../../../shared/component/selectCell";
import { formatDateTime } from "../../../../shared/utils/formateDateTime";

type OrderProps = {
  orderData: orderType;
};

export function Order({ orderData }: OrderProps) {
  return (
    <>
      <div className="grid grid-cols-3 grid-rows-2 border-b border-black border-solid">
        <div className="row-span-2 px-20 pb-[23px] border-r border-black border-solid">
          <h2 className="text-center">
            <Text isGray={true}>информация доставки</Text>
          </h2>
          <div className="mt-[100px] grid grid-cols-3 grid-rows-2 gap-x-5 gap-y-2">
            <OrderDataContainer hiddenText="страна" infoText="Россия" />
            <OrderDataContainer hiddenText="город" infoText="Москва" />
            <OrderDataContainer hiddenText="страна" infoText="Россия" />
            <OrderDataContainer hiddenText="улица" infoText="Кащенко" />
            <OrderDataContainer hiddenText="дом" infoText="6" />
            <OrderDataContainer hiddenText="квартира | офис" infoText="666" />
          </div>
          <Text className="text-center mt-[30px] text-[#494949]">
            Кащенко 666
          </Text>
          <Text className="text-center mt-[66px]">63936</Text>
          {/* TODO: доделать изменение данных */}
          <div className="flex justify-center mt-[66px]">
            <EditDataDialog />
          </div>
        </div>
        <div className="border-b border-r border-black border-solid px-20 pb-[30px]">
          <h2 className="text-center mb-5">
            <Text isGray={true}>данные заказа</Text>
          </h2>
          <div className="flex justify-center">
            <HoverBorderedEl>
              <Text>Дарков Владислав</Text>
            </HoverBorderedEl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2">
            <div className="flex flex-col gap-2 items-start row-span-2">
              <OrderDataContainer
                hiddenText="email"
                infoText="dotdarkk@gmail.com"
              />
              <OrderDataContainer hiddenText="телефон" infoText="89639366661" />
            </div>
            <div className="flex justify-end items-end">
              <HoverBorderedEl>
                <Link to="">
                  <Text>Сообщения</Text>
                </Link>
              </HoverBorderedEl>
            </div>
          </div>
        </div>
        <div className="col-start-2 row-start-2 border-r border-black border-solid px-[35px] py-[30px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <SelectCell currentValue={orderData.status} orderId={orderData.id} btnType={"status"} wFull={true} />
            <SelectCell currentValue={orderData.tag} orderId={orderData.id} btnType={"tag"} wFull={true} />
          </div>
          <Text isGray={true} className="text-center">{formatDateTime(orderData.order_date)}</Text>
        </div>
        <div className="col-start-3 row-start-1 row-span-2">Div 4</div>
      </div>
    </>
  );
}
