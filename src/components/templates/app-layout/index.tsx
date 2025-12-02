"use client";

import React, { useEffect } from "react";
import { FC } from "@/utils/types";
import Header from "./Header";
import Footer from "@/components/templates/app-layout/Footer";
import { useChatNav } from "@/hooks/chat";
import { useConversations } from "@/hooks/apiHooks";
import { TicketStatus } from "@/utils/enums";
import Spinner from "@/components/atoms/Spinner";
import { useChatSocket } from "@/lib/sockets/chats";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_FN_KEYS } from "@/utils/constants";
import { useUserSession } from "@/providers/sessionProvider";

const AppLayout: FC = ({ children }) => {
  const queryClient = useQueryClient();
  const { sessionId } = useUserSession();
  const { chatId, openNewChat } = useChatNav();

  const { data: openTickets, isLoading: loadingOpenTickets } = useConversations(
    TicketStatus.OPEN,
  );
  const { data: closedTickets, isLoading: loadingClosedTickets } =
    useConversations(TicketStatus.CLOSED);
  const { subscribeToChat } = useChatSocket(null, {
    onmessage: () => {
      queryClient.invalidateQueries({
        queryKey: [
          ...QUERY_FN_KEYS.CONVERSATIONS,
          sessionId,
          { status: TicketStatus.OPEN },
        ],
      });
    },
  });

  useEffect(() => {
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

  useEffect(() => {
    if (!openTickets) return;
    // remove this and move it to the openTickets screen
    openTickets.forEach((conversation) => {
      subscribeToChat(conversation?.id);
    });
  }, [openTickets?.length, subscribeToChat]);

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
