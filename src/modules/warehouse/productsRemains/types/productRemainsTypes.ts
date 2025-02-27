export type ProductRemainsType = {
  name: string;
  description: string;
  min_price: number;
  cost_price: number;
  price: number;
  discount_price: number;
  category_id: number;
  measure: string;
  archived: boolean;
  id: number;
  category: {
    name: string;
    id: number;
  };
  images?: [
    {
      id: number;
      url: string;
      image: boolean;
      size: string;
      created_at: string;
    },
  ];
  files?: [
    {
      id: number;
      url: string;
      image: true;
      size: string;
      created_at: string;
    },
  ];
  modifications?: [
    {
      size: string;
      article: string;
      remaining: number;
      id: number;
      product_id: number;
    },
  ];
};
