import Icon from "@/components/atoms/Icon";
import { ROUTES } from "@/utils/constants";
import { FC } from "@/utils/types";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React from "react";

type Props = {
  shouldShow: boolean;
};

const BackBtn: FC<Props> = ({ shouldShow }) => {
  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          transition={{ bounce: 0 }}
        >
          <Link
            href={ROUTES.CONVERSATIONS}
            className="text-white size-10 min-w-10 min-h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 active:scale-80"
          >
            <Icon name="icon-arrow-left" size={24} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackBtn;
