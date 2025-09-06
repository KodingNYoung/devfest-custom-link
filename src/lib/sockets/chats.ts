import { ChatId } from "@/providers/chatProvider";
import { useUserSession } from "@/providers/sessionProvider";
import { MessageSenders } from "@/utils/enums";
import { SocketRequestMessageType, SocketResponseType } from "@/utils/types";
import { useCallback, useEffect } from "react";
import { useSocket } from ".";

export const useChatSocket = (
  chatId: ChatId | null,
  cb?: { onmessage?: (message: SocketResponseType) => void }
) => {
  const { onmessage } = cb || {};
  const { sessionId } = useUserSession();

  const { socket, isConnected } = useSocket(`/helpdesk`);

  useEffect(() => {
    if (!socket) return;

    socket.on("support", (data: SocketResponseType) => {
      if (onmessage) onmessage(data);
    });
  }, [socket]);

  const emitMessage = useCallback(
    (message: string) => {
      if (!socket || !isConnected) return;
      const payload = {
        message,
        attachment: false,
        ticket_chat_id: chatId,
        session_id: sessionId,
      } as SocketRequestMessageType;

      console.log(payload);

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

  return { emitMessage, emitRead };
};
