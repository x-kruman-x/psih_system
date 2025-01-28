import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_warehouse/products')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>продукты</div>
}
