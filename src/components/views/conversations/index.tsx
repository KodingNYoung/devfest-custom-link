import { FC } from "@/utils/types";
import ConversationCard from "./_components/ConversationCard";
import { useConversations } from "@/hooks/apiHooks";
import Icon from "@/components/atoms/Icon";
import { useChatNav } from "@/hooks/chat";

const Conversations: FC = () => {
  const { openNewChat } = useChatNav();
  const { data: conversations = [] } = useConversations();

  return (
    <div className="px-6 py-4 pb-6 flex flex-col gap-4 flex-1">
      <header className="text-semibold-base text-black">Conversations</header>
      <section className="flex flex-col gap-2 flex-1 no-scroller scroll">
        {conversations &&
          conversations.map((conversation, idx) => {
            return (
              <ConversationCard
                key={`${conversation.id}${idx}`}
                conversation={conversation}
              />
            );
          })}
      </section>
      {conversations.length < 3 && (
        <button
          className="flex items-center justify-center gap-1.5 bg-black rounded-full text-white !leading-none cursor-pointer opacity-80 hover:opacity-100 p-2.5 transition-opacity duration-200 active:opacity-90"
          onClick={openNewChat}
        >
          <Icon name="icon-plus" size={18} />
          <span className="text-medium-xxs">Start a new conversation</span>
        </button>
      )}
    </div>
  );
};

export default Conversations;
