import { ConversationType, DBResource, MessageType } from "@/utils/types";
import { requestHandler } from "./request";
import { ChatId } from "@/providers/chatProvider";
import { MessageSenders, TicketStatus } from "@/utils/enums";

export const verifyAPIKey = async (apiKey: string) => {
  try {
    const response = await requestHandler(
      `/api/v1/organisations/verify-apikey/`,
      undefined,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
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
  apiKey: string,
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
        Authorization: `Bearer ${apiKey}`,
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
export const getTicketChats = async (
  apiKey: string,
  sessionId: string,
  chatId: ChatId,
) => {
  const response = await requestHandler(
    `/api/v1/helpdesk/customer/${sessionId}/conversations/${chatId}/messages/`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    },
  );

  return response.data as GetTicketChatsResponse;
};
