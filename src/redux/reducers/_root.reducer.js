import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import family from './family.reducer';
import familyMember from './family.member.reducer';
import recipes from './recipes.reducer';
import selectedRecipe from './selected.recipe.reducer';
import randomRecipe from './random.recipe.reducer';
import setFavorites from './set.favorites.reducer';
import setInvitations from './invitations.reducer';
import userRemarks from './user.remarks.reducer';
import shoppingList from './shopping.list.reducer';

// primary reducer for entire project
// bundles all of the reducers
// imported in index.js as rootSaga

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  family, //will have an id and name, user data belonging to family id
  familyMember,
  recipes, //will contain all recipes for specific family_id in db
  selectedRecipe, //will contain recipe that is being edited
  randomRecipe, //will contain recipe picked at random at user's family_id
  setFavorites, //will contain user's favorited recipes
  setInvitations, //will store all invitation token data
  userRemarks, //will store all user_remarks at specified recipe id
  shoppingList, //will store shopping list from user.id
});

export default rootReducer;
