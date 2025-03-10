import {TWClassNames} from "@/utils/types";

export function cls(
    ...classNames: (TWClassNames | string | null | undefined | false)[]
) {
    const validClasses = classNames.filter((className) => !!className) as string[]
    return validClasses.join(" ")
}
