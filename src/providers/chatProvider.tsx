"use client";

import { useTicketChats } from "@/hooks/apiHooks";
import { useChatNav } from "@/hooks/chat";
import { useChatSocket } from "@/lib/sockets/chats";
import { QUERY_FN_KEYS } from "@/utils/constants";
import { MessageSenders, TicketStatus } from "@/utils/enums";
import {
  ConversationType,
  FC,
  MessageType,
  SocketResponseType,
  TicketRatingSocketResponse,
} from "@/utils/types";
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
  responder: MessageSenders;
  isClosed: boolean;
  showCloseSupport: boolean;
  ticketRating: number | null;
  sendMessage: (message: string) => void;
  readChat: () => void;
  scrollToBottom: (behavior?: ScrollBehavior, delay?: number) => void;
  openSupport: () => void;
  closeTicket: () => void;
  rateTicket: (rating: number) => void;
};
export const ChatContext = createContext<ChatContextProps>({
  messages: [],
  isLoading: true,
  responder: MessageSenders.SATE,
  isClosed: false,
  showCloseSupport: false,
  ticketRating: null,
  sendMessage: () => {},
  readChat: () => {},
  scrollToBottom: () => {},
  openSupport: () => {},
  closeTicket: () => {},
  rateTicket: () => {},
});
type ChatContextProviderProps = { conversations?: ConversationType[] };

export const ChatContextProvider: FC<ChatContextProviderProps> = ({
  children,
  conversations,
}) => {
  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();
  const { sessionId } = useUserSession();

  const { chatId, goToChat } = useChatNav();

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [responder, setResponder] = useState<MessageSenders>(
    MessageSenders.SATE,
  );
  const [isClosed, setIsClosed] = useState(false);
  const [showCloseSupport, setShowCloseSupport] = useState(false);
  const [ticketRating, setTicketRating] = useState<number | null>(null);

  const ticketChatId = useMemo(
    () => (chatId === NEW_CHAT_ID ? null : chatId),
    [chatId],
  );

  const { data, isLoading } = useTicketChats(ticketChatId);

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
    [],
  );
  const updateMessages = useCallback(
    (messageObj: Omit<MessageType, "id">) => {
      setMessages((prev) => [...prev, { ...messageObj, id: uuidV4() }]);
      scrollToBottom();
    },
    [scrollToBottom],
  );

  // socket event handlers
  const onmessage = (message: SocketResponseType) => {
    console.log({ message, chatId, ticketChatId });

    if (message.data.ticket_chat_id && chatId === NEW_CHAT_ID) {
      // if it's a new chat, set the chatId to the one received from the socket
      goToChat(message.data.ticket_chat_id);
    }

    // if there's a current chat
    if (ticketChatId) {
      // emit read
      emitRead(message.data.ticket_chat_id);
      // refetch the chat to update responder, close support, and close status
      setResponder(message.data.sender);
      setIsClosed(Boolean(message.data.closed_support));
      setShowCloseSupport(Boolean(message.data.close_support));
      // update chat messages
      updateMessages({
        date_created: message.data.date_created,
        date_updated: message.data.date_updated,
        message: message.data.message,
        sender: message.data.sender,
        is_attachment: false, //TODO: confirm this -- is it always false? meaning sate or agent cannot reply with attachments?
        ticket_chat: message.data.ticket_chat_id,
      });
    }

    // refetch open conversations
    queryClient.invalidateQueries({
      queryKey: [
        ...QUERY_FN_KEYS.CONVERSATIONS,
        sessionId,
        { status: TicketStatus.OPEN },
      ],
    });
  };
  const oncloseticket = () => {
    setShowCloseSupport(false);
    setIsClosed(true);
    queryClient.invalidateQueries({
      queryKey: QUERY_FN_KEYS.CONVERSATIONS,
    });
  };
  const onreviewticket = (data: TicketRatingSocketResponse) => {
    setTicketRating(data?.data?.rating);
  };

  const {
    emitMessage,
    emitRead,
    emitCloseSupport,
    emitRateSupport,
    subscribeToChat,
  } = useChatSocket(ticketChatId, { onmessage, oncloseticket, onreviewticket });

  // user actions
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
    [emitMessage, chatId, updateMessages],
  );
  const readChat = useCallback(() => {
    if (!ticketChatId) return;
    emitRead(ticketChatId);
    // invalid conversations
    queryClient.invalidateQueries({
      queryKey: [...QUERY_FN_KEYS.CONVERSATIONS, sessionId],
    });
  }, [ticketChatId, emitRead, queryClient, sessionId]);
  const closeTicket = useCallback(() => {
    emitCloseSupport();
  }, [ticketChatId, emitCloseSupport]);
  const rateTicket = useCallback(
    (rating: number) => {
      emitRateSupport(rating);
    },
    [ticketChatId, emitRateSupport],
  );

  useEffect(() => {
    setResponder(data?.responder || MessageSenders.SATE);
    setIsClosed(Boolean(data?.closed));
    setShowCloseSupport(Boolean(data?.close_support));
    setTicketRating(data?.rating || null);

    setMessages(data?.messages || []);
  }, [data]);
  useEffect(() => {
    if (!conversations) return;
    conversations.forEach((conversation) => {
      subscribeToChat(conversation?.id);
    });
  }, [conversations, subscribeToChat]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading: Boolean(isLoading),
        scrollRef: chatScrollRef,
        responder,
        isClosed: isClosed,
        showCloseSupport: showCloseSupport,
        ticketRating,
        sendMessage,
        readChat,
        scrollToBottom,
        openSupport: () => setShowCloseSupport(false),
        closeTicket,
        rateTicket,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
