import { FC } from "@/utils/types";
import React, { useEffect } from "react";
import AppLayout from "../templates/app-layout";
import Chat from "./chat";
import Conversations from "./conversations";
import { useConversations } from "@/hooks/apiHooks";
import { useChatNav } from "@/hooks/chat";
import { ChatContextProvider } from "@/providers/chatProvider";
import { TicketStatus } from "@/utils/enums";

const Container: FC = () => {
  const { chatId, openNewChat } = useChatNav();
  const { data: openTickets, isLoading: loadingOpenTickets } = useConversations(
    TicketStatus.OPEN,
  );
  const { data: closedTickets, isLoading: loadingClosedTickets } =
    useConversations(TicketStatus.CLOSED);

  useEffect(() => {
    if (loadingClosedTickets || loadingOpenTickets) return;

    if (chatId === null && !openTickets?.length && !closedTickets?.length) {
      openNewChat();
    }
  }, [
    closedTickets,
    openTickets,
    chatId,
    loadingClosedTickets,
    loadingClosedTickets,
  ]);

  return (
    <AppLayout hasNoChat={!(openTickets?.length || closedTickets?.length)}>
      {(loadingOpenTickets || loadingClosedTickets) && (
        <div className="h-full w-full flex item-center justify-center">
          loading...
        </div>
      )}
      <ChatContextProvider conversations={openTickets}>
        {!(loadingOpenTickets || loadingClosedTickets) ? (
          chatId ? (
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
