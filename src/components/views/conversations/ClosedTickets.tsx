import { useConversations } from "@/hooks/apiHooks";
import { TicketStatus } from "@/utils/enums";
import { FC } from "@/utils/types";
import React from "react";
import TicketsList from "./_components/TicketsList";

const ClosedTickets: FC = () => {
  const { data: conversations = [] } = useConversations(TicketStatus.CLOSED);
  return (
    <TicketsList
      emptyMessage="No closed conversations. When you close a conversation it will appear here."
      tickets={conversations}
    />
  );
};

export default ClosedTickets;
