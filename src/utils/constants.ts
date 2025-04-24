export const API_BASEURL = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_URL;

export const ROUTES = {
  CONVERSATIONS: "/",
  CHAT: "/chat",
} as const;

export const QUERY_FN_KEYS = {
  CONVERSATIONS: ["conversations"],
  TICKET_CHAT: ["ticket_chat"],
};
