import { useState, useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import { OrderTypeModification } from "@/modules/warehouse/orders/types/ordersTableTypes";
import { configTableType } from "@/shared/types/table/columnTableTypes";
import { CardTable } from "./CardTable";
import { productsApi } from "@/modules/warehouse/products/api/api";

export function CardTableDataValidation({
  products,
  configTable,
}: {
  products: OrderTypeModification[];
  configTable: configTableType;
}) {
  const [newProducts, setNewProducts] = useState<OrderTypeModification[]>(products);
  const [allDataLoaded, setAllDataLoaded] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log('CardTableDataValidation products: ', products)
  // }, [products])

  const results = useQueries({
    queries: products.map((product) =>
      productsApi.getProductByIdQueryOptions(product.modification.product_id.toString())
    ),
  });

  useEffect(() => {
    const isAllDataLoaded = results.every((result) => result.isSuccess);
    // console.log('isAllDataLoaded', isAllDataLoaded)
    setAllDataLoaded(isAllDataLoaded);
  }, [results]);

  useEffect(() => {
    console.log('allDataLoaded: ', allDataLoaded)
  }, [allDataLoaded])

  useEffect(() => {
    if (allDataLoaded) {
      const updatedProducts = products.map((product, index) => {
        const productInfo = results[index].data;
  
        
        const filteredModification = productInfo.modifications?.filter(
          (modification: any) => modification.id === product.modification.id
        );
  
        return {
          ...product,
          modification: {
            ...product.modification,
            productInfo: {
              ...productInfo,
              modifications: filteredModification,
            },
          },
        };
      });
  
      // console.log(updatedProducts);
      setNewProducts(updatedProducts);
    }
  }, [allDataLoaded]);

  return allDataLoaded ? (
    <CardTable<OrderTypeModification>
      data={newProducts}
      configTable={configTable}
    />
  ) : (
    <div>Загрузка...</div>
  );
}
