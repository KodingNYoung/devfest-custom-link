"use client";

import { FC } from "@/utils/types";
import React from "react";
import dynamic from "next/dynamic";

const SessionProvider = dynamic(() => import("@/providers/sessionProvider"), {
  ssr: false,
});
const Container = dynamic(() => import("./Container"), {
  ssr: false,
});

type Props = {
  userId?: string;
  apiKey: string;
};

const ChatApp: FC<Props> = ({ apiKey, userId }) => {
  return (
    <SessionProvider apiKey={apiKey} userId={userId}>
      <Container />
    </SessionProvider>
  );
};

export default ChatApp;
