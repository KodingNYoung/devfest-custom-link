import Icon from "@/components/atoms/Icon";
import { useChat } from "@/hooks/chat";
import { FC } from "@/utils/types";
import React from "react";

const EndChatMessage: FC = () => {
  const { openSupport, closeTicket, isClosed } = useChat();
  return (
    <>
      <section className="flex gap-1.5 items-end w-[80%] max-w-[230px]">
        <div className="size-7 min-h-7 min-w-7 flex justify-center items-center rounded-full bg-black text-white">
          <Icon name="icon-eusate" size={12} />
        </div>
        <div className="bg-gold-50 w-fit min-w-[100px] rounded-xl px-2 grid gap-3 py-2">
          <p className="text-medium-xs text-gray-900">
            Have we been able to solve your problem?
          </p>
          {!isClosed && (
            <>
              <div className="flex items-center gap-1.5">
                <button
                  className="flex-1 text-medium-xs text-white py-1.5 rounded-[90px] bg-error-500 cursor-pointer hover:bg-error-600 transition-colors"
                  onClick={openSupport}
                >
                  No
                </button>
                <button
                  className="flex-1 text-medium-xs text-white py-1.5 rounded-[90px] bg-success-500 cursor-pointer hover:bg-success-600 transition-colors"
                  onClick={closeTicket}
                >
                  Yes
                </button>
              </div>
              <span className="text-gray-400 text-regular-xs">
                Please click &apos;yes&apos; if your previous issues are fully resolved.
                Feel free to start a new conversation for any new concerns.
              </span>
            </>
          )}
        </div>
      </section>
      {isClosed && (
        <section className="flex gap-1.5 items-end justify-end ml-auto w-[80%] max-w-[230px]">
          <div className="bg-gray-50 w-fit min-w-[100px] rounded-xl p-2 grid gap-1.5">
            <span className="text-medium-xs text-gray-900">Yes</span>
          </div>
        </section>
      )}
    </>
  );
};

export default EndChatMessage;
