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

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES', payload: user.family_id });
    }, []);

    return(
        <div className="recipe-grid">
            {recipes.map((recipe, index) => {
                return (
                    <RecipeCard recipe={recipe}/>
                );
            })}
        </div>
    );
};

export default RecipeGrid;