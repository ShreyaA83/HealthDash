import React from 'react';
import './ClinicalScienceMode.css';
import TNH from '../assets/TNH.png'
import { Link } from 'react-router-dom';
import CustomCursor from './CustomCursor';

const ClinicalScienceMode = () => {
  return (
    <div>
    <CustomCursor />
      <div className="image-container">
      <Link to="/welcome" aria-label="Welcome Page" >
  <img src={TNH} alt="Clinical Science Mode: Link to Welcome Page" loading="lazy" />
</Link>
    </div>
    </div>
  );
};

export default ClinicalScienceMode;
