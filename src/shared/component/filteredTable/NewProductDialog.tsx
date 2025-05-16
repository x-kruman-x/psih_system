import { Typography } from "@/shared/UI/Typography.tsx";
import { InputContainerWithHiddenText } from "@/shared/UI/InputContainerWithHiddenText.tsx";
import { ColorPicker } from "@/shared/UI/ColorPicker";
import { memo } from "react";
import Options from "@/shared/UI/Options.tsx";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl.tsx";
import { Controller, useForm } from "react-hook-form";

type NewProductFields = {
  title: string;
  costPrice?: string;
  height?: string;
  amount?: string;
  weight?: string;
  length?: string;
  discountAmount?: string;
  volume?: string;
  width?: string;
  description?: string;
  color?: string;
  sex?: string;
  size?: string;
};

const NewProductDialog = memo(function NewProductDialog() {
  const sizes = ["xss", "xs", "s", "m", "l", "xl", "xxl", "xxxl"];

  const { handleSubmit, register, control } = useForm<NewProductFields>();

  const onSubmit = (data: NewProductFields) => {
    console.log(data);
  };
  return (
    <div className="fixed left-1/2 top-1/2 w-[90vw] max-w-[1600px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white border border-black border-solid">
      <div className="border-b border-solid border-black flex items-center px-4 py-2 relative">
        <button className="border border-solid border-black rounded-md p-[6px]">
          <Typography>Закрыть</Typography>
        </button>
        <Typography className="absolute left-1/2 -translate-x-1/2">
          ЗАПОЛНИТЕ ВСЮ ИНФОРМАЦИЮ
        </Typography>
      </div>
      <div>
        <Typography className="text-center">информация о товаре</Typography>
      </div>
      <div className="flex flex-col justify-center items-center py-[30px]">
        <div>
          <div className="grid grid-cols-3 grid-rows-4 gap-x-5 gap-y-2">
            <InputContainerWithHiddenText
              hiddenText="название товара"
              className="col-span-3"
              {...register("title")}
            />
            <InputContainerWithHiddenText hiddenText="себестоимость" />
            <InputContainerWithHiddenText
              hiddenText="высота"
              className="col-start-3"
              {...register("height")}
            />
            <InputContainerWithHiddenText
              hiddenText="стоимость"
              {...register("amount")}
            />
            <InputContainerWithHiddenText
              hiddenText="вес"
              {...register("weight")}
            />
            <InputContainerWithHiddenText
              hiddenText="длина"
              {...register("length")}
            />
            <InputContainerWithHiddenText
              hiddenText="стоимость со скидкой"
              {...register("discountAmount")}
            />
            <InputContainerWithHiddenText
              hiddenText="объем"
              {...register("volume")}
            />
            <InputContainerWithHiddenText
              hiddenText="ширина"
              {...register("width")}
            />
            <InputContainerWithHiddenText
              className="col-span-3"
              hiddenText="описание"
              textarea
              {...register("description")}
            />
            <div className="col-span-3 flex gap-[3px]  justify-around">
              <Controller
                name="color"
                control={control}
                render={({ field: { onChange } }) => (
                  <ColorPicker onChange={onChange} />
                )}
              />
              <Controller
                name="sex"
                control={control}
                render={({ field: { onChange, value } }) => (
                  /* TODO: пофиксить фиксированную ширину */
                  <Options
                    className="w-[140px]"
                    items={[
                      { key: "male", value: "Мужское" },
                      { key: "female", value: "Женское" },
                    ]}
                    value={value}
                    placeholder="Пол"
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>
          <div className="w-full h-[1px] mt-4 bg-black"></div>
          <div className="flex flex-col gap-4 justify-center">
            <Typography className="text-center opacity-60 mt-2">
              модификации
            </Typography>
            <Controller
              name="size"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="flex gap-1 justify-center">
                  {sizes.map((size) => {
                    return (
                      <HoverBorderedEl
                        key={size}
                        className="select-none cursor-pointer"
                        isActive={value === size}
                        onClick={() => onChange(size)}
                      >
                        <Typography>{size}</Typography>
                      </HoverBorderedEl>
                    );
                  })}
                </div>
              )}
            />

            <HoverBorderedEl
              as="button"
              className="mx-auto"
              onClick={handleSubmit(onSubmit)}
            >
              <Typography>ПРИНЯТЬ</Typography>
            </HoverBorderedEl>
          </div>
        </div>
      </div>
    </div>
  );
});

export { NewProductDialog };
