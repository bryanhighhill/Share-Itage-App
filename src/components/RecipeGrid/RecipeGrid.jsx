import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserPage from '../UserPage/UserPage';
import RecipeCard from '../RecipeCard/RecipeCard';

const RecipeGrid = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const recipes = useSelector((store) => store.recipes);
    console.log('recipes: ', recipes);

    return(
        <div className="recipe-grid">
            {recipes.map((recipe, index) => {
                console.log('recipe in map: ', recipe);
                return (
                    <RecipeCard recipe={recipe}/>
                );
            })}
        </div>
    );
};

export default RecipeGrid;