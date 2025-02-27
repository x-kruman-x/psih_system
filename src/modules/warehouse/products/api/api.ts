import { queryOptions } from "@tanstack/react-query";
import { instance } from "../../../../shared/API/base";

async function getProducts(isArchived: boolean | undefined = false) {
  let url = `/api/products/`;

  if (isArchived !== undefined && isArchived !== null) {
    url += `?archived=${isArchived}`;
  }

  const response = await instance.get(url);
  return response;
}

async function getCategories() {
  return instance.get(`/api/products/categories/`);
}

export const productsApi = {
  basekey: "products",
  getProductsQueryOptions: (isArchived?: boolean) => {
    return queryOptions({
      queryKey: [productsApi.basekey, "getProducts", isArchived],
      queryFn: async () => {
        const resp = await getProducts(isArchived);
        return resp.data;
      },
    });
  },
  getCategoriesQueryOptions: () => {
    return queryOptions({
      queryKey: [productsApi.basekey, "getCategories"],
      queryFn: async () => {
        const resp = await getCategories();
        return resp.data;
      },
    });
  },
};