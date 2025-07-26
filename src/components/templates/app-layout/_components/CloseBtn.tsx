"use client";

import Icon from "@/components/atoms/Icon";
import { useUserSession } from "@/providers/sessionProvider";
import { POST_MESSAGE_TYPES } from "@/utils/constants";
import { PostMessageType } from "@/utils/types";
import { motion } from "motion/react";

const CloseBtn = () => {
  const { parentOrigin } = useUserSession();
  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 30, opacity: 0 }}
      transition={{ bounce: 0 }}
    >
      <button
        className="text-white size-8 min-w-8 min-h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 active:scale-80"
        onClick={() => {
          if (typeof window !== "undefined" && window.parent) {
            window.parent.postMessage(
              {
                type: POST_MESSAGE_TYPES.CLOSE_CHAT,
                timestamp: Date.now(),
              } as PostMessageType,
              parentOrigin
            );
          }
        }}
      >
        <Icon name="icon-close" size={18} />
      </button>
    </motion.div>
  );
};

export default CloseBtn;
