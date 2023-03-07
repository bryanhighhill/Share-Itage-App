import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* inviteRegister(action) {
  const id = action.payload.family_id;
  console.log('in invite register saga with: ', action.payload);
  try {
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post(`/api/user/register/${id}`, action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* fetchInvitations(action) {
  console.log('in fetch invitations saga');
  const id = action.payload;
  try {
    const invitations = yield axios.get(`api/user/invites/${id}`);
    yield put({ type: 'SET_INVITATIONS', payload: invitations.data });
  } catch (error) {
    console.log('error with getting invitation data: ', error);
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
  yield takeLatest('INVITE_REGISTER', inviteRegister);
  yield takeEvery('FETCH_INVITATIONS', fetchInvitations); //dispatched from invitation registration form
}

export default registrationSaga;
