import { partiesApi } from '@/modules/warehouse/parties/api/api'
import { PartiesType } from '@/modules/warehouse/parties/types/partiesTableTypes'
import { Table } from '@/shared/component/table/table'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createLazyFileRoute('/_app/warehouse/parties')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, error, isError } = useSuspenseQuery(
    partiesApi.getPartiesQueryOptions(),
  )

  if (isError) {
    console.error(error)
    toast.error('Произошла ошибка загрузки')
  }

  // if (isSuccess) {
  //   console.log(data);
  // }
  return (
    <>
      <Table<PartiesType> data={data || []} configTable="partiesTable" />
    </>
  )
}
