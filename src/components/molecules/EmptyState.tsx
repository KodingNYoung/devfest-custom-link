import { FC } from "@/utils/types";
import React from "react";
import Icon from "../atoms/Icon";

type Props = {
  message: string;
};

const EmptyState: FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-col gap-3 items-center border border-gray-50 rounded-xl p-6">
      <div className="size-12 min-w-12 min-h-12 text-gray-500 border border-gray-100 bg-gray-50 rounded-full flex items-center justify-center">
        <Icon name="icon-message-3" size={24} />
      </div>
      <span className="text-medium-xs text-gray-400 text-center max-w-[280px]">{message}</span>
    </div>
  );
};

export default EmptyState;
