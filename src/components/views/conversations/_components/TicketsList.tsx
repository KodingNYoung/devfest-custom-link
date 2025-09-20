import { ConversationType, FC } from "@/utils/types";
import React from "react";
import ConversationCard from "./ConversationCard";
import EmptyState from "@/components/molecules/EmptyState";

type Props = {
  tickets: ConversationType[];
  emptyMessage: string;
};

const TicketsList: FC<Props> = ({ tickets, emptyMessage }) => {
  return (
    <section className="flex flex-col gap-2 flex-1 no-scroller scroll">
      {tickets && tickets.length ? (
        tickets.map((ticket, idx) => {
          return (
            <ConversationCard
              key={`${ticket.id}${idx}`}
              conversation={ticket}
            />
          );
        })
      ) : (
        <EmptyState message={emptyMessage} />
      )}
    </section>
  );
};

export default TicketsList;
