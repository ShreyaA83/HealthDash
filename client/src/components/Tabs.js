// Tabs.js
import React from 'react';
import './Tabs.css';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="tabs-container rounded-xl ">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`tab-item ${activeTab === tab.value ? 'active-tab' : ''}`}
          onClick={() => setActiveTab(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    
      <div className={`tab-indicator ${activeTab}`} />
    </div>
  );
};

export default Tabs;
