import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <div className="login-page">
      <div className="login-form">
        <RegisterForm />
        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {history.push('/login');}}
          >
            Login
          </button>
        </center>
      </div>
    </div>
  );
};

export default RegisterPage;
