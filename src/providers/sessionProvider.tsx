import { useStorage } from "@/hooks/storage";
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
};
type InitializationData = { apiKey: string };

const SessionContext = createContext<SessionContextType>({
  apiKey: "",
  sessionId: "",
  parentOrigin: "",
});

export const SessionProvider: FC = ({ children }) => {
  const { data: storageSessionId, set: setStorageSessionId } =
    useStorage<string>(StorageKeys.SESSION_ID);

  const hasReceivedMessage = useRef(false);

  const [apiKey, setApiKey] = useState("");
  const [parentOrigin, setParentOrigin] = useState("");

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      if (event.origin === window.location.origin || hasReceivedMessage.current)
        return;

      if (event.data?.type !== POST_MESSAGE_TYPES.INIT) return;

      const data = event.data as PostMessageType<InitializationData>;

      if (!data.data?.apiKey) return;

      // Mark as received to prevent duplicate processing
      hasReceivedMessage.current = true;
      setParentOrigin(event.origin);

      setApiKey(data.data.apiKey);

      if (storageSessionId === null) {
        const uuid = uuidV4();
        setStorageSessionId(uuid);
      }

      event.source?.postMessage(
        {
          type: POST_MESSAGE_TYPES.READY,
          timestamp: Date.now(),
        } as PostMessageType,
        { targetOrigin: event.origin }
      );
    },
    [storageSessionId, setStorageSessionId]
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
      "useUserSession should be called inside a SessionContextProvider component"
    );
  }
  return context;
};

export default SessionProvider;
