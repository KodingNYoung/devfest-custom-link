import Icon from "@/components/atoms/Icon";
import { FC } from "@/utils/types";
import React from "react";

const HostMessageBox: FC = () => {
  return (
    <section className="flex gap-2 items-end ml-auto">
      <div className="bg-gray-50 w-fit rounded-xl max-w-[326px] p-3 grid gap-2">
        <span className="text-medium-sm text-gray-900">
          Please, I need your help with something minor.
        </span>
        <span className="text-gray-400 text-regular-xs">12:54PM</span>
      </div>
      <div className="size-8 min-h-8 min-w-8 flex justify-center items-center rounded-full bg-black text-white">
        <Icon name="icon-eusate" size={12} />
      </div>
    </section>
  );
};

export default HostMessageBox;
