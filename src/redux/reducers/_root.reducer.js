import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import family from './family.reducer';
import recipes from './recipes.reducer';
import selectedRecipe from './selected.recipe.reducer';
import randomRecipe from './random.recipe.reducer';
import setFavorites from './set.favorites.reducer';
import setInvitations from './invitations.reducer';
import userRemarks from './user.remarks.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  family, //will have an id and name, user data belonging to family id
  recipes, //will contain all recipes for specific family_id in db
  selectedRecipe, //will contain recipe that is being edited
  randomRecipe, //will contain recipe picked at random at user's family_id
  setFavorites, //will contain user's favorited recipes
  setInvitations, //will store all invitation token data
  userRemarks, //will store all user_remarks at specified recipe id
});

export default rootReducer;
