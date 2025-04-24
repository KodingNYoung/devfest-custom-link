import { FC } from "@/utils/types";
import ChatFooter from "./_components/ChatFooter";
import ChatWall from "./_components/ChatWall";
import { useEffect } from "react";
import { useChat } from "@/hooks/chat";

const Chat: FC = () => {
  const { messages, readChat, scrollRef, scrollToBottom } = useChat();
  scrollToBottom("instant", 0);

  useEffect(() => {
    console.log("Chat component mounted, should emit chat read here");
    readChat();
  }, [messages]);


  return (
    <div
      ref={scrollRef}
      className="pt-4 flex flex-col flex-1 h-full overflow-auto relative"
    >
      <ChatWall />
      <ChatFooter />
    </div>
  );
};

export default Chat;
