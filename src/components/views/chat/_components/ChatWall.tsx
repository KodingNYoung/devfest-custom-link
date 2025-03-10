import { FC } from "@/utils/types";
import React from "react";
import GuestMessageBox from "./GuestMessageBox";
import HostMessageBox from "./HostMessageBox";

const ChatWall: FC = () => {
  return (
    <div className="mb-5 grid gap-10">
      <GuestMessageBox />
      <HostMessageBox />
      <GuestMessageBox />
      <HostMessageBox />
      <GuestMessageBox />
      <HostMessageBox />
      <GuestMessageBox />
      <HostMessageBox />
      <GuestMessageBox />
      <HostMessageBox />
      <GuestMessageBox typing />
    </div>
  );
};

export default ChatWall;
