import { SizeType } from "@/modules/warehouse/productsRemains/types/sizeTypes";

export type RemainsDropDownProps = {
  size: SizeType;
  article: string;
  remaining: number;
  id: number;
  product_id: number;
};
