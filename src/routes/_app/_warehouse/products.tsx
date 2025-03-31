import { productsApi } from '@/modules/warehouse/products/api/api'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_warehouse/products')({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(productsApi.getProductsQueryOptions(false))
    queryClient.ensureQueryData(productsApi.getCategoriesQueryOptions())
    queryClient.ensureQueryData(productsApi.getCollectionsQueryOptions())
  }
})
