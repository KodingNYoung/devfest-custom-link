import { useChat } from "@/hooks/chat";
import { FC } from "@/utils/types";
import React from "react";
import EndChatMessage from "./EndChatMessage";
import RatingMessage from "./RatingMessage";
import { MessageSenders } from "@/utils/enums";

const EndOfMessage: FC = () => {
  const { showCloseSupport, isClosed, responder } = useChat();

  return responder === MessageSenders.SATE && (isClosed || showCloseSupport) ? (
    <>
      <EndChatMessage />
      {isClosed ? <RatingMessage /> : null}
    </>
  ) : null;
};

export default EndOfMessage;
