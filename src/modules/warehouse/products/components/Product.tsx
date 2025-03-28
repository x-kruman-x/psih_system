import { CardSettingsBar } from "@/shared/component/card/card-settings-bar";
import { ProductType } from "../types/productsTypes";
import { productsApi } from "../api/api";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

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
      <CardSettingsBar<ProductType, ProductType> pageType="product" items={products} itemsData={productData} />
      <div className="flex">
        <div className="w-1/2"></div>
        <div className="w-1/2"></div>
      </div>
    </>
  );
}
