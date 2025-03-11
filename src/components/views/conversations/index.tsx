import { FC, MessageSenders } from "@/utils/types";
import ConversationCard from "./_components/ConversationCard";

const senders: MessageSenders[] = ["sate", "agent", "user"];

const Conversations: FC = () => {
  return (
    <div className="px-8 py-5 pb-8 flex flex-col gap-6">
      <header className="text-semibold-xl text-black">Conversations</header>
      <section className="grid gap-3 flex-1 no-scroller scroll">
        {new Array(10).fill(null).map((_, idx) => {
          const sender = idx > 2 ? senders[idx % 2] : senders[idx];
          return (
            <ConversationCard
              key={idx}
              id={idx}
              lastMessageSender={sender}
              newMessageCount={sender !== "user" ? 1 : undefined}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Conversations;
