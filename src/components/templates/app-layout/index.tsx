"use client";

import React, { useEffect } from "react";
import { FC } from "@/utils/types";
import Header from "./Header";
import Footer from "@/components/templates/app-layout/Footer";
import { useChatNav } from "@/hooks/chat";
import { useConversations } from "@/hooks/apiHooks";
import { TicketStatus } from "@/utils/enums";
import Spinner from "@/components/atoms/Spinner";

const AppLayout: FC = ({ children }) => {
  const { chatId, openNewChat } = useChatNav();
  const { data: openTickets, isLoading: loadingOpenTickets } = useConversations(
    TicketStatus.OPEN,
  );
  const { data: closedTickets, isLoading: loadingClosedTickets } =
    useConversations(TicketStatus.CLOSED);

  useEffect(() => {
    console.log({
      loadingClosedTickets,
      loadingOpenTickets,
      chatId,
      noChatId: chatId === null,
      noOfOpenTickets: openTickets,
      noOfClosedTickets: closedTickets,
    });
    if (
      loadingClosedTickets ||
      !closedTickets ||
      loadingOpenTickets ||
      !openTickets
    )
      return;

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
    <div className="flex flex-col h-full bg-gdg-blue">
      {loadingClosedTickets || loadingClosedTickets ? (
        <div className="h-full bg-white flex justify-center items-start py-8 [&_svg]:h-[unset]">
          <Spinner />
        </div>
      ) : (
        <>
          <Header hasNoChat={!(openTickets?.length || closedTickets?.length)} />
          <div className="flex-1 bg-white rounded-t-[20px] flex flex-col h-[calc(100%_-_88px)] whitespace-break-spaces relative">
            {children}
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default AppLayout;
