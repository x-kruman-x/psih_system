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

async function getProductById(productId:string) {
  return instance.get(`/api/products/${productId}/`);
}

async function getCategories() {
  return instance.get(`/api/products/categories/`);
}

async function deleteProducts(idsArr: number[]) {
  return instance.delete("/api/products/multiple/", { data: idsArr });
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
  getProductByIdQueryOptions: (productId: string) => {
    return queryOptions({
      queryKey: [productsApi.basekey, "getProduct", productId],
      queryFn: async () => {
        const resp = await getProductById(productId);
        return resp.data;
      },
    })
  },

  deleteProducts: (idsArr: number[]) => {
    return deleteProducts(idsArr);
  },
};