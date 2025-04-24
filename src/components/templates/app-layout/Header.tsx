"use client";

import { FC } from "@/utils/types";
import Icon from "@/components/atoms/Icon";
import CloseBtn from "@/components/templates/app-layout/_components/CloseBtn";
import CallBtn from "./_components/CallBtn";
import { AnimatePresence } from "motion/react";
import BackBtn from "./_components/BackBtn";
import { useChatNav } from "@/hooks/chat";

const Header: FC = () => {
  const { chatId } = useChatNav();

  const isConversationsScreen = !chatId;
  return (
    <header className="flex items-center justify-between px-6 py-4 gap-[14px]">
      <BackBtn shouldShow={!isConversationsScreen} />
      <div className="flex items-center gap-2.5">
        <div className="bg-brand-gradient text-white !leading-none size-9 min-w-9 min-h-9 flex items-center justify-center rounded-full">
          <Icon name="icon-eusate" size={18} />
        </div>
        <span className="text-semibold-sm text-white">Eusate</span>
      </div>
      <span className="flex-1" />
      <AnimatePresence>
        {isConversationsScreen ? <CloseBtn /> : <CallBtn />}
      </AnimatePresence>
    </header>
  );
};

export default Header;
