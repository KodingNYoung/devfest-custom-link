import { getTicketChats, getUserConversations } from "@/lib/data";
import { OpenedChat } from "@/providers/chatProvider";
import { useUserSession } from "@/providers/sessionProvider";
import { QUERY_FN_KEYS } from "@/utils/constants";
import { TicketStatus } from "@/utils/enums";
import { isActualChat } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";

export const useConversations = (status: TicketStatus) => {
  const { sessionId } = useUserSession();

  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.CONVERSATIONS, sessionId, { status }],
    queryFn: async () => await getUserConversations(sessionId, { status }),
    enabled: Boolean(sessionId),
    staleTime: 1 * 60 * 1000, // 1mins
  });

  return result;
};

export const useTicketChats = (chatId: OpenedChat) => {
  const { sessionId } = useUserSession();

  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.TICKET_CHAT, sessionId, chatId],
    queryFn: async () => await getTicketChats(sessionId, chatId as string),
    retry: 0,
    enabled: isActualChat(chatId) && Boolean(sessionId),
  });

  return result;
};
