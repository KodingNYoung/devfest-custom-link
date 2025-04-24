import { getTicketChats, getUserConversations } from "@/lib/data";
import { useUserSession } from "@/providers/sessionProvider";
import { QUERY_FN_KEYS } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

export const useConversations = () => {
  const { apiKey, userId } = useUserSession();

  const result = useQuery({
    queryKey: [...QUERY_FN_KEYS.CONVERSATIONS, userId],
    queryFn: async () => await getUserConversations(apiKey, userId),
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
