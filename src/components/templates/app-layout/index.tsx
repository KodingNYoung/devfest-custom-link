"use client";

import React from "react";
import { FC } from "@/utils/types";
import Header from "./Header";
import Footer from "@/components/templates/app-layout/Footer";

type Props = {
  hasNoChat: boolean;
};

const AppLayout: FC<Props> = ({ children, hasNoChat }) => {
  return (
    <div className="flex flex-col h-full bg-gdg-blue">
      <Header hasNoChat={hasNoChat} />
      <div className="flex-1 bg-white rounded-t-[20px] flex flex-col h-[calc(100%_-_88px)] whitespace-break-spaces relative">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
