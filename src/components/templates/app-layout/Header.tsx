"use client";

import { FC } from "@/utils/types";
import BackBtn from "./_components/BackBtn";
import { useChatNav } from "@/hooks/chat";
import { GDGLogo } from "@/assets/svg";

const Header: FC = () => {
  const { chatId } = useChatNav();

  const isConversationsScreen = !chatId;
  return (
    <header className="flex items-center justify-start px-6 py-4 gap-[14px]">
      <BackBtn shouldShow={!isConversationsScreen} />
      <div className="flex items-center gap-2.5">
        <div className="bg-white text-white !leading-none size-9 min-w-9 min-h-9 flex items-center justify-center rounded-full">
          {GDGLogo}
        </div>
        <span className="text-semibold-sm text-white">GDG Akure</span>
      </div>
    </header>
  );
};

export default Header;
