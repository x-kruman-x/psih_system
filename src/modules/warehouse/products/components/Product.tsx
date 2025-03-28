import { CardSettingsBar } from "@/shared/component/card/card-settings-bar";
import { ProductType } from "../types/productsTypes";
import { productsApi } from "../api/api";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Typography } from "@/shared/UI/Text";
import HoverBorderedEl from "@/shared/UI/HoverBorderedEl";

export function Product({ productData }: { productData: ProductType }) {
  const queryClient = useQueryClient();

  const cachedProducts = queryClient.getQueryData<ProductType>([
    productsApi.basekey,
    "getProducts",
  ]);
  const { data: products } = cachedProducts
    ? { data: cachedProducts }
    : useSuspenseQuery(productsApi.getProductsQueryOptions());
  return (
    <>
      <CardSettingsBar<ProductType, ProductType>
        pageType="product"
        items={products}
        itemsData={productData}
      />
      <div className="flex divide-x-[1px] divide-black divide-solid border-b-[1px] border-b-black border-solid">
        <div className="w-1/2 h-[300px]">
          <Typography isGray={true} className="text-center">
            все фото
          </Typography>
        </div>
        <div className="w-1/2">
          <Typography isGray={true} className="text-center">
            товар
          </Typography>
        </div>
      </div>
      <div className="py-[15px] flex justify-center  border-b-[1px] border-b-black">
        <HoverBorderedEl as="button">ПРЕДПРОСМОТР</HoverBorderedEl>
      </div>
    </>
  );
}
