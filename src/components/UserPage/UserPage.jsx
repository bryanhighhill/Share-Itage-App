import React, { useState } from 'react';
import {useSelector } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import SidePanel from '../SidePanel/SidePanel';
import NewUserPage from '../NewUserPage/NewUserPage';

function UserPage({page}) {
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.user);

  if (user.family_id) {
    return (
      <div className="user-panel">
        <div className="container">
          <h4>Welcome, {user.username}!</h4>
          <SidePanel page={page}/>
          <LogOutButton className="logout-btn" />
        </div>
      </div>
    );
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
}

// this allows us to use <App /> in index.js
export default UserPage;
