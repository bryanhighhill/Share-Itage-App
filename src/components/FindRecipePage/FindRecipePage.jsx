import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserPage from '../UserPage/UserPage';
import RecipeGrid from '../RecipeGrid/RecipeGrid';

const FindRecipePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const recipes = useSelector((store) => store.recipes);
    console.log('recipes: ', recipes);
    const page = 3;

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES', payload: user.family_id });
    }, []);

    if (recipes.length === 0) {
        return(
            <div className="content-container">
                <div className="user-nav">
                    <UserPage page={page}/>
                </div>
                
                <div>
                    <h1>Find a Recipe</h1>
                    <br />
                    <br />
                    <h2>You have no recipes yet!</h2>
                    <p>to add recipes, please click on "Add Recipe" in your user panel</p>
                </div>
            </div>
        )
    } else
    if (recipes.length > 0) {
        return(
            <div className="content-container">
                <div className="user-nav">
                    <UserPage page={page}/>
                </div>

                <div>
                <h1>Find a Recipe</h1>
                <br />
                <br />
                    <RecipeGrid />
                </div>
            </div>
        )   
    }
}

export default FindRecipePage;