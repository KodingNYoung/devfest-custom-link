import type { Metadata } from "next";
import "../styles/globals.css";
import React from "react";
import { cls } from "@/utils/helpers";
import { plusJakartaSans } from "@/assets/font";
import { LayoutFC } from "@/utils/types";
import { ChatNavContextProvider } from "@/providers/chatProvider";
import ReactQueryProvider from "@/providers/reactQueryProvider";

export const metadata: Metadata = {
  title: "DevfestAkure Help",
  description:
    "Your AI companion for DevFest Akure 2025. Get instant answers about schedules, speakers, venue, and registration. Powered by SATE from Eusate.",
};

const RootLayout: LayoutFC = ({ children }) => {
  return (
    <html lang="en" className={cls("h-full", plusJakartaSans.variable)}>
      <body>
        <ReactQueryProvider>
          <ChatNavContextProvider>{children}</ChatNavContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
