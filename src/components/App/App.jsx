import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import HomePage from '../HomePage/HomePage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AddRecipePage from '../AddRecipePage/AddRecipePage';
import MyFavoritesPage from '../MyFavoritesPage/MyFavoritesPage';
import FindRecipePage from '../FindRecipePage/FindRecipePage';
import RandomRecipePage from '../RandomRecipePage/RandomRecipePage';
import CreateFamilyPage from '../CreateFamilyPage/CreateFamilyPage';
import FamilyConfirmationPage from '../FamilyConfirmationPage/FamilyConfirmationPage';
import AdminPage from '../AdminPage/AdminPage';
import EditRecipePage from '../EditRecipePage/EditRecipePage';
import RecipePage from '../RecipePage/RecipePage';
import UserInvitation from '../UserInvitation/UserInvitation';
import InvitationLoginPage from '../InvitationLoginPage/InvitationLoginPage';
import ShoppingList from '../ShoppingList/ShoppingList';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const id = user.id;
  const [isLoading, setIsLoading] = useState(true);
  console.log('user is: ', user);
  
  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  useEffect(() => {
    if (user.unauthenticated || user.id) { 
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return 'loading';
   }
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          {/* protected route for CREATE FAMILY (located in sidePanel) */}
          <ProtectedRoute
            exact
            path="/createfamily"
          >
            <CreateFamilyPage />
          </ProtectedRoute>

          {/* protected route for FAMILY CONFIRMATION */}
          <ProtectedRoute
            exact
            path="/familyconfirmation"
          >
            <FamilyConfirmationPage />
          </ProtectedRoute>

          {/* protected route for ADD RECIPE (located in sidePanel) */}
          <ProtectedRoute
            exact
            path="/addrecipe"
          >
            <AddRecipePage />
          </ProtectedRoute>

          {/* protected route for MY FAVORITES (located in sidePanel) */}
          <ProtectedRoute
            exact
            path="/myfavorites"
          >
            <MyFavoritesPage />
          </ProtectedRoute>

           {/* protected route for FIND NEW RECIPE (located in sidePanel) */}
           <ProtectedRoute
            exact
            path="/findrecipe"
          >
            <FindRecipePage />
          </ProtectedRoute>

          {/* protected route for RANDOM RECIPE (located in sidePanel) */}
          <ProtectedRoute
            exact
            path="/randomrecipe"
          >
            <RandomRecipePage />
          </ProtectedRoute>

          {/* protected route for ADMIN (located in sidePanel) */}
          <ProtectedRoute
            exact
            path="/admin"
          >
            <AdminPage />
          </ProtectedRoute>

          {/* protected route for ADMIN - EDIT RECIPE (located in EditButton) */}
          <ProtectedRoute
            exact
            path="/edit/:id"
          >
            <EditRecipePage />
          </ProtectedRoute>

          {/* protected route for RECIPE PAGE */}
          <ProtectedRoute
            exact
            path="/recipe/:id"
          >
            <RecipePage />
          </ProtectedRoute>

          {/* protected route for USER INVITATION */}
          <ProtectedRoute
            exact
            path="/userinvite"
          >
            <UserInvitation />
          </ProtectedRoute>

          {/* protected route for SHOPPING LIST */}
          <ProtectedRoute
            exact
            path="/shoppinglist"
          >
            <ShoppingList />
          </ProtectedRoute>

          <Route
            exact
            path="/inviteduserregpage/:id"
          >
            <InvitationLoginPage />
          </Route>


          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
