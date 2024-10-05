// Home.js
import React, { useContext } from 'react';
import Navbar from './Navbar';
import LifeScienceMode from './LifeScienceMode';
import ClinicalScienceMode from './ClinicalScienceMode';
import ResearchMode from './ResearchMode'; 
import Tabs from './Tabs'; 
import './Home.css';
import { HomeContext } from './HomeContext'; 

const Home = () => {
  const { activeTab, setActiveTab } = useContext(HomeContext); 

  const tabs = [
    { label: 'Life Science Mode', value: 'lifeScience', activeBg: 'bg-blue-500 text-white' },
    { label: 'Clinical Science Mode', value: 'clinicalScience', activeBg: 'bg-blue-500 text-white' },
    { label: 'Health Science Mode', value: 'research', activeBg: 'bg-blue-500 text-white' },
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
    <div className={`relative min-h-screen w-full home-body ${activeTab}`}>
      <Navbar />
      <div className="container mx-auto py-10">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Home;
