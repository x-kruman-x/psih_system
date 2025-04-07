import { ProductCombinedData } from "@/modules/warehouse/products/types/ProductCombinedData";
import { useDeleteCategory } from "@/modules/warehouse/products/hooks/use-delete-category";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { Typography } from "@/shared/UI/Typography";
import { useDeleteProducts } from "@/modules/warehouse/products/hooks/use-delete-products";
import { HtmlHTMLAttributes, useState } from "react";

export function NewProductDialog({
  initialData,
  onClose,
}: {
  initialData: ProductCombinedData;
  onClose: () => void;
}) {
  const { deleteMutation } = useDeleteCategory();
  const { deleteProducts } = useDeleteProducts();

  const [isCategoryInput, setIsCategoryInput] = useState<Boolean>(true);
  const [isCollectionInput, setIsCollectionInput] = useState<Boolean>(true);
  return (
    <div className="border border-black border-solid rounded-md w-[75vw] h-[600px] fixed top-[20vh] left-1/2 -translate-x-1/2 bg-white z-30 flex flex-col">
      <div className="border-b border-black border-solid py-[12px] relative px-3 flex-shrink-0">
        <div className="flex items-center gap-6">
          <HoverBorderedEl className="cursor-pointer" onClick={onClose}>
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
        <div className="w-1/3 h-full overflow-auto relative">
          <Typography isGray className="text-center mb-3">
            категории
          </Typography>
          <div className="flex flex-col gap-2">
            {initialData.categories.map((category) => (
              <Typography key={category.id} className="text-center relative">
                {category.name}
                {/* TODO!: заменить X на img крестик */}
                <button
                  className="text-[14px] absolute left-[50px]"
                  // TODO: прилетает 500, ждем фикс
                  onClick={() => deleteMutation(category.id)}
                >
                  x
                </button>
              </Typography>
            ))}
          </div>
          {!isCategoryInput ? (
            <NewItemInput />
          ) : (
            <button
              className="absolute left-1/2 -translate-x-1/2 bottom-[70px]"
              onClick={() => setIsCategoryInput((prev) => !prev)}
            >
              +
            </button>
          )}
        </div>
        <div className="w-1/3 h-full overflow-auto relative">
          <Typography isGray className="text-center mb-3">
            коллекции
          </Typography>
          <div className="flex flex-col gap-2">
            {initialData.collections.map((collection) => (
              <Typography key={collection.id} className="text-center relative">
                {collection.name}
                {/* TODO: удаления коллекций еще нет */}
                <button className="text-[14px] absolute left-[50px]">x</button>
              </Typography>
            ))}
          </div>
          <button className="absolute left-1/2 -translate-x-1/2 bottom-[70px]">
            +
          </button>
        </div>
        <div className="w-1/3 h-full overflow-auto relative">
          <Typography isGray className="text-center mb-3">
            товар
          </Typography>
          <div className="flex flex-col gap-2">
            {initialData.products.map((product) => (
              <Typography key={product.id} className="text-center relative">
                {product.name}
                <button
                  className="text-[14px] absolute left-[50px]"
                  // TODO!: при удалении не обновляется список
                  onClick={() => deleteProducts([product.id])}
                >
                  x
                </button>
              </Typography>
            ))}
          </div>
          <button className="absolute left-1/2 -translate-x-1/2 bottom-[70px]">
            +
          </button>
        </div>
      </div>
      <div className="absolute left-1/2 bottom-[40px] -translate-x-1/2">
        {/* TODO!: сделать создание новых категорий и тд */}
        <HoverBorderedEl as="button">
          <Typography>Принять</Typography>
        </HoverBorderedEl>
      </div>
    </div>
  );
}

function NewProductCol({initialData, deleteFn}: {initialData: ProductCombinedData, deleteFn: () => void}){
  return (
    <div className="w-1/3 h-full overflow-auto relative">
          <Typography isGray className="text-center mb-3">
            категории
          </Typography>
          <div className="flex flex-col gap-2">
            {initialData.categories.map((category) => (
              <Typography key={category.id} className="text-center relative">
                {category.name}
                {/* TODO!: заменить X на img крестик */}
                <button
                  className="text-[14px] absolute left-[50px]"
                  // TODO: прилетает 500, ждем фикс
                  onClick={() => deleteMutation(category.id)}
                >
                  x
                </button>
              </Typography>
            ))}
          </div>
          {!isCategoryInput ? (
            <NewItemInput />
          ) : (
            <button
              className="absolute left-1/2 -translate-x-1/2 bottom-[70px]"
              onClick={() => setIsCategoryInput((prev) => !prev)}
            >
              +
            </button>
          )}
        </div>
  )
}

function NewItemInput({
  // value,
  // onChange,
}: {
  // value: string;
  // onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="relative flex justify-center mt-2">
      <button className="absolute left-[50px]">x</button>
      <input
        type="text"
        className="border border-black border-solid rounded-md px-1 py-[2px] text-[13px] leading-[17px]"
      />
    </div>
  );
}