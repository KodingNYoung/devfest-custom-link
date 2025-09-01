import ChatLoader from "@/components/atoms/ChatLoader";
import Icon from "@/components/atoms/Icon";
import { cls, formatToMessageTime } from "@/utils/helpers";
import { FC, MessageType } from "@/utils/types";
import React, { useRef } from "react";

type Props = {
  typing?: boolean;
  message: MessageType;
};

const GuestMessageBox: FC<Props> = ({ typing, message }) => {
  const textBoxRef = useRef<HTMLDivElement>(null);

  return (
    <section className="flex gap-1.5 items-end w-[80%]">
      <div className="size-7 min-h-7 min-w-7 flex justify-center items-center rounded-full bg-black text-white">
        <Icon name="icon-eusate" size={12} />
      </div>
      <div
        className={cls(
          "bg-gold-50 w-fit min-w-[100px] rounded-xl px-2 grid gap-1.5",
          typing ? "py-0.5" : "py-2"
        )}
      >
        {typing ? (
          <ChatLoader className="w-6" />
        ) : (
          <>
            <span
              ref={textBoxRef}
              className="text-medium-xs [&_ol]:list-decimal [&_ol]:list-inside [&_ul]:list-inside text-gray-900 [&_a]:text-info-500 [&_a]:underline"
              dangerouslySetInnerHTML={{
                __html: message?.message?.trim(),
              }}
            />
            <span className="text-gray-400 text-regular-xxs">
              {formatToMessageTime(message.date_created)}
            </span>
          </>
        )}
      </div>
    </section>
  );
};

export default GuestMessageBox;
