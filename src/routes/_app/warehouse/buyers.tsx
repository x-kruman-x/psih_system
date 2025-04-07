import { buyersApi } from '@/modules/warehouse/buyers/api/api'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/warehouse/buyers')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(buyersApi.getBuyersQueryOptions()),
})
