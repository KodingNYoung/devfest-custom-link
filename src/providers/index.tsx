"use client";

import React from "react";
import ReactQueryProvider from "./reactQueryProvider";
import { ChatNavContextProvider } from "./chatProvider";
import { FC } from "@/utils/types";
import dynamic from "next/dynamic";

const SessionProvider = dynamic(() => import("@/providers/sessionProvider"), {
  ssr: false,
});

const Providers: FC = ({ children }) => {
  return (
    <ReactQueryProvider>
      <ChatNavContextProvider>
        <SessionProvider>{children}</SessionProvider>
      </ChatNavContextProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
