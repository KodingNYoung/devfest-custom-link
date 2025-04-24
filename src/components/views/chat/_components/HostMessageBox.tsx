import Icon from "@/components/atoms/Icon";
import { formatToMessageTime } from "@/utils/helpers";
import { FC, MessageType } from "@/utils/types";
import React from "react";

type Props = {
  message: MessageType;
};

const HostMessageBox: FC<Props> = ({ message }) => {
  return (
    <section className="flex gap-1.5 items-end justify-end ml-auto w-[80%]">
      <div className="bg-gray-50 w-fit min-w-[100px] rounded-xl p-2 grid gap-1.5">
        <span className="text-medium-xs text-gray-900">{message.message}</span>
        <span className="text-gray-400 text-regular-xxs">
          {formatToMessageTime(message.date_created)}
        </span>
      </div>
      <div className="size-7 min-h-7 min-w-7 flex justify-center items-center rounded-full bg-black text-white">
        <Icon name="icon-eusate" size={12} />
      </div>
    </section>
  );
};

export default HostMessageBox;
