export type SelectCellProps = {
    currentValue: string | null;
    buttonStyle?: string;
    orderId: number;
    btnType: SelectCellBtnType;
    refreshPlace: SelectCellRefreshPlaceType;
    page: SelectCellPageType;
    wFull?: boolean;
  };

export type SelectCellBtnType = "status" | "tag";

export type SelectCellRefreshPlaceType = 'list' | 'card';

export type SelectCellPageType = 'orders' | 'parties' | 'remains';