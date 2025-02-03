import { queryOptions } from "@tanstack/react-query";
import { instance } from "../../../../shared/API/base";

async function getOrders() {
    return instance.get(`/api/orders/`);
}

export const ordersApi = {
    basekey: 'orders',
    getOrdersQueryOptions: () => {
        return queryOptions({
            queryKey: [ordersApi.basekey, 'getOrders'],
            queryFn: async() => {
                const resp = await getOrders()
                return resp.data
            }
        })
    }
}