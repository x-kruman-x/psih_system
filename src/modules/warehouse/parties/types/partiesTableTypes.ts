export type PartiesType = {
  agent_name: string | null;
  status: string | null;
  tag: string | null;
  note: string | null;
  storage: string | null;
  project: string | null;
  phone_number: string | null;
  overheads: number | null;
  id: number;
  party_date: string | null;
};

export type PartyType = {
  agent_name: string;
  status: string;
  tag: string | null;
  note: string | null;
  storage: string | null;
  project: string | null;
  phone_number: string | null;
  overheads: number;
  id: number;
  party_date: string;
  modifications_in_party: object[];
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
