import {HTMLProps, PropsWithChildren, ReactElement} from "react";

export type TWClassNames = HTMLProps<HTMLElement>["className"]

export type FC<PropsType = unknown> = {
    (
        props: { className?: TWClassNames } & PropsWithChildren<PropsType>, // These line automatically add `className` and `children` to all component using the `FC` type
        context?: unknown
    ): ReactElement | null
    displayName?: string
}

export type LayoutFC<
    ParamsType = { [paramsKey: string]: string | string[] | undefined },
> = {
    (
        props: PropsWithChildren<{ params?: Promise<ParamsType> }>,
        context?: unknown
    ): ReactElement | null | Promise<ReactElement | null>
    displayName?: string
}

export type PageFC<
    ParamsType =
            | { [paramsKey: string]: string | string[] | undefined }
        | Promise<unknown>,
    SearchParamsType = {
        [searchParamsKey: string]: string | string[] | undefined
    },
> = {
    (
        props: {
            params?: Promise<ParamsType>
            searchParams?: Promise<SearchParamsType>
        },
        context?: unknown
    ): ReactElement | null | Promise<ReactElement | null>
    displayName?: string
}


export type MessageSenders = "user" | "sate" | "agent"