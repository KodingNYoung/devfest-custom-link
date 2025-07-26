"use client";

import { PageFC } from "@/utils/types";
import React from "react";
import dynamic from "next/dynamic";

const SessionProvider = dynamic(() => import("@/providers/sessionProvider"), {
  ssr: false,
});
const Chat = dynamic(() => import("@/components/views"));

const Home: PageFC = () => {
  return (
    <SessionProvider>
      <Chat />
    </SessionProvider>
  );
};

export default Home;
