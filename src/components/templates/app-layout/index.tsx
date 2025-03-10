import React from "react";
import { FC } from "@/utils/types";
import Header from "./Header";
import Footer from "@/components/templates/app-layout/Footer";

const AppLayout: FC = ({ children }) => {
  return (
    <div className="flex flex-col h-full bg-black">
      <Header />
      <div className="flex-1 bg-white rounded-t-[20px] flex flex-col h-[calc(100%_-_88px)] overflow-y-auto relative">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
