import Icon from "@/components/atoms/Icon";
import { useChatNav } from "@/hooks/chat";
import { FC } from "@/utils/types";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

type Props = {
  shouldShow: boolean;
};

const BackBtn: FC<Props> = ({ shouldShow }) => {
  const { backToConversations } = useChatNav();
  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          transition={{ bounce: 0 }}
        >
          <button
            onClick={backToConversations}
            className="text-white size-8 min-w-8 min-h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 active:scale-80"
          >
            <Icon name="icon-arrow-left" size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackBtn;
