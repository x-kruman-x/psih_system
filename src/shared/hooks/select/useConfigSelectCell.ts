import {
  SelectCellBtnType,
  SelectCellRefreshPlaceType,
  SelectCellPageType,
} from "@/shared/types/SelectCellPropsTypes";
import { useContentSelectCell } from "./useContentSelectCell";
import { useUpdateFuncSelectCell } from "./useUpdateFuncSelectCell";

export function useConfigSelectCell(
  btnType: SelectCellBtnType,
  refreshPlace: SelectCellRefreshPlaceType,
  page: SelectCellPageType
) {
  const { updateStatus, updateTag } = useUpdateFuncSelectCell(
    refreshPlace,
    page
  );
  const { statusContent, tagContent } = useContentSelectCell(page);

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
