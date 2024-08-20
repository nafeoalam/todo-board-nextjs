import { ITicket } from "@/components/Dashboard";
import axiosInstance from "../lib/axios";

export const getTickets = async (token?: string): Promise<ITicket[]> => {
  try {
    if (token) {
      const headers = token ? { Cookie: `token=${token}` } : {};

      const response = await axiosInstance.get<ITicket[]>("/tickets", {
        headers,
      });
      return response.data;
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    throw new Error("Failed to fetch tickets");
  }
};

export const createTicket = async (ticketData: ITicket): Promise<ITicket> => {
  try {
    const response = await axiosInstance.post<ITicket>("/tickets", ticketData);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create ticket");
  }
};

export const updateTicket = async (
  id: string,
  ticketData: ITicket
): Promise<ITicket> => {
  try {
    const response = await axiosInstance.put<ITicket>(
      `/tickets/${id}`,
      ticketData
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to update ticket");
  }
};
