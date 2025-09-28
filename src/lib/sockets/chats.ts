import { ChatId } from "@/providers/chatProvider";
import { useUserSession } from "@/providers/sessionProvider";
import { MessageSenders } from "@/utils/enums";
import {
  SocketRequestMessageType,
  SocketResponseType,
  TicketRatingSocketResponse,
} from "@/utils/types";
import { useCallback, useEffect } from "react";
import { useSocket } from ".";

export const useChatSocket = (
  chatId: ChatId | null,
  cb?: {
    onmessage?: (message: SocketResponseType) => void;
    oncloseticket?: (message: SocketResponseType) => void;
    onreviewticket?: (message: TicketRatingSocketResponse) => void;
  }
) => {
  const { onmessage, oncloseticket, onreviewticket } = cb || {};
  const { sessionId } = useUserSession();

  const { socket, isConnected } = useSocket(`/helpdesk`);

  useEffect(() => {
    if (!socket) return;

    socket.on("support", (data: SocketResponseType) => {
      if (onmessage) onmessage(data);
    });
    socket.on("close_support", (data: SocketResponseType) => {
      if (oncloseticket) oncloseticket(data);
    });
    socket.on("review_support", (data: TicketRatingSocketResponse) => {
      if (onreviewticket) onreviewticket(data);
    });
  }, [socket]);

  const subscribeToChat = useCallback(
    (chatId: ChatId) => {
      if (!socket || !chatId || !isConnected) return;
      const payload = {
        ticket_chat_id: chatId,
      };
      socket.emit("enter_support", payload);
    },
    [socket, isConnected]
  );

  const emitMessage = useCallback(
    (message: string) => {
      if (!socket || !isConnected) return;
      const payload = {
        message,
        attachment: false,
        ticket_chat_id: chatId,
        session_id: sessionId,
      } as SocketRequestMessageType;

      socket.emit("support", payload);

      return payload;
    },
    [chatId, sessionId, socket, isConnected]
  );

  const emitRead = useCallback(
    (chatId: ChatId | null) => {
      if (!socket || !chatId || !isConnected) return;
      const payload = {
        ticket_chat_id: chatId,
        entity: MessageSenders.CUSTOMER,
      };
      socket.emit("mark_conversation_read", payload);
    },
    [socket, isConnected]
  );

  const emitCloseSupport = useCallback(() => {
    if (!socket || !chatId || !isConnected) return;
    const payload = {
      ticket_chat_id: chatId,
    };
    socket.emit("close_support", payload);
  }, [socket, isConnected, chatId]);

  const emitRateSupport = useCallback(
    (rating: number) => {
      if (!socket || !chatId || !isConnected || !rating) return;
      const payload = {
        ticket_chat_id: chatId,
        rating: rating,
      };
      socket.emit("review_support", payload);
    },
    [socket, isConnected, chatId]
  );

  return {
    emitMessage,
    emitRead,
    emitCloseSupport,
    emitRateSupport,
    subscribeToChat,
  };
};
