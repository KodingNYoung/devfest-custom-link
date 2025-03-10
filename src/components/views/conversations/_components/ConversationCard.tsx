import { FC, MessageSenders } from "@/utils/types";
import { ROUTES } from "@/utils/constants";
import Link from "next/link";
import Icon from "@/components/atoms/Icon";
import { cls } from "@/utils/helpers";

type Props = {
  id: string | number;
  lastMessageSender: MessageSenders;
  newMessageCount?: number;
};

const ConversationCard: FC<Props> = ({
  id,
  lastMessageSender,
  newMessageCount,
}) => {
  return (
    <Link
      href={`${ROUTES.CHAT}/${id}`}
      className="border border-gray-50 w-full p-3 rounded-xl flex items-start gap-3"
      prefetch
    >
      <div className="size-8 min-h-8 min-w-8 flex justify-center items-center rounded-full bg-black text-white">
        <Icon name="icon-eusate" size={12} />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center justify-between">
          <h4 className="text-medium-sm text-gray-500">
            Conversation ID/Issue title
          </h4>
          <span className="text-gray-300 text-regular-xs">12/12/2024</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span
            className={cls(
              newMessageCount
                ? "text-medium-sm text-gray-900"
                : "text-regular-sm text-gray-400"
            )}
          >
            {lastMessageSender === "user"
              ? "You: "
              : lastMessageSender === "sate"
              ? "Sate: "
              : "Agent: "}{" "}
            Hi, I&#39;m Z Bot, your digital assistant.
          </span>
          <span className="flex-1" />
          {newMessageCount && (
            <span className="size-6 min-w-6 min-h-6 bg-brand-gradient text-white rounded-full flex items-center justify-center text-medium-sm">
              {newMessageCount}
            </span>
          )}
          <Icon name="icon-chevron-down" size={24} className="-rotate-90 !text-gray-400" />
        </div>
      </div>
    </Link>
  );
};

export default ConversationCard;
