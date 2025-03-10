import Chat from "@/components/views/chat";
import { PageFC } from "@/utils/types";

const ChatPage: PageFC<{ chatId: string }> = async ({ params }) => {
  const chatId = (await params)?.chatId;

  return chatId ? <Chat chatId={chatId} /> : <>No chats</>;
};

export default ChatPage;
