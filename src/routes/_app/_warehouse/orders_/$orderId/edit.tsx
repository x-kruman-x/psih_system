import { createFileRoute } from '@tanstack/react-router'
import { Order } from '../../../../../modules/warehouse/orders/components/order/Order'
import { ordersApi } from '../../../../../modules/warehouse/orders/api/api'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/_app/_warehouse/orders_/$orderId/edit')({
  loader: ({ context: { queryClient }, params: { orderId } }) =>
    queryClient.ensureQueryData(ordersApi.getOrderQueryOptions(orderId)),
  component: RouteComponent,
})

function RouteComponent() {
  const orderId = Route.useParams().orderId

  const {
    data: orderData,
    error,
    isError,
  } = useSuspenseQuery(ordersApi.getOrderQueryOptions(orderId))

  if (isError) {
    console.error('Ошибка при загрузке данных заказа:', error)
    return <div>Произошла ошибка при загрузке данных.</div>
  }

  if (!orderData) {
    return <div>Данные заказа не найдены.</div>
  }

  return <Order orderData={orderData} />
}
