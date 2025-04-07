import { productsApi } from '@/modules/warehouse/products/api/api'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/warehouse/productsRemains')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(productsApi.getProductsQueryOptions(false)),
})
