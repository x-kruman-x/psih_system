import { InputContainerWithHiddenText } from "@/shared/UI/InputContainerWithHiddenText";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProductType } from "../types/productsTypes";
import { productsApi } from "../api/api";
import { useQueryClient } from "@tanstack/react-query";
import { Typography } from "@/shared/UI/Typography";

export function ProductInfo({ initialData }: { initialData: ProductType }) {
  // const queryClient = useQueryClient();

  // const initialData = queryClient.getQueryData<ProductType>([
  //   productsApi.basekey,
  //   "getProduct",
  // ]);
  console.log(initialData);

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
      <div></div>
    </div>
  );
}
