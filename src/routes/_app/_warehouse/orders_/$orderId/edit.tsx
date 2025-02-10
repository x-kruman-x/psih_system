import { createFileRoute } from '@tanstack/react-router'
import { Order } from '../../../../../modules/warehouse/orders/components/Order'

export const Route = createFileRoute('/_app/_warehouse/orders_/$orderId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Order />
}
