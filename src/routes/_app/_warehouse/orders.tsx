import { createFileRoute } from "@tanstack/react-router";
import { Table } from "../../../shared/component/table/table";
import { ordersApi } from "../../../modules/warehouse/orders/api/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { OrdersType } from "../../../modules/warehouse/orders/types/ordersTableTypes";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/_warehouse/orders")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(ordersApi.getOrdersQueryOptions()),
  component: RouteComponent,
});

function RouteComponent() {
  // TODO: дождаться введение квери параметров и добавить пагинацию
  const { data, error, isError } = useSuspenseQuery(
    ordersApi.getOrdersQueryOptions()
  );

  if (isError) {
    console.error(error);
    toast.error('Произошла ошибка загрузки'); 
  }

  // if (isSuccess) {
  //   console.log(data);
  // }
  return (
    <>
      <Table<OrdersType> data={data || []} configTable='orderTable' />
    </>
  );
}
