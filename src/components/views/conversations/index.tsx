import { FC } from "@/utils/types";
import AppTabs from "@/components/molecules/AppTabs";
import { useState } from "react";
import ActiveTickets from "./ActiveTickets";
import ClosedTickets from "./ClosedTickets";

const Conversations: FC = () => {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="px-6 py-4 pb-6 flex flex-col gap-4 flex-1">
      <header className="text-semibold-base text-black">Conversations</header>
      <AppTabs
        tabs={[
          { key: "active", label: "Active" },
          { key: "closed", label: "Closed" },
        ]}
        active={activeTab}
        onChange={(tab) => setActiveTab(tab.key)}
      />
      {activeTab === "active" && <ActiveTickets />}
      {activeTab === "closed" && <ClosedTickets />}
    </div>
  );
};

export default Conversations;
