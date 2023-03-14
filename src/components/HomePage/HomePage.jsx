import React, { useState } from 'react';
import {useSelector } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import NewUserPage from '../NewUserPage/NewUserPage';


function HomePage() {
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.user);

  if (user.family_id) {
    return (
      <div className="content-container">
        <div className="user-nav">
            <UserPage />
        </div>
        <div>
          new home page column 2
        </div>
      </div>
    )
  } else 
    if (!user.family_id) {
      return (
        <div className="user-panel">
          <div className="container">
            <h4>Welcome, {user.username}!</h4>
            <NewUserPage setLoading={setLoading}/>
            <LogOutButton className="logout-btn" />
          </div>
        </div>
      )
    }
};

// this allows us to use <App /> in index.js
export default HomePage;
