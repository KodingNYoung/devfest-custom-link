import { ChatId } from "@/providers/chatProvider";
import { useUserSession } from "@/providers/sessionProvider";
import { API_BASEURL } from "@/utils/constants";
import { MessageSenders } from "@/utils/enums";
import { SocketRequestMessageType, SocketResponseType } from "@/utils/types";
import { useCallback, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export const useChatSocket = (
  chatId: ChatId | null,
  cb?: { onmessage?: (message: SocketResponseType) => void }
) => {
  const { onmessage } = cb || {};
  const { apiKey, userId, isAuthUser } = useUserSession();

  const socket = useRef<Socket | null>(null);

  const emitMessage = useCallback(
    (message: string) => {
      if (!socket.current) return;
      const payload = {
        message,
        attachment: false,
        ticket_chat_id: chatId,
        user_id: isAuthUser ? userId : undefined,
        anon_user_id: isAuthUser ? undefined : userId,
      } as SocketRequestMessageType;

      socket.current.emit("support", payload);

      return payload;
    },
    [chatId, isAuthUser, userId]
  );

  const emitRead = useCallback((chatId: ChatId | null) => {
    if (!socket.current || !chatId) return;
    const payload = {
      ticket_chat_id: chatId,
      entity: MessageSenders.CUSTOMER,
    };
    socket.current.emit("mark_conversation_read", payload);
  }, []);

  useEffect(() => {
    if (!API_BASEURL || socket.current) return;

    const _socket = io(`${API_BASEURL}/helpdesk`, {
      autoConnect: true,
      transports: ["websocket"],
      query: {
        token_source: "api",
        token: apiKey,
      },
    });

    _socket.on("disconnect", () => console.log("Disconnected"));
    _socket.on("support", (data: SocketResponseType) => {
      if (onmessage) onmessage(data);
    });
    socket.current = _socket;

    return () => {
      // emit close event to server
      //   socket.current?.close();
    };
  }, [onmessage, apiKey]);

  return { emitMessage, emitRead };
};
