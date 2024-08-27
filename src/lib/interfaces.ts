export interface ICategory {
  id?: number;
  name: string;
  description: string;
}

export interface ITicket {
  id?: number;
  title: string;
  description: string;
  expiry_date: string;
  category_id: number;
  status: string;
}
