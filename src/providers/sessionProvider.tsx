import { useStorage } from "@/hooks/storage";
import { StorageKeys } from "@/utils/enums";
import { FC } from "@/utils/types";
import { createContext, useContext, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

type SessionContextProps = {
  apiKey: string;
  userId: string;
  isAuthUser: boolean;
};

const SessionContext = createContext<SessionContextProps>({
  apiKey: "",
  userId: "",
  isAuthUser: false,
});

export const SessionContextProviders: FC<{
  userId?: string;
  apiKey: string;
}> = ({ children, userId: defaultUserId, apiKey }) => {
  const { data: storageUserId, set } = useStorage<string>(StorageKeys.USER_ID);

  useEffect(() => {
    if (!defaultUserId && storageUserId === null) {
      // checking storage data with null specifically because when a key is empty in the local storage, it returns null not undefined
      const uuid = uuidV4();
      set(uuid);
    }
  }, [defaultUserId, storageUserId, set]);

  return (
    <SessionContext.Provider
      value={{
        apiKey,
        userId: defaultUserId || (storageUserId as string),
        isAuthUser: !!defaultUserId,
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

export default SessionContextProviders;
