import { getTicketChats, getUserConversations } from "@/lib/data";
import { useUserSession } from "@/providers/sessionProvider";
import { QUERY_FN_KEYS } from "@/utils/constants";
import { TicketStatus } from "@/utils/enums";
import { useQuery } from "@tanstack/react-query";

export const useConversations = (status: TicketStatus) => {
  const { apiKey, userId } = useUserSession();

  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.CONVERSATIONS, userId, { status }],
    queryFn: async () => await getUserConversations(apiKey, userId, { status }),
    enabled: Boolean(userId && apiKey),
    staleTime: 5 * 60 * 1000, // 5mins
  });

  return result;
};

export const useTicketChats = (chatId: string | null) => {
  const { apiKey, userId } = useUserSession();

  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.TICKET_CHAT, userId, chatId],
    queryFn: async () => await getTicketChats(apiKey, userId, chatId as string),
    retry: 0,
    enabled: !!chatId,
  });

  return result;
};
