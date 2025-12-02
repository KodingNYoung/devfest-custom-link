import { FC } from "@/utils/types";
import React from "react";
import GuestMessageBox from "./GuestMessageBox";
import HostMessageBox from "./HostMessageBox";
import { MessageSenders } from "@/utils/enums";
import { useChat } from "@/hooks/chat";
import EmptyChatWall from "./EmptyChatWall";
import EndOfMessage from "./EndOfMessage";
import Spinner from "@/components/atoms/Spinner";
import { useSearchParams } from "next/navigation";

const ChatWall: FC = () => {
  const { messages, isLoading } = useChat();
  const searchParams = useSearchParams();

  const disallowLoad = searchParams.get("dl") === "1";

  return (
    <div className="mb-8 flex flex-col items-start gap-7 max-w-full px-6">
      {isLoading && !disallowLoad && !messages?.length && (
        <div className="h-full w-full bg-white flex justify-center items-center py-8">
          <Spinner className="h-[unset]" />
        </div>
      )}
      {!messages.length && !isLoading && <EmptyChatWall />}
      {messages.map((message) => {
        const isGuest = message.sender !== MessageSenders.CUSTOMER;
        return isGuest ? (
          <GuestMessageBox key={message.id} message={message} />
        ) : (
          <HostMessageBox key={message.id} message={message} />
        );
      })}
      <EndOfMessage />
    </div>
  );
};

export default ChatWall;
