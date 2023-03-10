import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import '../RegisterForm/RegisterForm.css'

function InviteRegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [familyId, setFamilyId] = useState(0);
  const errors = useSelector((store) => store.errors);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const invitation = useSelector((store) => store.setInvitations);
  const [userDetails, setUserDetails] = useState({username: '', email: '', password: '', family_id: ''})

  const newUser = {
    username,
    email,
    password,
    family_id: invitation.family_id,
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_INVITATIONS', payload: id });
  }, [id]);

  if (invitation.family_id == undefined) {
    return (
      <p>Bad link. please ask for a new one</p>
    )
  };

  const registerUser = (event) => {
    event.preventDefault();
    dispatch({
        type: 'INVITE_REGISTER',
        payload: newUser
      });
      history.push('/user');
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

export default InviteRegisterForm;
