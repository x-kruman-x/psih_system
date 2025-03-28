import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Order } from "../../../../../modules/warehouse/orders/components/order/Order";
import { ordersApi } from "../../../../../modules/warehouse/orders/api/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/_warehouse/orders_/$orderId/edit")({
  loader: ({ context: { queryClient }, params: { orderId } }) =>
    queryClient.ensureQueryData(ordersApi.getOrderQueryOptions(orderId)),
  component: RouteComponent,
});

function RouteComponent() {
  const orderId = Route.useParams().orderId;
  const navigate = useNavigate();

  const {
    data: orderData,
    error,
    isError,
  } = useSuspenseQuery(ordersApi.getOrderQueryOptions(orderId));

  if (isError) {
    console.error("Ошибка при загрузке данных заказа:", error);
    toast.error("Ошибка при загрузке данных заказа");
    navigate({ to: "/orders" });
  }

  if (!orderData) {
    toast.error("Данные заказа не найдены");
    navigate({ to: "/orders" });
  }

  return <Order orderData={orderData} />;
}
