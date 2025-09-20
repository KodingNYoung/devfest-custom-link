import Icon from "@/components/atoms/Icon";
import Textarea from "@/components/molecules/Textarea";
import { useChat } from "@/hooks/chat";
import { MessageSenders } from "@/utils/enums";
import { FC } from "@/utils/types";
import React from "react";

const ChatFooter: FC = () => {
  const { sendMessage, responder, showCloseSupport, isClosed } = useChat();

  const handleSubmit = (formdata: FormData) => {
    const message = formdata.get("msg") as string;
    if (!message) return;
    sendMessage(message);
  };

  return showCloseSupport || isClosed ? null : (
    <form
      action={handleSubmit}
      className="px-6 sticky mt-auto left-0 bottom-0 flex items-end gap-2 w-full bg-white pb-5 z-[1]"
    >
      {responder === MessageSenders.AGENT ? (
        <div className="h-10 flex items-center">
          <button type="button">
            <Icon name="icon-attach-circle" size={18} />
          </button>
        </div>
      ) : null}
      <Textarea
        name="msg"
        rows={1}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && e.currentTarget.value) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
          }
        }}
        placeholder="Type a message"
      />
      <button
        type="submit"
        className="size-10 min-h-10 min-w-10 bg-black rounded-full text-white !leading-none cursor-pointer opacity-70 hover:opacity-100 active:opacity-80"
      >
        <Icon name="icon-send-2" size={18} />
      </button>
      <div className="absolute bottom-0 left-0 w-full shadow-[0px_-15px_20px_10px_rgba(255,255,255,1)]  h-full pointer-events-none -z-1" />
    </form>
  );
};

export default ChatFooter;
