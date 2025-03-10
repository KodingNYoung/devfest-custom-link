import ChatLoader from "@/components/atoms/ChatLoader";
import Icon from "@/components/atoms/Icon";
import { cls } from "@/utils/helpers";
import { FC } from "@/utils/types";
import React from "react";

type Props = {
  typing?: boolean;
};

const GuestMessageBox: FC<Props> = ({ typing }) => {
  return (
    <section className="flex gap-2 items-end">
      <div className="size-8 min-h-8 min-w-8 flex justify-center items-center rounded-full bg-black text-white">
        <Icon name="icon-eusate" size={12} />
      </div>
      <div
        className={cls(
          "bg-gold-50 w-fit rounded-xl max-w-[326px] px-3 grid gap-2",
          typing ? "py-1" : "py-3 "
        )}
      >
        {typing ? (
          <ChatLoader className="w-8" />
        ) : (
          <>
            <span
              className="text-medium-sm [&_ol]:list-decimal [&_ol]:list-inside [&_ul]:list-inside text-gray-900"
              dangerouslySetInnerHTML={{
                __html:
                  "Hi, welcome to eusate help center. What can i help you with today?",
              }}
            />
            <span className="text-gray-400 text-regular-xs">12:54PM</span>
          </>
        )}
      </div>
    </section>
  );
};

export default GuestMessageBox;
