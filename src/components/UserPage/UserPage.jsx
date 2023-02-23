import React from 'react';
import {useSelector} from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import SidePanel from '../SidePanel/SidePanel';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="user-panel">
      <div className="container">
        <h4>Welcome, {user.username}!</h4>
        {/* <p>Your ID is: {user.id}</p> */}
        <SidePanel />
        <LogOutButton className="logout-btn" />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
