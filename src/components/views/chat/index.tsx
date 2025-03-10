import { FC } from "@/utils/types";
import ChatFooter from "./_components/ChatFooter";
import ChatWall from "./_components/ChatWall";

type Props = {
  chatId: string;
};

const Chat: FC<Props> = ({}) => {
  // TODO: initiate ws here with hook.
  return (
    <div className="px-8 pt-5 flex flex-col flex-1">
      <ChatWall />
      <ChatFooter />
    </div>
  );
};

export default Chat;
