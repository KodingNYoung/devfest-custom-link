import { useStorage } from "@/hooks/storage";
import { StorageKeys } from "@/utils/enums";
import { FC } from "@/utils/types";
import { createContext, useContext, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

type SessionContextType = {
  sessionId: string;
};

const SessionContext = createContext<SessionContextType>({
  sessionId: "",
});

export const SessionProvider: FC = ({ children }) => {
  const { data: storageSessionId, set: setStorageSessionId } =
    useStorage<string>(StorageKeys.SESSION_ID);

  useEffect(() => {
    if (storageSessionId === null) {
      const uuid = uuidV4();
      setStorageSessionId(uuid);
    }
  }, [storageSessionId, setStorageSessionId]);

  return (
    <SessionContext.Provider
      value={{
        sessionId: storageSessionId as string,
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
