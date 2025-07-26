import { HTMLProps, PropsWithChildren, ReactElement } from "react";
import { MessageSenders } from "./enums";
import { POST_MESSAGE_TYPES } from "./constants";

export type TWClassNames = HTMLProps<HTMLElement>["className"];

export type FC<PropsType = unknown> = {
  (
    props: { className?: TWClassNames } & PropsWithChildren<PropsType>, // These line automatically add `className` and `children` to all component using the `FC` type
    context?: unknown
  ): ReactElement | null;
  displayName?: string;
};

export type LayoutFC<
  ParamsType = { [paramsKey: string]: string | string[] | undefined }
> = {
  (
    props: PropsWithChildren<{ params?: Promise<ParamsType> }>,
    context?: unknown
  ): ReactElement | null | Promise<ReactElement | null>;
  displayName?: string;
};

export type PageFC<
  ParamsType =
    | { [paramsKey: string]: string | string[] | undefined }
    | Promise<unknown>,
  SearchParamsType = {
    [searchParamsKey: string]: string | string[] | undefined;
  }
> = {
  (
    props: {
      params?: Promise<ParamsType>;
      searchParams?: Promise<SearchParamsType>;
    },
    context?: unknown
  ): ReactElement | null | Promise<ReactElement | null>;
  displayName?: string;
};

export type ValueOf<K> = K[keyof K];

export type DBResource = {
  id: string;
  date_created: string;
  date_updated: string;
};

export type SocketResponseMessageType = {
  ticket_chat_id: string;
  sender: MessageSenders;
  message: string;
  date_created: string;
  date_updated: string;
};
export type SocketResponseType = {
  data: SocketResponseMessageType;
};
export type SocketRequestMessageType = (
  | {
      user_id: string;
    }
  | {
      anon_user_id: string;
    }
) & {
  message: string;
  attachment?: boolean;
  ticket_chat_id: string;
};

export type MessageType = DBResource & {
  message: string;
  sender: MessageSenders;
  is_attachment: boolean;
  ticket_chat: string;
};

export type ConversationType = DBResource & {
  closed: boolean;
  responder: MessageSenders;
  ticket: string;
  ticket_slug: `#TIC_${string}`;
  latest_message: MessageType;
  read_by_customer: boolean;
  read_by_agent: boolean;
};

export type PostMessageType<T = unknown> = {
  type: ValueOf<typeof POST_MESSAGE_TYPES>;
  data?: T;
  timestamp: number;
};
