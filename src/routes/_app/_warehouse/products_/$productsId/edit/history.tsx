import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_app/_warehouse/products_/$productsId/edit/history',
)({
  component: RouteComponent,
})

// TODO: ждать бек для истории
function RouteComponent() {
  return <div>Нет бека для нее</div>
}
