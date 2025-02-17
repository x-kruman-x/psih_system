import { queryOptions } from "@tanstack/react-query";
import { instance } from "../../../../shared/API/base";

async function getOrders() {
  return instance.get(`/api/orders/`);
}

async function getOrderById(id: string) {
  return instance.get(`/api/orders/${id}`);
}

async function deleteOrders(idsArr: number[]) {
  return instance.delete("/api/orders/multiple/", { data: idsArr });
}

async function patchOrder(orderId: number, key: string, newValue: any) {
  return instance.patch(`/api/orders/?order_id=${orderId}`, {
    [key]: newValue,
  });
}

async function uploadOrderFile(orderId: number, formData: FormData) {
  return instance.post(`/api/orders/${orderId}/upload-file/`, formData);
}

export const ordersApi = {
  basekey: "orders",
  getOrdersQueryOptions: () => {
    return queryOptions({
      queryKey: [ordersApi.basekey, "getOrders"],
      queryFn: async () => {
        const resp = await getOrders();
        return resp.data;
      },
    });
  },
  getOrderQueryOptions: (id: string) => {
    return queryOptions({
      queryKey: [ordersApi.basekey, "getOrder", id],
      queryFn: async () => {
        const resp = await getOrderById(id);
        return resp.data;
      },
    });
  },

  deleteOrders: (idsArr: number[]) => {
    return deleteOrders(idsArr);
  },
  updateOrderStatus: (orderId: number, newValue: any) => {
    return patchOrder(orderId, "status", newValue);
  },
  updateOrderTag: (orderId: number, newValue: any) => {
    return patchOrder(orderId, "tag", newValue);
  },
  uploadOrderFile: (orderId: number, formData: FormData) => {
    return uploadOrderFile(orderId, formData)
  }
};
