import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import SidePanel from '../SidePanel/SidePanel';
import NewUserPage from '../NewUserPage/NewUserPage';
import CreateFamilyPage from '../CreateFamilyPage/CreateFamilyPage';
import './UserPage.css';

function UserPage({page}) {
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_FAMILY_MEMBERS', payload: user.family_id });
  }, [user.family_id]);

  if (user.family_id) {
    return (
      <div className="content-container">

        <div className="user-nav">
          <SidePanel />
        </div>

        <div className="image-div">
        </div>
      
      </div>
    );
  } else 
    if (!user.family_id) {
      return (
        <div className="user-panel">
          <div className="family-div">
            <div className="welcome-header">
              <h4 className="create-welcome">
                Welcome to Share-itage, {user.username}!
              </h4>
            </div>
            <div className="nav-instruction">
              In order to start adding your recipes and using Share-itage, please create a family below
            </div>
            <CreateFamilyPage />
          </div>
        </div>
      )
    }
}

// this allows us to use <App /> in index.js
export default UserPage;
