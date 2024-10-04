// Home.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import LifeScienceMode from './LifeScienceMode';
import ClinicalScienceMode from './ClinicalScienceMode';
import ResearchMode from './ResearchMode'; 
import Tabs from './Tabs'; 
import './Home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('lifeScience');

  const tabs = [
    { label: 'Life Science Mode', value: 'lifeScience', activeBg: 'bg-blue-500 text-white' },
    { label: 'Clinical Science Mode', value: 'clinicalScience', activeBg: 'bg-blue-500 text-white' },
    { label: 'Research Mode', value: 'research', activeBg: 'bg-blue-500 text-white' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'clinicalScience':
        return <ClinicalScienceMode />;
      case 'research':
        return <ResearchMode />;
      default:
        return <LifeScienceMode />;
    }
  };

  return (
    <div className={`min-h-screen home-body ${activeTab}`}>
      <Navbar />
      <div className="container mx-auto py-10">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Home;
