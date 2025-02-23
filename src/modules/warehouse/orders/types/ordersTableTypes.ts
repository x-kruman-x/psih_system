export type OrdersType = {
  id: number;
  order_date: string;
  full_name: string;
  status: string;
  tag: string;
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
  modifications_in_order: object[];
  files: [
    {
      id: number;
      url: string;
      image: boolean;
      size: string | null;
      user: object | null;
      created_at: string | null;
    }
  ];
};
