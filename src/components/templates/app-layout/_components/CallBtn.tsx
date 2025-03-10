"use client";

import Icon from "@/components/atoms/Icon";
import { motion } from "motion/react";

const CallBtn = () => {
  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -30, opacity: 0 }}
      transition={{ bounce: 0 }}
    >
      <button className="text-white size-10 min-w-10 min-h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 active:scale-80">
        <Icon name="icon-call" size={24} />
      </button>
    </motion.div>
  );
};

export default CallBtn;
