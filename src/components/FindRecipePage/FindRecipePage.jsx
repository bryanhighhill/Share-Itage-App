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

    if (recipes.length === 0) {
        return(
            <>
                <div className="user-nav">
                    <UserPage />
                </div>
                <h2>You have no recipes yet!</h2>
                <p>to add recipes, please click on "Add Recipe" in your user panel</p>
            </>
        )
    } else
    if (recipes.length > 0) {
        return(
            <div>
                <div className="user-nav">
                    <UserPage />
                </div>
                <RecipeGrid />
            </div>
        )   
    }
}

export default FindRecipePage;