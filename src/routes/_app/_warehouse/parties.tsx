import { partiesApi } from "@/modules/warehouse/parties/api/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/_warehouse/parties")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(partiesApi.getPartiesQueryOptions()),
});
