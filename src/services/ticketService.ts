import { axiosInstance, ITicket, ITicketHistory } from "@/lib/";

export const getTickets = async (token?: string): Promise<ITicket[]> => {
  if (!token) {
    throw new Error("Unauthorized access attempted");
  }
  const headers = { Cookie: `token=${token}` };
  const response = await axiosInstance
    .get<ITicket[]>("/tickets", { headers })
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const createTicket = async (ticketData: ITicket): Promise<ITicket> => {
  const response = await axiosInstance
    .post<ITicket>("/tickets", ticketData)
    .catch((error) => {
      throw error;
    });
  return response.data;
};

export const updateTicket = async (
  id: string,
  ticketData: ITicket
): Promise<ITicket> => {
  const response = await axiosInstance
    .put<ITicket>(`/tickets/${id}`, ticketData)
    .catch((error) => {
      throw error;
    });
  return response.data;
};

// Fetch a single category by ID
export const getTicketHistoryById = async (
  id: string
): Promise<ITicketHistory[]> => {
  const response = await axiosInstance
    .get<ITicketHistory[]>(`/tickets/${id}/history`)
    .catch((error) => {
      throw error;
    });
  return response.data;
};
