import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      <h1 className="login-header">Login</h1>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <section className="login-bar">
        <div>
          <label htmlFor="username">
              <h5 className="username-header">Username:</h5>
              <input
                type="text"
                name="username"
                required
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
          
          </label>
        </div>
        <div>
          <label htmlFor="password">
        
              <h5 className="username-header">Password:</h5>
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
          </label>
        </div>
      </section>
      <div className="login-btn">
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>
    </form>
  );
}

export default LoginForm;
