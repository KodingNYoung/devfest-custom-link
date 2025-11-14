"use client";

import { ConversationType, FC } from "@/utils/types";
import Icon from "@/components/atoms/Icon";
import { cls } from "@/utils/helpers";
import { MessageSenders } from "@/utils/enums";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { useChatNav } from "@/hooks/chat";

dayjs.extend(relativeTime);
dayjs.extend(utc);

type Props = {
  conversation: ConversationType;
};

const ConversationCard: FC<Props> = ({ conversation }) => {
  const { goToChat } = useChatNav();

  return (
    <button
      onClick={() => {
        goToChat(conversation.id);
      }}
      className="border border-gray-50 w-full p-2.5 rounded-xl flex items-start gap-2 cursor-pointer"
    >
      <div className="size-6 min-h-6 min-w-6 flex justify-center items-center rounded-full bg-black text-white">
        <Icon name="icon-eusate" size={9} />
      </div>
      <div className="flex flex-col gap-1 flex-1 w-[calc(100%_-_44px)]">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-[11px] text-gray-500">
            {conversation.ticket_slug}
          </h4>
          <span className="text-gray-300 font-regular text-[10px]">
            {dayjs(conversation.latest_message.date_created).fromNow()}
          </span>
        </div>
        <div className="flex items-center justify-between gap-3 w-full">
          <span
            className={cls(
              "truncate w-full text-left",
              !conversation.read_by_customer
                ? "text-medium-xs text-gray-900"
                : "text-regular-xs text-gray-400",
            )}
          >
            {conversation.latest_message.sender === MessageSenders.CUSTOMER
              ? "You: "
              : conversation.latest_message.sender === MessageSenders.SATE
                ? "Sate: "
                : "Agent: "}{" "}
            {conversation.latest_message.message}
          </span>
          <span className="flex-1" />
          {!conversation.read_by_customer && (
            <span className="size-3 min-w-3 min-h-3 bg-gdg-blue text-white rounded-full flex items-center justify-center text-medium-xs" />
          )}
          <Icon
            name="icon-chevron-down"
            size={18}
            className="-rotate-90 !text-gray-400"
          />
        </div>
      </div>
    </button>
  );
};

export default ConversationCard;
