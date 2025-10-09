import { useUserSession } from "@/providers/sessionProvider";
import { API_BASEURL } from "@/utils/constants";
import { logger } from "@/utils/helpers";
import { useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type SocketEventHandlers = {
  disconnect?: (reason: string, socket?: Socket) => void;
  connect?: (socket: Socket) => void;
  connect_error?: (error: Error, socket?: Socket) => void;
};
type SocketOptions = {
  query?: Record<string, string | number | boolean | undefined>;
  autoConnect?: boolean;
  transports?: string[];
  events?: SocketEventHandlers;
};

// Move defaults outside to ensure stable references
const DEFAULT_TRANSPORTS = ["websocket"];
const DEFAULT_QUERY = {};

export const useSocket = (
  namespace: `/${string}`,
  options: SocketOptions = {},
) => {
  const {
    query: customQuery = DEFAULT_QUERY,
    autoConnect = true,
    transports = DEFAULT_TRANSPORTS,
    events,
  } = options;

  const { apiKey } = useUserSession();

  const connectionAttemptsRef = useRef(0);
  const socketRef = useRef<Socket | null>(null);

  const [isConnected, setIsConnected] = useState(false);

  const query = useMemo(
    () => ({
      token: apiKey,
      token_source: "api",
      ...customQuery,
    }),
    [apiKey, customQuery],
  );

  // EFFECTS ---------
  useEffect(() => {
    const connectionId = ++connectionAttemptsRef.current;

    if (!apiKey) return;

    // clean up any existing connections
    if (socketRef.current?.connected) {
      socketRef.current?.disconnect();
    }

    const socket = io(`${API_BASEURL}${namespace}`, {
      autoConnect,
      transports,
      query,
    });

    // Race condition protector
    if (connectionId === connectionAttemptsRef.current) {
      socketRef.current = socket;
    } else {
      socket.disconnect();
      return;
    }

    // events
    socket.on("disconnect", (reason) => {
      logger(reason);
      setIsConnected(false);
      if (events?.disconnect) events.disconnect(reason, socket);
    });
    socket.on("connect", () => {
      setIsConnected(true);
      if (events?.connect) events.connect(socket);
    });
    socket.on("connect_error", (data) => logger(data));

    return () => {
      if (connectionId === connectionAttemptsRef.current) {
        // emit close event to server
        socket.disconnect();
        socketRef.current = null;
        setIsConnected(false);
      }
    };
  }, [apiKey, autoConnect, transports, query, events]);

  useEffect(() => {
    if (socketRef.current && apiKey) {
      socketRef.current.io.opts.query = {
        token: apiKey,
        token_source: "api",
        ...customQuery,
      };

      if (socketRef.current.connected) {
        socketRef.current.disconnect();
      }

      socketRef.current.connect();
      setIsConnected(true);
    }
  }, [apiKey, customQuery]);

  return {
    isConnected,
    socket: socketRef.current,
  };
};
