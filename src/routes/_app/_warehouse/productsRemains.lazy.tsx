import { productsApi } from '@/modules/warehouse/products/api/api'
import { ProductRemainsType } from '@/modules/warehouse/productsRemains/types/productRemainsTypes'
import { Table } from '@/shared/component/table/table'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createLazyFileRoute('/_app/_warehouse/productsRemains')({
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: products,
    error: productsError,
    isError: isProductsError,
    // isSuccess: isSuccessProducts,
  } = useSuspenseQuery(productsApi.getProductsQueryOptions(false))

  if (isProductsError) {
    console.error(productsError)
    toast.error('Произошла ошибка загрузки'); 
  }

  // if (isSuccessProducts) {
  //   let eachProduct = products.reduce((acc, row) => {
  //     row.modifications.forEach((modification) => {
  //       acc.push({
  //         id: modification.id,
  //         id_row: row.id,
  //         // images: { ...row.images },
  //         // files: { ...row.files },
  //         // modifications: { ...row.modifications },
  //         displayName: `${row.name} (${modification.size})`,
  //         remaining: modification.remaining,
  //         cost_price: row.cost_price,
  //         price: row.price,
  //       });
  //     });
  //     return acc;
  //   }, []);

  //   eachProduct.sort((a, b) => a.id - b.id);
  //   console.log(products)
  //   console.log(eachProduct)
  // }
  // if (isSuccessProducts) {
  //   console.log(products)
  // }
  return (
    <Table<ProductRemainsType>
      data={products || []}
      configTable={'remainsTable'}
    />
  )
}
