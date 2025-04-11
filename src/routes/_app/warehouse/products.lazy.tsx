import { productsApi } from '@/modules/warehouse/products/api/api'
import { ProductsAndCategoriesType } from '@/modules/warehouse/products/types/productsTableTypes'
import { FilteredTable } from '@/shared/component/filteredTable/filteredTable'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_app/warehouse/products')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: products,
    error: productsError,
    isError: isProductsError,
    isSuccess: isSuccessProducts,
  } = useSuspenseQuery(productsApi.getProductsQueryOptions(false))

  const {
    data: categories,
    error: categoriesError,
    isError: isCategoriesError,
    isSuccess,
  } = useSuspenseQuery(productsApi.getCategoriesQueryOptions())

  if (isProductsError) {
    console.error(productsError)
  }

  if (isCategoriesError) {
    console.error(categoriesError)
  }

  // if(isSuccessProducts && isSuccess) {
  //   const groupedProducts = {};
  //   products.forEach((product) => {
  //     if (!groupedProducts[product.category_id]) {
  //       groupedProducts[product.category_id] = [];
  //     }
  //     groupedProducts[product.category_id].push(product.name);
  //   });

  //   const tableData = categories.map((category) => ({
  //     category: category.name,
  //     products: groupedProducts[category.id]?.join(", ") || "", // Объединяем продукты в строку
  //   }));
  //   // console.log(tableData)
  // }

  const combinedData =
    isSuccessProducts && isSuccess
      ? { products: products || [], categories: categories || [] }
      : { products: [], categories: [] }

  return (
    <>
      <FilteredTable<ProductsAndCategoriesType>
        combinedData={combinedData || {}}
        configTable="productsTable"
      />
    </>
  )
}
