import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InviteRegisterForm from './InviteRegisterForm.jsx';

const InvitationLoginPage = () => {
    return (
        <div className="login-page">
          <div className="login-form">
            <InviteRegisterForm />
          </div>
        </div>
    );
};

export default InvitationLoginPage;