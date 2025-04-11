import { partiesApi } from '@/modules/warehouse/parties/api/api'
import { Party } from '@/modules/warehouse/parties/components/party/party'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/warehouse/parties_/$partyId/edit')({
  loader: ({ context: { queryClient }, params: { partyId } }) =>
    queryClient.ensureQueryData(partiesApi.getPartyQueryOptions(partyId)),
  component: RouteComponent,
})

function RouteComponent() {
  const partyId = Route.useParams().partyId

  const {
    data: partyData,
    error,
    isError,
  } = useSuspenseQuery(partiesApi.getPartyQueryOptions(partyId))

  if (isError) {
    console.error('Ошибка при загрузке данных партии:', error)
    return <div>Произошла ошибка при загрузке данных.</div>
  }

  if (!partyData) {
    return <div>Данные партии не найдены.</div>
  }

  return <Party partyData={partyData} />
}
