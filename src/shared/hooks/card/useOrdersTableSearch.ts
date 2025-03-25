import Fuse from "fuse.js";
import {useState} from "react";


const useOrdersTableSearch = <TItem>(orders: TItem[]): [TItem[], (query: string) => void] => {
    const [foundOrders, setFoundOrders] = useState<TItem[]>([]);
    const ordersFuse = new Fuse<TItem>(orders, {
        keys: ['id', 'tag', 'full_name', 'status', 'order_date'],
        threshold: 0.2,
        distance: 50,
    })

    const findOrders = (query: string) => {
        const results = ordersFuse.search(query)
        console.log(results)
        setFoundOrders(results.map(order => order.item))
    }

    return [foundOrders, findOrders]
}

export default useOrdersTableSearch;