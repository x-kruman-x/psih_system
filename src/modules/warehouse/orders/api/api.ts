import { queryOptions } from "@tanstack/react-query";
import { instance } from "../../../../shared/API/base";

async function getOrders() {
    console.log('запрос на получение orders')
    return instance.get(`/api/orders/`);
}

async function deleteOrders(idsArr: number[]) {
    return instance.delete('/api/orders/multiple/', { data: idsArr } )
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
    },

    deleteOrders: (idsArr: number[]) => {
        return deleteOrders(idsArr)
    }
}