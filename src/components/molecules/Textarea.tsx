import React from "react";
import { FC, TWClassNames } from "@/utils/types";
import { cls } from "@/utils/helpers";
import TextareaAutosize, {
  TextareaAutosizeProps,
} from "react-textarea-autosize";

type Slots = "root" | "inputContainer" | "input";
export type InputProps = TextareaAutosizeProps & {
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
            classNames?.inputContainer
          )}
        >
          <TextareaAutosize
            minRows={1}
            maxRows={4}
            className={cls(
              "p-3 transition-colors duration-200 outline-0 w-full relative text-regular-xs font-app text-gray-900 bg-white-100",
              "placeholder:text-regular-xs placeholder:text-gray-400 rounded-[inherit] resize-none",
              className,
              classNames?.input
            )}
            name={name}
            id={id || name}
            {...props}
          />
        </div>
      </label>
    </div>
  );
};

export default Textarea;
