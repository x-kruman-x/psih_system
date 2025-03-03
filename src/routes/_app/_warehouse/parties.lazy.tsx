import { partiesApi } from '@/modules/warehouse/parties/api/api'
import { PartiesType } from '@/modules/warehouse/parties/types/partiesTableTypes';
import { Table } from '@/shared/component/table/table';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_warehouse/parties')({
  loader: ({ context: { queryClient } }) =>
      queryClient.ensureQueryData(partiesApi.getPartiesQueryOptions()),
  component: RouteComponent,
})

function RouteComponent() {
  const { data, error, isError } = useSuspenseQuery(
    partiesApi.getPartiesQueryOptions()
  );

  if (isError) {
    console.error(error);
  }

  // if (isSuccess) {
  //   console.log(data);
  // }
  return (
    <>
      <Table<PartiesType> data={data || []} configTable='partiesTable' />
    </>
  );
}
