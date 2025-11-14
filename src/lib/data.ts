import { ConversationType, DBResource, MessageType } from "@/utils/types";
import { requestHandler } from "./request";
import { ChatId } from "@/providers/chatProvider";
import { MessageSenders, TicketStatus } from "@/utils/enums";
import { API_KEY } from "@/utils/constants";

export const verifyAPIKey = async () => {
  try {
    const response = await requestHandler(
      `/api/v1/organisations/verify-apikey/`,
      undefined,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );
    if (!response.data.success) throw new Error();
    return true;
  } catch {
    return false;
  }
};

export const getUserConversations = async (
  sessionId: string,
  filters: { status: TicketStatus },
) => {
  const response = await requestHandler(
    `/api/v1/helpdesk/customer/${sessionId}/conversations/?closed=${
      filters.status === TicketStatus.CLOSED
    }`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  return response.data as ConversationType[];
};

export type GetTicketChatsResponse = DBResource & {
  closed: boolean;
  close_support: boolean;
  rating: number | null;
  read_by_customer: boolean;
  read_by_agent: boolean;
  responder: MessageSenders;
  ticket: string;
  messages: MessageType[];
};
export const getTicketChats = async (sessionId: string, chatId: ChatId) => {
  const response = await requestHandler(
    `/api/v1/helpdesk/customer/${sessionId}/conversations/${chatId}/messages/`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  return response.data as GetTicketChatsResponse;
};
