import { getTicketChats, getUserConversations } from "@/lib/data";
import { OpenedChat } from "@/providers/chatProvider";
import { useUserSession } from "@/providers/sessionProvider";
import { QUERY_FN_KEYS } from "@/utils/constants";
import { TicketStatus } from "@/utils/enums";
import { isActualChat } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";

export const useConversations = (status: TicketStatus) => {
  const { apiKey, sessionId } = useUserSession();

  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.CONVERSATIONS, sessionId, { status }],
    queryFn: async () =>
      await getUserConversations(apiKey, sessionId, { status }),
    enabled: Boolean(sessionId && apiKey),
    staleTime: 5 * 60 * 1000, // 5mins
  });

  return result;
};

export const useTicketChats = (chatId: OpenedChat) => {
  const { apiKey, sessionId } = useUserSession();

  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.TICKET_CHAT, sessionId, chatId],
    queryFn: async () =>
      await getTicketChats(apiKey, sessionId, chatId as string),
    retry: 0,
    enabled: isActualChat(chatId) && Boolean(sessionId && apiKey),
  });

  return result;
};
