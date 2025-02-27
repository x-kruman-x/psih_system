import { useQueryClient, useQuery } from "@tanstack/react-query";
import { isFilterType } from "../../types/table/isFilterTypes";

export function useFilterToggle() {
  const queryClient = useQueryClient();

  const { data: filterState } = useQuery<isFilterType>({
    queryKey: ["isFilter"],
    queryFn: async () => {
      return { isFilterOpen: false };
    },
    staleTime: Infinity,
  });

  const toggleFilter = async () => {
    queryClient.setQueryData<isFilterType>(
      ["isFilter"],
      (previousState) => ({
        isFilterOpen: !(previousState?.isFilterOpen ?? false),
      })
    );
  };

  return { isFilterOpen: filterState?.isFilterOpen ?? false, toggleFilter };
}