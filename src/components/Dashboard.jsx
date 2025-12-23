import { useState } from "react";
import Tabs from "./Tabs";
import UniverseTab from "./UniverseTab";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("active-tab") || "artifacts"
  );

  const handleTabChange = (tab) => {
    localStorage.setItem("active-tab", tab);
    setActiveTab(tab);
  };

  return (
    <div className="dashboard">
      <Tabs activeTab={activeTab} onChange={handleTabChange} />

      <div className="universes">
        {["artifacts", "creatures", "logs"].map((tab) => (
          <div
            key={tab}
            className={`universe-wrapper ${activeTab === tab ? "active" : ""}`}
          >
            <UniverseTab universe={tab} />
          </div>
        ))}
      </div>
    </div>
  );
}
