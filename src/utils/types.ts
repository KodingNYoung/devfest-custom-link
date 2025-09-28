import { HTMLProps, PropsWithChildren, ReactElement } from "react";
import { FileExtensions, MessageSenders } from "./enums";
import { POST_MESSAGE_TYPES } from "./constants";

export type TWClassNames = HTMLProps<HTMLElement>["className"];

export type FC<PropsType = unknown> = {
  (
    props: { className?: TWClassNames } & PropsWithChildren<PropsType>, // These line automatically add `className` and `children` to all component using the `FC` type
    context?: unknown,
  ): ReactElement | null;
  displayName?: string;
};

export type LayoutFC<
  ParamsType = { [paramsKey: string]: string | string[] | undefined },
> = {
  (
    props: PropsWithChildren<{ params?: Promise<ParamsType> }>,
    context?: unknown,
  ): ReactElement | null | Promise<ReactElement | null>;
  displayName?: string;
};

export type PageFC<
  ParamsType =
    | { [paramsKey: string]: string | string[] | undefined }
    | Promise<unknown>,
  SearchParamsType = {
    [searchParamsKey: string]: string | string[] | undefined;
  },
> = {
  (
    props: {
      params?: Promise<ParamsType>;
      searchParams?: Promise<SearchParamsType>;
    },
    context?: unknown,
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
  attachment: boolean;
  attachment_metadata: AttachmentMetadata;
  close_support: boolean;
  closed_support: boolean;
  date_created: string;
  date_updated: string;
  message: string;
  sender: MessageSenders;
  ticket_chat_id: string;
};
export type AttachmentMetadata = {
  url: string;
  name: string;
  size_kb: number;
  extension: FileExtensions;
  loading?: boolean;
  error?: boolean;
};
export type SocketResponseType = {
  data: SocketResponseMessageType;
};
export type TicketRatingSocketResponse = {
  data: { rating: number; review: string | null; ticket_chat_id: string };
};
export type SocketRequestMessageType = {
  message: string;
  attachment?: boolean;
  ticket_chat_id: string;
  session_id: string;
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
