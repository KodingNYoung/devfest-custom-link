import { useStorage } from "@/hooks/storage";
import { POST_MESSAGE_TYPES } from "@/utils/constants";
import { StorageKeys } from "@/utils/enums";
import { FC, PostMessageType } from "@/utils/types";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";

type SessionContextType = {
  apiKey: string;
  userId: string;
  isAuthUser: boolean;
  parentOrigin: string;
};
type InitializationData = { apiKey: string; userId?: string };

const SessionContext = createContext<SessionContextType>({
  apiKey: "",
  userId: "",
  isAuthUser: false,
  parentOrigin: "",
});

export const SessionProvider: FC = ({ children }) => {
  const { data: storageUserId, set: setStorageUserId } = useStorage<string>(
    StorageKeys.USER_ID
  );

  const hasReceivedMessage = useRef(false);

  const [apiKey, setApiKey] = useState("");
  const [userId, setUserId] = useState("");
  const [parentOrigin, setParentOrigin] = useState("");

  useEffect(() => {
    window.addEventListener("message", (event) => {
      console.log("new message",event)
      if (event.origin === window.location.origin || hasReceivedMessage.current)
        return;

      if (event.data?.type !== POST_MESSAGE_TYPES.INIT) return;

      const data = event.data as PostMessageType<InitializationData>;

      if (!data.data?.apiKey) return;

      // Mark as received to prevent duplicate processing
      hasReceivedMessage.current = true;
      setParentOrigin(event.origin);

      setApiKey(data.data.apiKey);

      if (data.data.userId) {
        setUserId(data.data.userId);
      } else {
        if (storageUserId === null) {
          const uuid = uuidV4();
          setStorageUserId(uuid);
        }
      }

      event.source?.postMessage(
        {
          type: POST_MESSAGE_TYPES.READY,
          userId,
          timestamp: Date.now(),
        } as PostMessageType,
        { targetOrigin: event.origin }
      );
    });

    return () => {
      window.removeEventListener("message", console.log);
    };
  }, [storageUserId, setStorageUserId]);

  return (
    <SessionContext.Provider
      value={{
        apiKey,
        userId: userId || (storageUserId as string),
        isAuthUser: !!userId,
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
      "useUserSession should be called in sider a SessionContextProvider component"
    );
  }
  return context;
};

export default SessionProvider;
