import { CardSettingsBar } from "@/shared/component/card/card-settings-bar";
import { ProductType } from "../types/productsTypes";
import { productsApi } from "../api/api";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Typography } from "@/shared/UI/Typography";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";
import { useState } from "react";
import { BorderedLink } from "@/shared/UI/BorderedLink";
import { Outlet } from "@tanstack/react-router";

export function Product({ productData }: { productData: ProductType }) {
  const queryClient = useQueryClient();

  const cachedProducts = queryClient.getQueryData<ProductType>([
    productsApi.basekey,
    "getProducts",
  ]);
  const { data: products } = cachedProducts
    ? { data: cachedProducts }
    : useSuspenseQuery(productsApi.getProductsQueryOptions());

  const [colourState, setColourState] = useState<"dark" | "pink">("pink");

  return (
    <>
      <CardSettingsBar<ProductType, ProductType>
        pageType="product"
        items={products}
        itemsData={productData}
      />
      <div className="flex divide-x-[1px] divide-black divide-solid border-b-[1px] border-b-black border-solid">
        <div className="w-1/2">
          <Typography isGray={true} className="text-center">
            все фото
          </Typography>
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
              to="/products/$productsId/edit/info"
              params={{
                productsId: productData.id.toString(),
              }}
            >
              <Typography>ДАННЫЕ ТОВАРА</Typography>
            </BorderedLink>
            <BorderedLink
              to="/products/$productsId/edit/files"
              params={{
                productsId: productData.id.toString(),
              }}
            >
              <Typography>ФАЙЛЫ</Typography>
            </BorderedLink>
            <BorderedLink
              to="/products/$productsId/edit/history"
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
}
