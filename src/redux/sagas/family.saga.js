import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Family Saga: will be fired on "POST_FAMILY_NAME" actions (CreateFamilyPage.jsx)
function* createFamily(action) {
    const id = action.payload.id;
    const name = action.payload.name;
  try {
    // passes the family name and user.id from the payload to the server
    yield axios.post('/api/family', name); //sends to family.router.js

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    // yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with creating family:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}

function* familySaga() {
  yield takeEvery('POST_FAMILY_NAME', createFamily);
}

export default familySaga;