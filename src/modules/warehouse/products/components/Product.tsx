import { CardSettingsBar } from "@/shared/component/card/card-settings-bar";
import { ProductType } from "../types/productsTypes";
import { productsApi } from "../api/api";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Typography } from "@/shared/UI/Typography";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { useEffect, useState } from "react";
import { BorderedLink } from "@/shared/UI/BorderedLink";
import { Outlet } from "@tanstack/react-router";
import { BorderedElement } from "@/shared/UI/BorderedElement";
import { DialogId, dialogStore } from "@/features/modalManager/dialogStore";
import { observer } from "mobx-react";
import { ProductDialog } from "./ProductDialog";
import getImgName from "@/shared/utils/getImgName";
import getFullImageUrl from "@/shared/utils/getFullImgName";

export const Product = observer(function ({
  productData,
}: {
  productData: ProductType;
}) {
  const queryClient = useQueryClient();

  const cachedProducts = queryClient.getQueryData<ProductType>([
    productsApi.basekey,
    "getProducts",
  ]);
  const { data: products } = cachedProducts
    ? { data: cachedProducts }
    : useSuspenseQuery(productsApi.getProductsQueryOptions());

  const [colourState, setColourState] = useState<"dark" | "pink">("pink");
  const { isDialogOpen, closeDialog, openDialog } = dialogStore;
  // useEffect(() => console.log('productData: ', productData), [productData])
  return (
    <>
      <CardSettingsBar<ProductType, ProductType>
        pageType="product"
        items={products}
        itemsData={productData}
      />
      <div className="flex divide-x-[1px] divide-black divide-solid border-b-[1px] border-b-black border-solid">
        <div className="w-1/2 flex flex-col">
          <Typography isGray={true} className="text-center">
            все фото
          </Typography>
          <div className="flex flex-wrap flex-grow overflow-y-auto">
            {productData?.images?.map((img) => (
              <div key={img.id} className="w-[299px] h-[299px] relative">
                {/* <button
                  className="absolute right-0 top-0 bg-white"
                  onClick={() => handleRemoveImage(index)}
                >
                  X
                </button> */}
                <img src={getFullImageUrl(img.url)} alt="img" className="w-full h-full" />
              </div>
            ))}
          </div>
          <div className="mb-2 flex justify-center">
            <HoverBorderedEl
              as="button"
              onClick={() => openDialog(DialogId.PRODUCTS_PHOTO)}
            >
              Редактировать
            </HoverBorderedEl>
          </div>
          {isDialogOpen(DialogId.PRODUCTS_PHOTO) && (
            <ProductDialog onClose={() => closeDialog()} productId={productData.id} />
          )}
        </div>
        <div className="w-1/2">
          <Typography isGray={true} className="text-center mb-4">
            товар
          </Typography>
          <div className="flex gap-[10px] w-[280px] mx-auto mb-8">
            <button
              className={`cursor-pointer h-[10px] transition-all duration-300 ${colourState == "pink" ? "w-[70%]" : "w-[30%]"}`}
              onClick={() => setColourState("pink")}
            >
              <div className="h-full w-full bg-[#DDA6A6] rounded-sm border border-black border-solid"></div>
            </button>
            <button
              className={`cursor-pointer h-[10px] transition-all duration-300 ${colourState == "dark" ? "w-[70%]" : "w-[30%]"}`}
              onClick={() => setColourState("dark")}
            >
              <div className="h-full w-full bg-[#000000] rounded-sm"></div>
            </button>
          </div>
          <div className="w-[280px] mx-auto flex justify-between mb-[10px]">
            <BorderedLink
              to="/warehouse/products/$productsId/edit/info"
              params={{
                productsId: productData.id.toString(),
              }}
            >
              <Typography>ДАННЫЕ ТОВАРА</Typography>
            </BorderedLink>
            <BorderedLink
              to="/warehouse/products/$productsId/edit/files"
              params={{
                productsId: productData.id.toString(),
              }}
            >
              <Typography>ФАЙЛЫ</Typography>
            </BorderedLink>
            <BorderedLink
              to="/warehouse/products/$productsId/edit/history"
              params={{
                productsId: productData.id.toString(),
              }}
            >
              <Typography>ИСТОРИЯ</Typography>
            </BorderedLink>
          </div>
          <Outlet />
        </div>
      </div>
      <div className="py-[10px] flex justify-center border-b-[1px] border-b-black">
        <HoverBorderedEl as="button">
          <Typography>ПРЕДПРОСМОТР</Typography>
        </HoverBorderedEl>
      </div>
    </>
  );
});
