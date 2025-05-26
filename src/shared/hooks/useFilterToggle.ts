import { useQueryClient, useQuery } from "@tanstack/react-query";
import { isFilteredTableFilterType, isFilterType } from "../types/table/isFilterTypes";

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

export function useFilteredTableFilterToggle() {
  const queryClient = useQueryClient();

  const { data: filterState } = useQuery<isFilteredTableFilterType>({
    queryKey: ["isFilteredTableFilter"],
    queryFn: async () => {
      return { isFilteredTableFilterOpen: false };
    },
    staleTime: Infinity,
  });

  const toggleFilter = async () => {
    queryClient.setQueryData<isFilteredTableFilterType>(
      ["isFilteredTableFilter"],
      (previousState) => ({
        isFilteredTableFilterOpen: !(previousState?.isFilteredTableFilterOpen ?? false),
      })
    );
  };

  return { isFilteredTableFilterOpen: filterState?.isFilteredTableFilterOpen ?? false, toggleFilter };
}