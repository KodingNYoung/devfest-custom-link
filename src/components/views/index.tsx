import { FC } from "@/utils/types";
import React from "react";
import AppLayout from "../templates/app-layout";
import Chat from "./chat";
import Conversations from "./conversations";
import { useConversations } from "@/hooks/apiHooks";
import { useChatNav } from "@/hooks/chat";
import { ChatContextProvider } from "@/providers/chatProvider";
import { TicketStatus } from "@/utils/enums";

const Container: FC = () => {
  const { chatId } = useChatNav();
  const { data: openTickets, isLoading: loadingOpenTickets } = useConversations(
    TicketStatus.OPEN,
  );
  const { data: closedTickets, isLoading: loadingClosedTickets } =
    useConversations(TicketStatus.CLOSED);

  return (
    <AppLayout>
      {(loadingOpenTickets || loadingClosedTickets) && (
        <div className="h-full w-full flex item-center justify-center">
          loading...
        </div>
      )}
      <ChatContextProvider conversations={openTickets}>
        {!(loadingOpenTickets || loadingClosedTickets) ? (
          chatId || (!openTickets?.length && !closedTickets?.length) ? (
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
