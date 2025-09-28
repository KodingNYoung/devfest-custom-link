import { cls } from "@/utils/helpers";
import { FC } from "@/utils/types";
import React, { ReactNode, useEffect, useRef, useState } from "react";

type TabItem = { key: string; label: ReactNode };

type Props = {
  tabs: TabItem[];
  active: TabItem["key"];
  onChange: (tab: TabItem) => void;
};

const AppTabs: FC<Props> = ({ tabs, active, onChange }) => {
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const [cursorCoord, setCursorCoord] = useState({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const tabRect = tabRefs.current[active]?.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();

    if (tabRect && containerRect) {
      setCursorCoord({
        width: tabRect.width,
        left: tabRect.left - containerRect.left,
      });
    }
  }, [active]);

  return (
    <div ref={containerRef} className="flex items-center gap-5 relative">
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            ref={(el) => {
              if (tabRefs.current && el) {
                tabRefs.current[tab.key] = el;
              }
            }}
            onClick={() => onChange(tab)}
            className={cls(
              "relative text-medium-sm cursor-pointer transition-color duration-300 pb-1.5",
              isActive ? "text-gray-900 " : "text-gray-400 ",
            )}
          >
            {tab.label}
          </button>
        );
      })}
      <div
        className="h-0.5 bg-gray-900 absolute bottom-0 transition-transform rounded-md"
        style={{
          width: `${cursorCoord.width}px`,
          transform: `translateX(${cursorCoord.left}px)`,
        }}
      />
    </div>
  );
};

export default AppTabs;
