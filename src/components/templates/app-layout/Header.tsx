"use client";

import { FC } from "@/utils/types";
import Icon from "@/components/atoms/Icon";
import CloseBtn from "@/components/templates/app-layout/_components/CloseBtn";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/utils/constants";
import CallBtn from "./_components/CallBtn";
import { AnimatePresence } from "motion/react";
import BackBtn from "./_components/BackBtn";

const Header: FC = () => {
  const pathname = usePathname();
  const isConversationsScreen = pathname === ROUTES.CONVERSATIONS;
  return (
    <header className="flex items-center justify-between px-8 py-5 gap-5">
      <BackBtn shouldShow={!isConversationsScreen} />
      <div className="flex items-center gap-3">
        <div className="bg-brand-gradient text-white !leading-none size-12 min-w-12 min-h-12 flex items-center justify-center rounded-full">
          <Icon name="icon-eusate" size={24} />
        </div>
        <span className="text-semibold-xl text-white">Eusate</span>
      </div>
      <span className="flex-1" />
      <AnimatePresence>
        {isConversationsScreen ? <CloseBtn /> : <CallBtn />}
      </AnimatePresence>
    </header>
  );
};

export default Header;
