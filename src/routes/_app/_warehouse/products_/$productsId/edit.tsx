import { productsApi } from "@/modules/warehouse/products/api/api";
import { Product } from "@/modules/warehouse/products/components/Product";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute(
  "/_app/_warehouse/products_/$productsId/edit"
)({
  loader: ({ context: { queryClient }, params: { productsId } }) =>
    queryClient.ensureQueryData(
      productsApi.getProductByIdQueryOptions(productsId)
    ),
  component: RouteComponent,
});

function RouteComponent() {
  const productId = Route.useParams().productsId;
  const navigate = useNavigate();

  const {
    data: productData,
    error,
    isError,
  } = useSuspenseQuery(productsApi.getProductByIdQueryOptions(productId));

  if (isError) {
    console.error("Ошибка при загрузке данных заказа:", error);
    toast.error("Ошибка при загрузке данных заказа");
    navigate({ to: "/products" });
  }

  if (!productData) {
    toast.error("Данные товара не найдены");
    navigate({ to: "/products" });
  }

  return <Product productData={productData} />
}
