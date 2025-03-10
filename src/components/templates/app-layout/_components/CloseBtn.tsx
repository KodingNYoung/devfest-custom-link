"use client";

import Icon from "@/components/atoms/Icon";
import { motion } from "motion/react";

const CloseBtn = () => {
  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 30, opacity: 0 }}
      transition={{ bounce: 0 }}
    >
      <button
        className="text-white size-10 min-w-10 min-h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 active:scale-80"
        onClick={() => {
          if (typeof window !== "undefined" && window.parent) {
            window.parent.postMessage({ action: "closeChat" }, "*");
          }
        }}
      >
        <Icon name="icon-close" size={24} />
      </button>
    </motion.div>
  );
};

export default CloseBtn;
