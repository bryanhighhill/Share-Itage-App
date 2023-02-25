import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserPage from '../UserPage/UserPage';
import RecipeCard from '../RecipeCard/RecipeCard';
import './FindRecipePage.css';

const FindRecipePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const recipes = useSelector((store) => store.recipes);
    console.log('recipes: ', recipes);

    const [checkedInstruction, setCheckedInstruction] = useState(false);

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES', payload: user.family_id });
    }, []);


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
                <RecipeCard />
            </div>
        )   
    }
}

export default FindRecipePage;