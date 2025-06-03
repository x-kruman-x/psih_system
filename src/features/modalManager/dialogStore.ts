import { makeAutoObservable } from "mobx";

export const DialogId = {
  NEW_PRODUCT: "NEW_PRODUCT",
  PRODUCT_DETAILS: "PRODUCT_DETAILS",
  PRODUCTS_PHOTO: 'PRODUCTS_PHOTO'
} as const;

export type DialogIdType = keyof typeof DialogId;

export interface DialogParams {
  [key: string]: unknown;
}

class DialogStore {
  private static instance: DialogStore;
  private _activeDialog: DialogIdType | null = null;
  private _dialogParams: DialogParams | null = null;

  private constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  public static getInstance(): DialogStore {
    if (!DialogStore.instance) {
      DialogStore.instance = new DialogStore();
    }
    return DialogStore.instance;
  }

  public openDialog(
    dialogId: DialogIdType,
    params: DialogParams | null = null,
  ): void {
    this._activeDialog = dialogId;
    this._dialogParams = params;
  }

  public closeDialog(): void {
    this._activeDialog = null;
    this._dialogParams = null;
  }

  public isDialogOpen(dialogId: DialogIdType): boolean {
    return this._activeDialog === dialogId;
  }

  public get activeDialog(): DialogIdType | null {
    return this._activeDialog;
  }

  public get dialogParams(): DialogParams | null {
    return this._dialogParams;
  }

  public get isAnyDialogOpen(): boolean {
    return this._activeDialog !== null;
  }
}

export const dialogStore = DialogStore.getInstance();
