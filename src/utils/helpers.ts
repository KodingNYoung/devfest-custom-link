import { ChatId, NEW_CHAT_ID, OpenedChat } from "@/providers/chatProvider";
import { TWClassNames } from "@/utils/types";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";

dayjs.extend(calendar);

export function cls(
  ...classNames: (TWClassNames | string | null | undefined | false)[]
) {
  const validClasses = classNames.filter(
    (className) => !!className,
  ) as string[];
  return validClasses.join(" ");
}

export const formatToMessageTime = (date: string) => {
  return dayjs(date).calendar(null, {
    sameDay: "h:mmA", // The same day ( Today at 2:30 AM )
    lastDay: "[Yesterday], h:mmA", // The day before ( Yesterday at 2:30 AM )
    lastWeek: "dddd, h:mmA", // Last week ( Last Monday at 2:30 AM )
    sameElse: "DD/MM/YYYY, h:mmA ", // Everything else ( 7/10/2011 )
  });
};

export const isNewChat = (chatId: ChatId) => chatId === NEW_CHAT_ID;
export const isActualChat = (chatId: OpenedChat) =>
  !!chatId && !isNewChat(chatId);

export const logger = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(...args, {});
  }
};
