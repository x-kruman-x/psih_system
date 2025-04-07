import { CardSettingsBar } from "@/shared/component/card/card-settings-bar";
import { PartiesType, PartyType } from "../../types/partiesTableTypes";
import { SelectCell } from "@/shared/component/selectCell";
import { Typography } from "@/shared/UI/Typography";
import { formatDateTime } from "@/shared/utils/formateDateTime";
import { InputContainerWithHiddenText } from "@/shared/UI/InputContainerWithHiddenText";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { FileContainer } from "@/shared/component/files/fileContainer";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { partiesApi } from "../../api/api";

type PartyProps = {
  partyData: PartyType;
};

export function Party({ partyData }: PartyProps) {
  const queryClient = useQueryClient();

  const cachedParties = queryClient.getQueryData<PartiesType[]>([partiesApi.basekey, 'getParties']);

  const { data: orders } = cachedParties
    ? { data: cachedParties }
    : useSuspenseQuery(partiesApi.getPartiesQueryOptions());
  return (
    <>
      <CardSettingsBar<PartiesType, PartyType> pageType="party" items={orders} itemsData={partyData}/>
      <div className="grid grid-cols-3 grid-rows-1 items-stretch">
        <div className="px-[30px] pb-[25px] flex flex-col border-b border-r border-black border-solid group/title">
          <h2 className="text-center mb-5 transition opacity-0 group-hover/title:opacity-100">
            <Typography isGray={true}>дополнительная информация</Typography>
          </h2>
          <div className="h-full flex flex-col justify-between">
            <div className="flex justify-between">
              <SelectCell
                currentValue={partyData.status}
                orderId={partyData.id}
                btnType={"status"}
                wFull={true}
                page='parties'
                refreshPlace="card"
              />
              <SelectCell
                currentValue={partyData.tag}
                orderId={partyData.id}
                btnType={"tag"}
                wFull={true}
                page='parties'
                refreshPlace="card"
              />
            </div>
            <Typography isGray={true} className="text-center">
              {formatDateTime(partyData.party_date)}
            </Typography>
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
            {/* TODO!:поменялся компонент, надо переделать */}
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
                {/* <Link to=""> */}
                <Typography>Сообщения</Typography>
                {/* </Link> */}
              </HoverBorderedEl>
            </div>
          </div>
        </div>
        <div className="col-start-3 row-start-1 row-span-2 group/title px-[50px] pb-[20px] border-b border-r border-black border-solid">
          <h2 className="text-center mb-5 transition opacity-0 group-hover/title:opacity-100">
            <Typography isGray={true}>файлы</Typography>
          </h2>
          <FileContainer files={partyData.files} id={partyData.id} savePlace='party'/>
        </div>
      </div>
    </>
  );
}
