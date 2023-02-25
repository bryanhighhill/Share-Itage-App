import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// Family Saga: will be fired on "POST_FAMILY_NAME" actions (CreateFamilyPage.jsx)
function* createRecipe(action) {
  console.log('in create recipe with: ', action.payload);
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

// Fetch Family Details from db - family table
function* fetchRecipes(action) {
  console.log('in fetch recipes saga with: ', action);
  const id = action.payload;
  try {
    const recipes = yield axios.get(`/api/recipe/${id}`);
    yield put({ type: 'SET_RECIPES', payload: recipes.data });
  } catch (error) {
    console.log('Fetch Recipes failed with error: ', error);
  }
}

function* recipeSaga() {
  yield takeEvery('POST_NEW_RECIPE', createRecipe); //dispatched from AddRecipePage
  yield takeEvery('FETCH_RECIPES', fetchRecipes); //dispatched from FindRecipePage
}

export default recipeSaga;