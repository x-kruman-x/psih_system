import * as Dialog from "@radix-ui/react-dialog";
import HoverBorderedEl from "../../../../../shared/UI/HoverBorderedEl";
import { Typography } from "../../../../../shared/UI/Typography";
import { InputContainerWithHiddenText } from "../../../../../shared/UI/InputContainerWithHiddenText";

export function EditDataDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <HoverBorderedEl>
          <Typography>Редактировать</Typography>
        </HoverBorderedEl>
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* <Dialog.Overlay /> */}
        <Dialog.Content className="fixed left-1/2 top-1/2 h-[700px] w-[90vw] max-w-[1600px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white border border-black border-solid">
          <Dialog.Title className="border-b border-solid border-black flex items-center px-4 py-2 relative">
            <Dialog.Close>
              <button className="border border-solid border-black rounded-md p-[6px]">
                <Typography>Закрыть</Typography>
              </button>
            </Dialog.Close>
            <Typography className="absolute left-1/2 -translate-x-1/2">ЗАПОЛНИТЕ ВСЮ ИНФОРМАЦИЮ</Typography>
          </Dialog.Title>
          <Dialog.Description>
            <Typography className="text-center">способ доставки</Typography>
          </Dialog.Description>
          <div className="flex flex-col justify-center items-center mt-[190px]">
            <div className="grid grid-cols-3 grid-rows-2 gap-x-5 gap-y-2">
              <InputContainerWithHiddenText
                hiddenText="страна"
                inputText="Россия"
              />
              <InputContainerWithHiddenText
                hiddenText="город"
                inputText="Москва"
              />
              <InputContainerWithHiddenText
                hiddenText="улица"
                inputText="Кащенко"
              />
              <InputContainerWithHiddenText
                hiddenText="дом"
                inputText="6"
              />
              <InputContainerWithHiddenText
                hiddenText="квартира | офис"
                inputText="666"
              />
            </div>
            <Typography className="text-center mt-[30px] text-[#494949]">
              Кащенко 666
            </Typography>
            <Typography className="text-center mt-[66px]">Трек номер - 63936</Typography>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
