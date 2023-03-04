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
   alert('Error with creating family:', error);
    yield put({ type: 'FAMILY_FAILED' });
  };
};

// Fetch Family recipe Details from db - family table
function* fetchRecipes(action) {
  const id = action.payload;
  try {
    const recipes = yield axios.get(`/api/recipe/${id}`);
    yield put({ type: 'SET_RECIPES', payload: recipes.data });
  } catch (error) {
  //  alert('Fetch recipes failed with error: ', error);
  };
};

// Fetch Recipe Details from db - recipes table
function* fetchRecipeData(action) {
  const id = action.payload;
  try {
    const recipe = yield axios.get(`/api/recipe/edit/${id}`);
    console.log('recipe.data: ', recipe.data);
    yield put({ type: 'SET_SELECTED_RECIPE', payload: recipe.data });
  } catch (error) {
    alert('Fetch recipe data failed with error: ', error);
  };
};

//update recipe details
function* updateRecipe(action) {
  const id = action.payload.id;
  try {
    const updatedRecipe = yield axios.put(`api/recipe/edit/${id}`, action.payload);
  } catch (error) {
    alert('Error with updating recipe:', error);
  };
};

//fetch random recipe from user family's recipe table
function* fetchRandomRecipe(action) {
  const id = action.payload;
  try {
    const randomRecipe = yield axios.get(`api/recipe/random/${id}`);
    yield put({ type: 'SET_RANDOM_RECIPE', payload: randomRecipe.data})
  } catch (error) {
    // alert('Fetch random recipe failed with error: ', error);
  };
};

//POST recipe to favorites table
function* addFavorite(action) {
  console.log('action payload in addFavorite', action.payload);
  try {
    yield axios.post(`/api/recipe/favorite/`, action.payload); //sends to recipe.router.js
    yield put({ type: 'FETCH_FAVORITES' });
  } catch (error) {
    alert('Error with adding recipe to favorites:', error);
    yield put({ type: 'FAVORITE_FAILED' });
  };
};

//Fetch User favorites
function* fetchFavorites(action) {
  console.log('in fetch favorites saga with id: ', action.payload);
  const id = action.payload;
  try {
    const favoriteRecipes = yield axios.get(`api/recipe/favorite/${id}`);
    yield put({ type: 'SET_FAVORITES', payload: favoriteRecipes.data})
  } catch (error) {
    alert('Fetch favorites failed with error: ', error);
  };
};

//remove user favorite recipe
function* removeFavorite(action) {
  const recipe_id = action.payload.recipe_id;
  const id = action.payload.id;
  try {
    yield axios.delete(`api/recipe/favorite/${recipe_id}`);
    yield put({ type: 'FETCH_FAVORITES', payload: id });
  } catch (error) {
    alert('Error with removing favorite recipe: ', error);
  };
};

//remove recipe from db
function* removeRecipe(action) {
  const id = action.payload.id;
  const family_id = action.payload.family_id;

  try {
    yield axios.delete(`api/recipe/${id}`, {data: {family_id}});
    yield put({ type: 'FETCH_RECIPES', payload: family_id });
  } catch (error) {
    alert('Error with removing recipe from database: ', error);
  };
};

function* recipeSaga() {
  yield takeEvery('POST_NEW_RECIPE', createRecipe); //dispatched from AddRecipePage
  yield takeEvery('FETCH_RECIPES', fetchRecipes); //dispatched from FindRecipePage
  yield takeEvery('FETCH_RECIPE_DATA', fetchRecipeData); //dispatched from EditRecipePage
  yield takeEvery('UPDATE_RECIPE', updateRecipe); //dispatched from EditRecipePage onSubmit
  yield takeEvery('FETCH_RANDOM_RECIPE', fetchRandomRecipe); //dispatched from RandomRecipePage
  yield takeEvery('ADD_FAVORITE', addFavorite); //dispatched from recipeCard
  yield takeEvery('FETCH_FAVORITES', fetchFavorites); //dispatched from MyFavoritesPage and from removeFavorite saga
  yield takeEvery('REMOVE_FAVORITE', removeFavorite); //dispatched from RecipeCard
  yield takeEvery('REMOVE_RECIPE', removeRecipe); //dispatched from RecipePage
}

export default recipeSaga;