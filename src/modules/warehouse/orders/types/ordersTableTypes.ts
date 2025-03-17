export type OrdersType = {
  id: number;
  order_date: string;
  full_name: string;
  status: string;
  tag: string;
};

export type OrderTypeModification = {
  amount: number;
  modification: {
    size: string;
    article: string | null;
    remaining: number;
    id: number;
    product_id: number;
    productInfo?: {
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
  };
  id: number;
};

export type OrderTypeFile = {
  id: number;
  url: string;
  image: boolean;
  size: string | null;
  user: object | null;
  created_at: string | null;
};

export type OrderType = {
  full_name: string;
  status: string;
  tag: string | null;
  channel: string | null;
  address: string;
  task: string | null;
  note: string | null;
  comment: string | null;
  storage: string | null;
  project: string | null;
  phone_number: string | null;
  email: string | null;
  id: number;
  messages: string | null;
  discount: number;
  promo: string | null;
  order_date: string;
  modifications_in_order: OrderTypeModification[];
  files: OrderTypeFile[];
};
