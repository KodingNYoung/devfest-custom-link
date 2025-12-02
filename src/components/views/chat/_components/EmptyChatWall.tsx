import { GDGLogo } from "@/assets/svg";
import { FC } from "@/utils/types";
import React from "react";

const EmptyChatWall: FC = () => {
  return (
    <div className="h-full w-full pt-10">
      <div className="flex flex-col gap-3 items-center max-w-[285px] mx-auto">
        <div className="size-10 min-w-10 min-h-10 bg-black rounded-full flex justify-center items-center text-white">
          {GDGLogo}
        </div>
        <span className="text-center text-medium-xs text-gray-400">
          You are about to start a chat with our support team. Please share the
          issue you&apos;re experiencing, and we&apos;ll work together to
          resolve it.
        </span>
      </div>
    </div>
  );
};

export default EmptyChatWall;
