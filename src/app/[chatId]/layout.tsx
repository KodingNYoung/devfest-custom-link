import { ChatContextProvider } from "@/providers/chatProvider";
import { LayoutFC } from "@/utils/types";
import React from "react";

const ChatLayout: LayoutFC = ({ children }) => {
  return <ChatContextProvider>{children}</ChatContextProvider>;
};

export default ChatLayout;
