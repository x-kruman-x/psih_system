import { productsApi } from "@/modules/warehouse/products/api/api";
import { ProductRemainsType } from "@/modules/warehouse/productsRemains/types/productRemainsTypes";
import { Table } from "@/shared/component/table/table";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_warehouse/productsRemains")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(productsApi.getProductsQueryOptions(false)),
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data: products,
    error: productsError,
    isError: isProductsError,
    // isSuccess: isSuccessProducts,
  } = useSuspenseQuery(productsApi.getProductsQueryOptions(false));

  if (isProductsError) {
    console.error(productsError);
  }

  // if (isSuccessProducts) {
  //   let eachProduct = products.reduce((acc, row) => {
  //     row.modifications.forEach((modification) => {
  //       acc.push({
  //         id: modification.id,
  //         id_row: row.id,
  //         // images: { ...row.images },
  //         // files: { ...row.files },
  //         // modifications: { ...row.modifications },
  //         displayName: `${row.name} (${modification.size})`,
  //         remaining: modification.remaining,
  //         cost_price: row.cost_price,
  //         price: row.price,
  //       });
  //     });
  //     return acc;
  //   }, []);

  //   eachProduct.sort((a, b) => a.id - b.id);
  //   console.log(products)
  //   console.log(eachProduct)
  // }
  // if (isSuccessProducts) {
  //   console.log(products)
  // }
  return <Table<ProductRemainsType> data={products || []} configTable={"remainsTable"} />;
}
