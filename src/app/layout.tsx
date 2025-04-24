import type { Metadata } from "next";
import "../styles/globals.css";
import React from "react";
import { cls } from "@/utils/helpers";
import { plusJakartaSans } from "@/assets/font";
import { LayoutFC } from "@/utils/types";
import { ChatNavContextProvider } from "@/providers/chatProvider";
import ReactQueryProvider from "@/providers/reactQueryProvider";

export const metadata: Metadata = {
  title: {
    default: "eusate chatbot",
    template: "%s | eusate",
  },
  description: "Supercharge your customer support with our AI powered agents",
};

const RootLayout: LayoutFC = ({ children }) => {
  return (
    <html
      lang="en"
      className={cls("h-full max-h-[780px]", plusJakartaSans.variable)}
    >
      <body>
        <ReactQueryProvider>
          <ChatNavContextProvider>{children}</ChatNavContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
