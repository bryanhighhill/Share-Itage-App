import React from 'react';
import SidePanel from '../SidePanel/SidePanel';
import './InfoPage.css';


function InfoPage() {
  return (
    <div className="content-container">
      <div className="user-nav">
        <SidePanel />

      </div>

      <div className="tech-container">
        <h1> Technologies Used</h1>
        <ul>
          <li>React</li>
          <li>Redux</li>
          <li>Express</li>
          <li>Postgresql</li>
          <li>Node.js</li>
          <li>PG</li>
          <li>Javascript</li>
          <li>CSS</li>
          <li>HTML</li>
          <li>Passport</li>
          <li>Crypto-Random-String</li>
          <li>react-copy-to-clipboard</li>
        </ul>
      </div>
    </div>
  );
}

export default InfoPage;
