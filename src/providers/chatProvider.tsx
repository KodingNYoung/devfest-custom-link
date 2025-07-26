"use client";

import { useTicketChats } from "@/hooks/apiHooks";
import { useChatNav } from "@/hooks/chat";
import { useChatSocket } from "@/lib/sockets/chats";
import { QUERY_FN_KEYS } from "@/utils/constants";
import { MessageSenders } from "@/utils/enums";
import { FC, MessageType, SocketResponseType } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  createContext,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useUserSession } from "./sessionProvider";
import { v4 as uuidV4 } from "uuid";

export type ChatId = string;
export const NEW_CHAT_ID = "new_chat_id";
type ChatNavContextProps = {
  chatId: ChatId | null;
  goToChat: (chatId: ChatId) => void;
  backToConversations: () => void;
  openNewChat: () => void;
};

export const ChatNavContext = createContext<ChatNavContextProps>({
  chatId: null,
  goToChat: () => {},
  backToConversations: () => {},
  openNewChat: () => {},
});

export const ChatNavContextProvider: FC = ({ children }) => {
  const [openedChat, setOpenedChat] = useState<ChatId | null>(null);

  const goToChat = (chat: ChatId) => setOpenedChat(chat);
  const openNewChat = () => setOpenedChat(NEW_CHAT_ID);
  const backToConversations = () => setOpenedChat(null);

  return (
    <ChatNavContext.Provider
      value={{ chatId: openedChat, goToChat, backToConversations, openNewChat }}
    >
      {children}
    </ChatNavContext.Provider>
  );
};

// -------------------- CHAT ACTIONS CONTEXT --------------------
type ChatContextProps = {
  messages: MessageType[];
  isLoading: boolean;
  scrollRef?: RefObject<HTMLDivElement | null>;
  sendMessage: (message: string) => void;
  readChat: () => void;
  scrollToBottom: (behavior?: ScrollBehavior, delay?: number) => void;
};
export const ChatContext = createContext<ChatContextProps>({
  messages: [],
  isLoading: true,
  sendMessage: () => {},
  readChat: () => {},
  scrollToBottom: () => {},
});

export const ChatContextProvider: FC = ({ children }) => {
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const { userId } = useUserSession();

  const { chatId, goToChat } = useChatNav();

  const [messages, setMessages] = useState<MessageType[]>([]);

  const ticketChatId = useMemo(
    () => (chatId === NEW_CHAT_ID ? null : chatId),
    [chatId]
  );

  const { data, isLoading } = useTicketChats(ticketChatId) || {};
  const { emitMessage, emitRead } = useChatSocket(ticketChatId, {
    onmessage: (message: SocketResponseType) => {
      if (message.data.ticket_chat_id) {
        // if it's a new chat, set the chatId to the one received from the socket
        goToChat(message.data.ticket_chat_id);
      }
      updateMessages({
        date_created: message.data.date_created,
        date_updated: message.data.date_updated,
        message: message.data.message,
        sender: message.data.sender,
        is_attachment: false, //TODO: confirm this -- is it always false? meaning sate or agent cannot reply with attachments?
        ticket_chat: message.data.ticket_chat_id,
      });
    },
  });

  //   functions
  const scrollToBottom = useCallback(
    (behavior: ScrollBehavior = "smooth", delay: number = 100) => {
      // scroll to bottom of chat
      setTimeout(() => {
        if (chatScrollRef.current) {
          chatScrollRef.current.scrollTo({
            top: chatScrollRef.current.scrollHeight,
            behavior,
          });
        }
      }, delay);
    },
    []
  );
  const updateMessages = useCallback(
    (messageObj: Omit<MessageType, "id">) => {
      setMessages((prev) => [...prev, { ...messageObj, id: uuidV4() }]);
      scrollToBottom();
    },
    [scrollToBottom]
  );
  const sendMessage = useCallback(
    (message: string) => {
      // emit message
      const messageObj = emitMessage(message);
      if (messageObj) {
        // update messages state
        updateMessages({
          date_created: dayjs().format(),
          date_updated: dayjs().format(),
          message,
          sender: MessageSenders.CUSTOMER,
          is_attachment: messageObj?.attachment || false,
          ticket_chat: chatId as string,
        });
      }
    },
    [emitMessage, chatId, updateMessages]
  );
  const readChat = useCallback(() => {
    if (!ticketChatId) return;
    emitRead(ticketChatId);
    // invalid conversations
    queryClient.invalidateQueries({
      queryKey: [...QUERY_FN_KEYS.CONVERSATIONS, userId],
    });
  }, [ticketChatId, emitRead, queryClient, userId]);

  useEffect(() => {
    setMessages(data?.messages || []);
  }, [data]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading: Boolean(isLoading),
        scrollRef: chatScrollRef,
        sendMessage,
        readChat,
        scrollToBottom,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
