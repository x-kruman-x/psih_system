import { useQueryClient } from "@tanstack/react-query";

export function useFilterToggle() {
    const queryClient = useQueryClient();
  
    const toggleFilter = async() => {
      await queryClient.setQueryData(["isFilterOpen"], (previousState: any) => ({
        isFilterOpen: !(previousState?.isFilterOpen ?? false),
      }));
    };
    
    const isFilterOpen = queryClient.getQueryData(["isFilterOpen"])?.isFilterOpen;
    
    return { isFilterOpen, toggleFilter };
  }