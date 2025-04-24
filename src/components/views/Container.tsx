import { FC } from "@/utils/types";
import React from "react";
import AppLayout from "../templates/app-layout";
import Chat from "./chat";
import Conversations from "./conversations";
import { useConversations } from "@/hooks/apiHooks";
import { useChatNav } from "@/hooks/chat";
import { ChatContextProvider } from "@/providers/chatProvider";

const Container: FC = () => {
  const { chatId } = useChatNav();
  const { data, isLoading } = useConversations();

  return (
    <AppLayout>
      {isLoading && (
        <div className="h-full w-full flex item-center justify-center">
          loading...
        </div>
      )}
      <ChatContextProvider>
        {!isLoading ? (
          chatId || !data?.length ? (
            <Chat />
          ) : (
            <Conversations />
          )
        ) : null}
      </ChatContextProvider>
    </AppLayout>
  );
};

export default Container;
