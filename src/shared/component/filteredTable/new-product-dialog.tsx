import { BorderedElement } from "@/shared/UI/BorderedElement";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { Typography } from "@/shared/UI/Typography";

export function NewProductDialog() {
  return (
    <div className="border border-black border-solid rounded-md w-[75vw] h-[700px] fixed top-[20vh] left-1/2 -translate-x-1/2 bg-white z-30 flex flex-col">
      <div className="border-b border-black border-solid py-[12px] relative px-3 flex-shrink-0">
        <div className="flex items-center gap-6">
          <HoverBorderedEl>
            <Typography>Закрыть</Typography>
          </HoverBorderedEl>
          <Typography>Поиск</Typography>
        </div>
        <Typography className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          ПАРАМЕТРЫ ТОВАРОВ
        </Typography>
      </div>
      <div className="flex-1 flex divide-x-[1px] divide-black divide-solid">
        {/* TODO!: сделать отображение всех товаров, категорий и коллекций */}
        <div className="w-1/3 h-full overflow-auto">
          <Typography isGray className="text-center mb-3">
            категории
          </Typography>
        </div>
        <div className="w-1/3 h-full overflow-auto">
          <Typography isGray className="text-center mb-3">
            коллекции
          </Typography>
        </div>
        <div className="w-1/3 h-full overflow-auto">
          <Typography isGray className="text-center mb-3">
            товар
          </Typography>
        </div>
      </div>
      <div className="absolute left-1/2 bottom-[40px] -translate-x-1/2">
        <HoverBorderedEl as="button">
          <Typography>Принять</Typography>
        </HoverBorderedEl>
      </div>
    </div>
  );
}
