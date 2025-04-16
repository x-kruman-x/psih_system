import { productsApi } from "@/modules/warehouse/products/api/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FilteredTable } from "./filteredTable";
import { ProductCombinedData } from "@/modules/warehouse/products/types/ProductCombinedData";
import { toast } from "sonner";
import { ProductType } from "@/modules/warehouse/products/types/productsTypes";
import { useEffect } from "react";

export function ArchivePopup({ isShowArchive }: { isShowArchive: boolean }) {
  const queryClient = useQueryClient();

  const productsQuery = useQuery({
    ...productsApi.getProductsQueryOptions(true),
    enabled: isShowArchive,
    staleTime: 60_000,
    initialData: () =>
      queryClient.getQueryData<ProductType>([
        productsApi.basekey,
        "getProducts",
        true,
      ]),
  });

  const categoriesQuery = useQuery({
    ...productsApi.getCategoriesQueryOptions(),
    enabled: isShowArchive,
    staleTime: Infinity,
    initialData: () =>
      queryClient.getQueryData<ProductType>([
        productsApi.basekey,
        "getCategories",
      ]),
  });

  useEffect(() => {
    if (productsQuery.isError) toast.error("Ошибка загрузки архивных товаров");
    if (categoriesQuery.isError) toast.error("Ошибка загрузки категорий");
  }, [productsQuery.isError, categoriesQuery.isError]);

  const combinedData: ProductCombinedData = {
    products: productsQuery.data ?? [],
    categories: categoriesQuery.data ?? [],
    collections: [],
  };

  if (!isShowArchive) return null;

  return (
    <div className="absolute h-[300px] left-1/2 -translate-x-1/2 top-[300px] bg-white border border-black border-solid rounded-md">
      <FilteredTable combinedData={combinedData} configTable="archiveTable" />
    </div>
  );
}
