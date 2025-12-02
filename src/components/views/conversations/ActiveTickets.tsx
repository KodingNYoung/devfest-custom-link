import { useConversations } from "@/hooks/apiHooks";
import { useChatNav } from "@/hooks/chat";
import { FC } from "@/utils/types";
import React from "react";
import Icon from "@/components/atoms/Icon";
import { TicketStatus } from "@/utils/enums";
import TicketsList from "./_components/TicketsList";
import Spinner from "@/components/atoms/Spinner";

const ActiveTickets: FC = () => {
  const { openNewChat } = useChatNav();
  const { data: conversations = [], isLoading } = useConversations(
    TicketStatus.OPEN,
  );

  return isLoading ? (
    <div className="h-full w-full bg-white flex justify-center items-center py-8">
      <Spinner className="h-[unset]" />
    </div>
  ) : (
    <>
      <TicketsList
        emptyMessage="No active conversations. Click on the button below to start a new conversation"
        tickets={conversations}
      />
      {conversations.length < 3 && (
        <button
          className="flex items-center justify-center gap-1.5 bg-gdg-blue rounded-full text-white !leading-none cursor-pointer opacity-80 hover:opacity-100 p-2.5 transition-opacity duration-200 active:opacity-90"
          onClick={openNewChat}
        >
          <Icon name="icon-plus" size={18} />
          <span className="text-medium-xxs">Start a new conversation</span>
        </button>
      )}
    </>
  );
};

export default ActiveTickets;
