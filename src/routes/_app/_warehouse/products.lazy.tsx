import { productsApi } from "@/modules/warehouse/products/api/api";
import { ProductCombinedData } from "@/modules/warehouse/products/types/ProductCombinedData";
import { FilteredTable } from "@/shared/component/filteredTable/filteredTable";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/_app/_warehouse/products")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: products, isError: isProductsError } = useSuspenseQuery(productsApi.getProductsQueryOptions(false));
  const { data: categories, isError: isCategoriesError } = useSuspenseQuery(productsApi.getCategoriesQueryOptions());
  const { data: collections, isError: isCollectionsError } = useSuspenseQuery(productsApi.getCollectionsQueryOptions());

  if (isProductsError) toast.error("Ошибка загрузки товаров");
  if (isCategoriesError) toast.error("Ошибка загрузки категорий");
  if (isCollectionsError) toast.error("Ошибка загрузки коллекций");

  const combinedData: ProductCombinedData = {
    products: products || [],
    categories: categories || [],
    collections: collections || []
  };

  return <FilteredTable combinedData={combinedData} configTable="productsTable" />;
}
