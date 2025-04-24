import { FC } from "@/utils/types";
import React from "react";
import GuestMessageBox from "./GuestMessageBox";
import HostMessageBox from "./HostMessageBox";
import { MessageSenders } from "@/utils/enums";
import { useChat } from "@/hooks/chat";
import EmptyChatWall from "./EmptyChatWall";

const ChatWall: FC = () => {
  const { messages, isLoading } = useChat();
  return (
    <div className="mb-8 flex flex-col items-start gap-7 max-w-full px-6">
      {isLoading && !messages?.length && (
        <div className="h-full w-full flex items-center justify-center">
          loading...
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
    </div>
  );
};

export default ChatWall;
