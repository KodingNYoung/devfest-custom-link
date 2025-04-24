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
      <button className="text-white size-8 min-w-8 min-h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 active:scale-80">
        <Icon name="icon-call" size={18} />
      </button>
    </motion.div>
  );
};

export default CallBtn;
