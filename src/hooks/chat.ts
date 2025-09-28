import { ChatContext, ChatNavContext } from "@/providers/chatProvider";
import { useContext } from "react";

export const useChatNav = () => {
  const context = useContext(ChatNavContext);
  if (!context) {
    throw new Error(
      "useChatNav should be called inside a ChatNavContextProvider",
    );
  }

  return context;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat should be called inside a ChatContextProvider");
  }

  return context;
};

export const useChatScroll = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error(
      "useChatScroll should be called inside a ChatContextProvider",
    );
  }

  return context.scrollRef;
};
