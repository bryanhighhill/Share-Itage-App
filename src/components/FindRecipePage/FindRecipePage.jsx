import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import UserPage from '../UserPage/UserPage';

const FindRecipePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const recipes = useSelector((store) => store.recipes);
    console.log('recipes: ', recipes);
    

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
                <div className="page-content-div">
                    {recipes.map((recipe, index) => {
                        console.log('recipe ingredients in find recipe page: ', recipe.ingredients);
                        if (recipes.length < 1) {
                            return (
                                <h2>You have no recipes yet!</h2>
                                )
                            } else
                        if (recipes.length > 0) {
                            return (
                                <div className="recipe-card">
                                    <div className="recipe-title">
                                        <h2>{recipe.title}</h2>
                                    </div>
                                    <div className="ingredient-list">
                                        <element><b>Ingredients</b></element>
                                        <ul>
                                            {JSON.parse(recipe.ingredients).map((ingredient, index) => {
                                                return(
                                                    <li key={index}>{ingredient.amount} of {ingredient.ingredient}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <div className="ingredient-list">
                                        <element><b>Instructions</b></element>
                                        <ul>
                                        {JSON.parse(recipe.instructions).map((instruction, index) => {
                                            console.log('recipe instructions in find recipe page: ', recipe.instruction)
                                            return(
                                            // <li key={index}>{instruction}</li>
                                            <div className="instruction">
                                                <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-${index}`}
                                                    name={instruction}
                                                    value={instruction}
                                                />
                                                <label htmlFor={`custom-checkbox-${index}`}>{instruction}</label>
                                            </div>
                                            )
                                        })}
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        )   
    }
}

export default FindRecipePage;