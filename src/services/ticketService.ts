import { axiosInstance, ITicket } from "@/lib/";

export const getTickets = async (token?: string): Promise<ITicket[]> => {
  if (!token) {
    throw new Error("Unauthorized access attempted");
  }
  const headers = { Cookie: `token=${token}` };
  const response = await axiosInstance
    .get<ITicket[]>("/tickets", { headers })
    .catch((error) => {
      console.error("Error fetching tickets:", error);
      throw new Error("Failed to fetch tickets");
    });
  return response.data;
};

export const createTicket = async (ticketData: ITicket): Promise<ITicket> => {
  const response = await axiosInstance
    .post<ITicket>("/tickets", ticketData)
    .catch((error) => {
      console.error("Service error:", error);
      throw new Error("Failed to create ticket");
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
      console.error("Service error when updating ticket:", error);
      throw new Error("Failed to update ticket");
    });
  return response.data;
};
