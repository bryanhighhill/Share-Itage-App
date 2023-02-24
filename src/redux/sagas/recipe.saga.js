import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Family Saga: will be fired on "POST_FAMILY_NAME" actions (CreateFamilyPage.jsx)
function* createRecipe(action) {
  try {
    // passes the family name and user.id from the payload to the server
    yield axios.post('/api/recipe', action.payload); //sends to family.router.js

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    // yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with creating family:', error);
    yield put({ type: 'FAMILY_FAILED' });
  }
}

function* recipeSaga() {
  yield takeEvery('POST_NEW_RECIPE', createRecipe); //dispatched from AddRecipePage
}

export default recipeSaga;