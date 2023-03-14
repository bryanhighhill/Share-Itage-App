import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './RegisterForm.css'

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();
    dispatch({
      type: 'REGISTER',
      payload: {
        username,
        email,
        password,
      },
    });
  };

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h1 className="register-header">Register User</h1>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <section className="register-bar">
      <div>
          <label htmlFor="username">
          <h5 className="username-header">Username:</h5>
            <input
              type="text"
              name="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
          <h5 className="username-header">Email:</h5>
            <input
              type="email"
              name="username"
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
          <h5 className="username-header">Password:</h5>
            <input
              type="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div>
      </section>
      <div className="register-button">
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
};

export default RegisterForm;
