import { FC } from "@/utils/types";
import { cls } from "@/utils/helpers";
import { IconNames } from "@/utils/iconNames";
import { HTMLProps } from "react";

type Props = Omit<HTMLProps<HTMLSpanElement>, "size"> & {
  name: IconNames;
  size?: number | string;
};

const Icon: FC<Props> = ({ className, name, size, ...props }) => {
  return (
    <span
      style={{
        fontSize: size
          ? typeof size === "number"
            ? `${size}px`
            : size
          : undefined,
      }}
      className={cls("text-inherit !leading-none", name, className)}
      {...props}
    />
  );
};

export default Icon;
