import React, { createElement, HTMLProps } from "react";
import { FC, TWClassNames } from "@/utils/types";
import { cls } from "@/utils/helpers";

type Slots = "root" | "inputContainer" | "input";
export type InputProps = Omit<HTMLProps<HTMLTextAreaElement>, "size"> & {
  name: string;
  classNames?: { [slot in Slots]?: TWClassNames };
};

const Textarea: FC<InputProps> = ({
  name,
  className,
  id,
  classNames,
  ...props
}) => {
  return (
    <div className={cls("w-full", classNames?.root)}>
      <label htmlFor={id || name}>
        <div
          className={cls(
            "flex items-center relative rounded-[20px] border border-[#E4E7EC]",
            "",
            classNames?.inputContainer
          )}
        >
          <textarea
            className={cls(
              "p-4  transition-colors duration-200 outline-0 w-full relative regular-sm font-app text-gray-900 bg-white-100",
              "placeholder:text-regular-sm placeholder:text-gray-400 rounded-[inherit] resize-none",
              className,
              classNames?.input
            )}
            name={name}
            id={id}
            {...props}
          />
        </div>
      </label>
    </div>
  );
};

export default Textarea;
