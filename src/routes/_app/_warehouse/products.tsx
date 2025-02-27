import { productsApi } from "@/modules/warehouse/products/api/api";
import { ProductsAndCategoriesType } from "@/modules/warehouse/products/types/productsTableTypes";
import { FilteredTable } from "@/shared/component/filteredTable/filteredTable";
import { Table } from "@/shared/component/table/table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_warehouse/products")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(productsApi.getProductsQueryOptions(false));
    queryClient.ensureQueryData(productsApi.getCategoriesQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data: products,
    error: productsError,
    isError: isProductsError,
    isSuccess: isSuccessProducts
  } = useSuspenseQuery(productsApi.getProductsQueryOptions(false));

  const {
    data: categories,
    error: categoriesError,
    isError: isCategoriesError,
    isSuccess
  } = useSuspenseQuery(productsApi.getCategoriesQueryOptions());

  if (isProductsError) {
    console.error(productsError);
  }

  if (isCategoriesError) {
    console.error(categoriesError);
  }

  const combinedData =
    isSuccessProducts && isSuccess
      ? { products: products || [], categories: categories || [] }
      : { products: [], categories: [] };

  return (
    <>
      <FilteredTable<ProductsAndCategoriesType>
        combinedData={combinedData || {}}
        configTable="productsTable"
      />
    </>
  );
}
