import { productsApi } from '@/modules/warehouse/products/api/api'
import { ProductInfo } from '@/modules/warehouse/products/components/ProductInfo'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute(
  '/_app/warehouse/products_/$productsId/edit/info',
)({
  loader: ({ context: { queryClient }, params: { productsId } }) =>
    queryClient.ensureQueryData(
      productsApi.getProductByIdQueryOptions(productsId),
    ),
  component: RouteComponent,
})

function RouteComponent() {
  const productId = Route.useParams().productsId

  const {
    data: initialData,
    error,
    isError,
  } = useSuspenseQuery(productsApi.getProductByIdQueryOptions(productId))

  if (isError) {
    console.error('Ошибка при загрузке данных заказа:', error)
    toast.error('Ошибка при загрузке данных заказа')
  }

  if (!initialData) {
    toast.error('Данные товара не найдены')
  }

  return <ProductInfo initialData={initialData} />
}
