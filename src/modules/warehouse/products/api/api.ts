import { queryOptions } from "@tanstack/react-query";
import { instance } from "../../../../shared/API/base";

async function getProducts(isArchived = false) {
    let url = `/api/products/`;
    if (isArchived !== undefined && isArchived !== null) {
      url += `?archived=${isArchived}`;
    }

    return instance.get(url);
}

export const productsApi = {
    basekey: 'products',
    getProductsQueryOptions: (isArchived?: Boolean) => {
        return queryOptions({
          queryKey: [productsApi.basekey, "getProducts"],
          queryFn: async () => {
            const resp = await getProducts(isArchived);
            return resp.data;
          },
        });
      },
}