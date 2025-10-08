export const API_BASEURL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL;

export const ROUTES = {
  CONVERSATIONS: "/",
  CHAT: "/chat",
} as const;

export const QUERY_FN_KEYS = {
  CONVERSATIONS: ["conversations"],
  TICKET_CHAT: ["ticket_chat"],
};
export const POST_MESSAGE_TYPES = {
  INIT: "EUSATE_INIT",
  READY: "EUSATE_READY",
  AUTH_ERROR: "EUSATE_AUTH_ERROR",
  CLOSE_CHAT: "CLOSE_CHAT",
  OPEN_CHAT: "OPEN_CHAT",
  DESTROY: "EUSATE_DESTROY",
} as const;
