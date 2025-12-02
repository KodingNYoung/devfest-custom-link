import { GDGLogo, RatingStar } from "@/assets/svg";
import { useChat } from "@/hooks/chat";
import { cls } from "@/utils/helpers";
import { FC } from "@/utils/types";
import React, { useState } from "react";

const RatingMessage: FC = () => {
  const { ticketRating, rateTicket } = useChat();
  const [hoveredStar, setHoveredStar] = useState(0);
  return (
    <>
      <section className="flex gap-1.5 items-end w-[80%] max-w-[230px]">
        <div className="size-7 min-h-7 min-w-7 flex justify-center items-center rounded-full bg-black text-white">
          {GDGLogo}
        </div>
        <div className="bg-gold-50 w-fit min-w-[100px] rounded-xl px-2 grid gap-3 py-2">
          <p className="text-medium-xs text-gray-900">
            Could you please rate your experience with us?
          </p>
          <div className="flex items-center">
            {new Array(5).fill(null).map((_, idx) => {
              const star = idx + 1;
              return (
                <button
                  disabled={Boolean(ticketRating)}
                  key={star}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className={cls(
                    "cursor-pointer fill-transparent stroke-gray-700 transition-colors p-0.5",
                    (star <= hoveredStar || star <= (ticketRating || 0)) &&
                      "fill-warning-400 stroke-warning-500",
                  )}
                  onClick={() => rateTicket(star)}
                >
                  {RatingStar}
                </button>
              );
            })}
          </div>
        </div>
      </section>
      {ticketRating ? (
        <section className="flex gap-1.5 items-end w-[80%] max-w-[230px]">
          <div className="size-7 min-h-7 min-w-7 flex justify-center items-center rounded-full bg-black text-white">
            {GDGLogo}
          </div>
          <div className="bg-gold-50 w-fit min-w-[100px] rounded-xl px-2 grid gap-3 py-2">
            <p className="text-medium-xs text-gray-900">
              Thank you for providing your feedback.
            </p>
          </div>
        </section>
      ) : null}
      <span className="mx-auto text-regular-xs text-gray-400">
        This ticket has been closed.
      </span>
    </>
  );
};

export default RatingMessage;
