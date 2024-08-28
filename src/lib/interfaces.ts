import { Status } from "./enums";

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

export interface ITicketHistory {
  id: number;
  ticket_id: number;
  previous_status: Status;
  new_status: Status;
  event_time: Date | string;
  event_description: string;
}
