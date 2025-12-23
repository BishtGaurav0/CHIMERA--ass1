export default function Tabs({ activeTab, onChange }) {
  const tabs = ["artifacts", "creatures", "logs"];

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab ${activeTab === tab ? "active" : ""}`}
          onClick={() => onChange(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
}
