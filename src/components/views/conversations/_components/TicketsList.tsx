import { ConversationType, FC } from "@/utils/types";
import React from "react";
import ConversationCard from "./ConversationCard";

type Props = {
  tickets: ConversationType[];
};

const TicketsList: FC<Props> = ({ tickets }) => {
  return (
    <section className="flex flex-col gap-2 flex-1 no-scroller scroll">
      {tickets &&
        tickets.map((ticket, idx) => {
          return (
            <ConversationCard
              key={`${ticket.id}${idx}`}
              conversation={ticket}
            />
          );
        })}
    </section>
  );
};

export default TicketsList;
