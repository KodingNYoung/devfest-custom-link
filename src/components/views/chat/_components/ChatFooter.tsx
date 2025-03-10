import Icon from "@/components/atoms/Icon";
import Textarea from "@/components/molecules/Textarea";
import { FC } from "@/utils/types";
import React from "react";

const ChatFooter: FC = () => {
  return (
    <footer className="sticky mt-auto left-0 bottom-[65px] flex items-end gap-3 w-full bg-white pb-5">
      <div className="h-14 flex items-end">
        <button type="button">
          <Icon name="icon-attach-circle" size={24} />
        </button>
      </div>
      <Textarea name="msg" rows={1} />
      <button className="size-14 min-h-14 min-w-14 bg-black rounded-full text-white !leading-none cursor-pointer opacity-70 hover:opacity-100 active:">
        <Icon name="icon-send-2" size={20} />
      </button>
      <div className="absolute bottom-0 left-0 w-full shadow-[0px_-10px_20px_10px_rgba(255,255,255,1)]  h-full pointer-events-none -z-1" />
    </footer>
  );
};

export default ChatFooter;
