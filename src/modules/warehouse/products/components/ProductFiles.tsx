import { FileContainer } from "@/shared/component/files/fileContainer";
import { ProductType } from "../types/productsTypes";

export function ProductFiles({productData}: {productData: ProductType}) {
  // TODO!: сравнить с дизайном
  return (
    <FileContainer
      files={productData.files}
      id={productData.id}
      savePlace="product"
      className="px-[160px] h-auto"
    />
  );
}
