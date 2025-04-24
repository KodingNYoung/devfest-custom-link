import { ConversationType, DBResource, MessageType } from "@/utils/types";
import { requestHandler } from "./request";
import { ChatId } from "@/providers/chatProvider";
import { MessageSenders } from "@/utils/enums";

export const getUserConversations = async (apiKey: string, userId: string) => {
  const response = await requestHandler(
    `/api/v1/helpdesk/customer/${userId}/conversations/`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  return response.data as ConversationType[];
};

export type GetTicketChatsResponse = DBResource & {
  closed: boolean;
  responder: MessageSenders;
  ticket: string;
  messages: MessageType[];
};
export const getTicketChats = async (
  apiKey: string,
  userId: string,
  chatId: ChatId
) => {
  const response = await requestHandler(
    `/api/v1/helpdesk/customer/${userId}/conversations/${chatId}/messages/`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  return response.data as GetTicketChatsResponse;
};
