import { InputContainerWithHiddenText } from "@/shared/UI/InputContainerWithHiddenText";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProductType } from "../types/productsTypes";
import { Typography } from "@/shared/UI/Typography";

export function ProductInfo({ initialData }: { initialData: ProductType }) {
  console.log(initialData);
  const remainsSum = initialData.modifications?.reduce((sum, modification) => {
    const remaining = Number(modification?.remaining) || 0;
    return sum + remaining;
  }, 0) ?? 0;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductType>({
    defaultValues: initialData,
  });

  useEffect(() => {
    if (errors.description) {
      toast.error(errors.description.message as string);
    }
  }, [errors.description]);

  const onSubmit = (data: ProductType) => {
    console.log("Отправленные данные:", data);
  };

  return (
    // TODO: сделать кнопку для сохранения изменений
    <div className="divide-y-[1px] divide-black divide-solid">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-[180px] flex flex-col gap-[6px] mb-14"
      >
        <div className="mx-auto w-[200px]">
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <InputContainerWithHiddenText
                onChange={onChange}
                hiddenText={"название товара"}
                inputText={value}
              />
            )}
          />
        </div>
        <div className="flex justify-between">
          <Controller
            name="cost_price"
            control={control}
            rules={{
              min: {
                value: 0,
                message: "Cебестоимость не может быть отрицательной",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <InputContainerWithHiddenText
                onChange={onChange}
                hiddenText={"себестоимость"}
                inputText={value}
              />
            )}
          />
          {/* TODO: не будет работать пока нет бека */}
          <InputContainerWithHiddenText hiddenText={"высота"} />
        </div>
        <div className="flex justify-between">
          <Controller
            name="price"
            control={control}
            rules={{
              min: {
                value: 0,
                message: "Cтоимость не может быть отрицательной",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <InputContainerWithHiddenText
                hiddenText={"стоимость"}
                inputText={value}
                onChange={onChange}
              />
            )}
          />
          <InputContainerWithHiddenText hiddenText={"вес"} />
          <InputContainerWithHiddenText hiddenText={"длина"} />
        </div>
        <div className="flex justify-between">
          <Controller
            name="discount_price"
            control={control}
            rules={{
              min: {
                value: 0,
                message: "Cтоимость со скидкой не может быть отрицательной",
              },
            }}
            render={({ field: { onChange, value } }) => (
              <InputContainerWithHiddenText
                hiddenText={"стоимость со скидкой"}
                inputText={value}
                onChange={onChange}
              />
            )}
          />
          <InputContainerWithHiddenText hiddenText={"объем"} />
          <InputContainerWithHiddenText hiddenText={"ширина"} />
        </div>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <InputContainerWithHiddenText
              textarea
              onChange={field.onChange}
              inputText={field.value}
              hiddenText="Описание"
            />
          )}
        />
        {/* <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Сохранить изменения
      </button> */}
      </form>
      {/* <Typography isGray className="text-center">
        Артикул - {initialData?.modifications[0]?.article}
      </Typography> */}
      <div className="flex flex-col items-center gap-[45px] mb-4">
        <Typography isGray>модификации</Typography>
        <div className="flex gap-5">
          {initialData.modifications?.map((modification) => (
            <Typography>{modification.size}</Typography>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            {initialData.modifications?.map((modification) => (
              <Typography isGray>
                {modification.size} - {modification.remaining} шт.
              </Typography>
            ))}
          </div>
          <Typography>Общее количетсво - {remainsSum} шт.</Typography>
        </div>
      </div>
    </div>
  );
}
