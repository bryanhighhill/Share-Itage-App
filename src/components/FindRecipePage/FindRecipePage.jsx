import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import UserPage from '../UserPage/UserPage';

const FindRecipePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const recipes = useSelector((store) => store.recipes);

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
                    <h3>find recipe page</h3>
                    {recipes.map(recipe => {
                        if (recipes.length < 1) {
                            return (
                                <h2>You have no recipes yet!</h2>
                                )
                            } else
                        if (recipes.length > 0) {
                            return (
                                <div className="recipe-card">
                                    <h2>{recipe.title}</h2>
                                    <br />
                                    <h2>Ingredients:</h2>
                                    <br />
                                    <ul>
                                    {recipe.ingredients.map(ingredient => {
                                        return(
                                        <li>{ingredient.ingredient} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Amount: {ingredient.amount}</li>
                                        )
                                    })}
                                    </ul>
                                    <br />
                                    <br />
                                    <ul>
                                    {recipe.instructions.map(instruction => {
                                        return(
                                        <li>{instruction.instruction}</li>
                                        )
                                    })}
                                    </ul>
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