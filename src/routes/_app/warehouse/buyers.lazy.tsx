import { buyersApi } from '@/modules/warehouse/buyers/api/api'
import { Table } from '@/shared/component/table/table'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createLazyFileRoute('/_app/warehouse/buyers')({
  component: RouteComponent,
})

function RouteComponent() {
  const { error, isError } = useSuspenseQuery(
    buyersApi.getBuyersQueryOptions(),
  )

  if (isError) {
    console.error(error)
    toast.error('Произошла ошибка загрузки')
  }

  return (
    <>
      <Table data={[]} configTable="buyersTable" />
    </>
  )
}
