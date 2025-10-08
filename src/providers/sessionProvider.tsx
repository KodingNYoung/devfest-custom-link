import { useStorage } from "@/hooks/storage";
import { verifyAPIKey } from "@/lib/data";
import { POST_MESSAGE_TYPES } from "@/utils/constants";
import { StorageKeys } from "@/utils/enums";
import { FC, PostMessageType } from "@/utils/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { v4 as uuidV4 } from "uuid";

type SessionContextType = {
  apiKey: string;
  sessionId: string;
  parentOrigin: string;
  isValidated: boolean;
  loading: boolean;
};
type InitializationData = { apiKey: string };

const SessionContext = createContext<SessionContextType>({
  apiKey: "",
  sessionId: "",
  parentOrigin: "",
  isValidated: false,
  loading: false,
});

export const SessionProvider: FC = ({ children }) => {
  const { data: storageSessionId, set: setStorageSessionId } =
    useStorage<string>(StorageKeys.SESSION_ID);

  const hasReceivedMessage = useRef(false);

  const [apiKey, setApiKey] = useState("");
  const [parentOrigin, setParentOrigin] = useState("");
  const [isValidated, setIsValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMessage = useCallback(
    async (event: MessageEvent) => {
      if (event.origin === window.location.origin || hasReceivedMessage.current)
        return;

      if (event.data?.type !== POST_MESSAGE_TYPES.INIT) return;

      const data = event.data as PostMessageType<InitializationData>;

      if (!data.data?.apiKey) {
        console.error("[Eusate Chat] No API key provided");
        return;
      }

      // Mark as received to prevent duplicate processing
      hasReceivedMessage.current = true;
      setParentOrigin(event.origin);
      setLoading(true);

      try {
        const isValid = await verifyAPIKey(data.data.apiKey);

        if (!isValid) throw new Error("Invalid API Key");

        setApiKey(data.data.apiKey);
        setIsValidated(true);

        if (storageSessionId === null) {
          const uuid = uuidV4();
          setStorageSessionId(uuid);
        }

        event.source?.postMessage(
          {
            type: POST_MESSAGE_TYPES.READY,
            timestamp: Date.now(),
          } as PostMessageType,
          { targetOrigin: event.origin },
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Authentication failed";

        event.source?.postMessage(
          {
            type: POST_MESSAGE_TYPES.AUTH_ERROR,
            timestamp: Date.now(),
            message: errorMessage,
          } as PostMessageType,
          { targetOrigin: event.origin },
        );
      } finally {
        setLoading(false);
      }
    },
    [storageSessionId, setStorageSessionId],
  );

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [storageSessionId, setStorageSessionId, handleMessage]);

  return (
    <SessionContext.Provider
      value={{
        apiKey,
        sessionId: storageSessionId as string,
        parentOrigin,
        isValidated,
        loading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useUserSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error(
      "useUserSession should be called inside a SessionContextProvider component",
    );
  }
  return context;
};

export default SessionProvider;
