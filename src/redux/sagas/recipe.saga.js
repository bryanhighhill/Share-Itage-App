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

// Fetch Family recipe Details from db - family table
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

// Fetch Recipe Details from db - recipes table
function* fetchRecipeData(action) {
  console.log('in fetch recipe data with: ', action.payload);
  const id = action.payload;
  try {
    const recipe = yield axios.get(`/api/recipe/edit/${id}`);
    console.log('recipe.data: ', recipe.data);
    yield put({ type: 'SET_SELECTED_RECIPE', payload: recipe.data });
  } catch (error) {
    console.log('Fetch Recipe data failed with error: ', error);
  }
}

//update recipe details
function* updateRecipe(action) {
  console.log('in update recipe with: ', action.payload);
  const id = action.payload.id;
  try {
    const updatedRecipe = yield axios.put(`api/recipe/edit/${id}`, action.payload);
  } catch (error) {
    console.log('Error with updating recipe:', error);
  }
}

//fetch random recipe from user family's recipe table
function* fetchRandomRecipe(action) {
  console.log('in fetch random recipe with family id: ', action.payload);
  const id = action.payload;
  try {
    const randomRecipe = yield axios.get(`api/recipe/random/${id}`);
    yield put({ type: 'SET_RANDOM_RECIPE', payload: randomRecipe.data})
  } catch (error) {
    console.log('Fetch Recipe data failed with error: ', error);
  }
}

//POST recipe to favorites table
function* addFavorite(action) {
  console.log('in add favorite saga with: ', action.payload);
  try {
    yield axios.post('/api/recipe/favorite', action.payload); //sends to recipe.router.js
  } catch (error) {
    console.log('Error with adding recipe to favorites:', error);
    yield put({ type: 'FAVORITE_FAILED' });
  }
}

//Fetch User favorites
function* fetchFavorites(action) {
  console.log('in fetch favorites saga with id: ', action.payload);
  const id = action.payload;
  try {
    const favoriteRecipes = yield axios.get(`api/recipe/favorite/${id}`);
    yield put({ type: 'SET_FAVORITES', payload: favoriteRecipes.data})
  } catch (error) {
    console.log('Fetch favorites failed with error: ', error);
  }
}

//remove user favorite recipe
function* removeFavorite(action) {
  console.log('in remove favorites saga with ids: ', action.payload);
  const id = action.payload.id;
  const user_id = action.payload.user_id;
  try {
    yield axios.delete(`api/recipe/favorite/${id}`, {data: {user_id}});
    yield put({ type: 'FETCH_FAVORITES', payload: user_id })
  } catch (error) {
    console.log('error with removing favorite saga: ', error);
  }
}

function* recipeSaga() {
  yield takeEvery('POST_NEW_RECIPE', createRecipe); //dispatched from AddRecipePage
  yield takeEvery('FETCH_RECIPES', fetchRecipes); //dispatched from FindRecipePage
  yield takeEvery('FETCH_RECIPE_DATA', fetchRecipeData); //dispatched from EditRecipePage
  yield takeEvery('UPDATE_RECIPE', updateRecipe); //dispatched from EditRecipePage onSubmit
  yield takeEvery('FETCH_RANDOM_RECIPE', fetchRandomRecipe); //dispatched from RandomRecipePage
  yield takeEvery('ADD_FAVORITE', addFavorite); //dispatched from recipeCard
  yield takeEvery('FETCH_FAVORITES', fetchFavorites); //dispatched from MyFavoritesPage and from removeFavorite saga
  yield takeEvery('REMOVE_FAVORITE', removeFavorite); //dispatched from RecipeCard
}

export default recipeSaga;