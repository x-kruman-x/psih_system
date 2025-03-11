import { useDeletePage } from "@/shared/hooks/table/useDeletePage";
import { configTableType } from "@/shared/types/table/columnTableTypes";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/UI/sheet";
import { Typography } from "@/shared/UI/Text";

export function CardSheet({
  configTable,
  id,
}: {
  configTable: configTableType;
  id: number;
}) {
  const { deleteFunc, text } = useDeletePage(configTable);
  return (
    <Sheet>
      <SheetTrigger>
        <HoverBorderedEl>
          <Typography>Настройка</Typography>
        </HoverBorderedEl>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription>
            <div className="flex justify-center py-[46px] border-b border-b-black border-b-solid">
              <HoverBorderedEl as="button" onClick={() => deleteFunc(id)}>
                <Typography>Удалить {text}</Typography>
              </HoverBorderedEl>
            </div>
            <div className="flex flex-col justify-between">
              <div className="flex flex-col pt-[46px] gap-[46px]">
                <Typography className="text-center">Теги заказов</Typography>
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
