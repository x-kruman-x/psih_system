import { queryOptions } from "@tanstack/react-query";

async function getBuyers() {
    // моковые данные
  return [
    {
      name: "Шмотка",
      description: "Описание шмотки",
      min_price: 100,
      cost_price: 100,
      price: 100,
      discount_price: 100,
      category_id: 0,
      measure: "шт.",
      archived: false,
      id: 0,
    },
  ];
}

export const buyersApi = {
  basekey: "buyers",
  getBuyersQueryOptions: () => {
    return queryOptions({
      queryKey: [buyersApi.basekey, "getBuyers"],
      queryFn: async () => {
        const resp = await getBuyers();
        return resp;
      },
    });
  },
};
