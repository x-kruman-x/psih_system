import { useContentSelectCell } from "./useContentSelectCell";
import { useUpdateFuncSelectCell } from "./useUpdateFuncSelectCell";

export function useConfigSelectCell(btnType: "status" | "tag", refreshPlace: 'list' | 'card', page: 'orders' | 'parties') {
  const {updateStatus, updateTag} = useUpdateFuncSelectCell(refreshPlace, page);
  const {statusContent, tagContent} = useContentSelectCell(page)

  switch (btnType) {
    case "status":
      return {
        selectCellContent: statusContent,
        updateFunc: updateStatus,
      };

    case "tag":
      return {
        selectCellContent: tagContent,
        updateFunc: updateTag,
      };
  }
}