import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserPage from '../UserPage/UserPage';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import './RandomRecipe.css';


const RandomRecipePage = () => {
    const dispatch = useDispatch();
    const randomRecipe = useSelector(store => store.randomRecipe);
    const user = useSelector(store => store.user);
    const recipes = useSelector((store) => store.recipes);
    const favorites = useSelector((store) => store.setFavorites);
    const id = user.family_id;
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient:'', amount:''}]);
    const [instructions, setInstructions] = useState(['']);
    const [recipeId, setRecipeId] = useState(0);
    const [checkedInstruction, setCheckedInstruction] = useState(['']);
    const page = 4;

    console.log('random recipe id: ', randomRecipe.id);
    
    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES', payload: user.family_id });
    }, [id]);
        
    
    useEffect(() => {
        dispatch({ type: 'FETCH_RANDOM_RECIPE', payload: id });
    }, [id]);

    useEffect(() => {
        dispatch({ type: 'FETCH_FAVORITES', payload: user.id });
    }, [id]);

    useEffect(() => {
        setIngredients(randomRecipe.ingredients);
        setInstructions(randomRecipe.instructions);
        setTitle(randomRecipe.title);
        setRecipeId(randomRecipe.id);
    }, [randomRecipe]);

    const refreshPage = () => {
        console.log('in refresh page');
        window.location.reload(false);
      };
    

    const onChange = (index) => {
        setCheckedInstruction(new Array(instructions.length).fill(false));
        const updatedArray = [...checkedInstruction];
        updatedArray[index] = !checkedInstruction[index];
        setCheckedInstruction(updatedArray);
    }

    console.log('favorites in random: ', favorites);
    return (
        <div className="content-container">

            <div className="user-nav">
                <UserPage page={page}/>
            </div>

            {recipes.length > 0
            ? <div className="random-recipe">
                <h1>Random Recipe</h1>
                <br />
                <br />
                <div className="random-recipe-card">
                    <h2><u>{title}</u></h2>
                    {ingredients
                    ?   <div className="ingredients">
                            <h2>Ingredients</h2>
                            <ul>
                                {ingredients.map((ingredient, index) => {
                                    return(
                                        <li key={index}><i>{ingredient.amount}</i>&nbsp;&nbsp;&nbsp;&nbsp;<b>{ingredient.ingredient}</b></li>
                                    )
                                })}  
                            </ul>
                        </div>
                    : null}
                    {instructions
                    ?   <div className="instructions">
                            <h2>Instructions</h2>
                            <ul>
                                {instructions.map((instruction, index) => {
                                    return(
                                        <>
                                        <input
                                            key={`checkbox-${index}`}
                                            type="checkbox"
                                            id={`custom-checkbox-${index}`}
                                            name={instruction}
                                            value={instruction}
                                            onChange={() => onChange(index)}
                                        />
                                        <label className={!checkedInstruction[index] ? "checked-instruction-false" : "checked-instruction-true"} htmlFor={`custom-checkbox-${index}`}>{instruction}</label>
                                        <br />
                                        </>
                                    )
                                })}  
                            </ul>
                        </div>
                    : null}
                    <div className="fav-buttons">
                        <FavoritesButton recipeId={recipeId}/>
                    </div>
                </div>
                <div className="btn_random">
                    <button className="btn_save" onClick={refreshPage}><b>? ? ?</b></button>
                </div>
            </div>
            : <div>
                <h1>Random Recipe</h1>
                <br />
                <br />
                <h2>You have no recipes yet!</h2>
                <p>to add recipes, please click on "Add Recipe" in your user panel</p>
            </div>}
        </div>
    );
};

export default RandomRecipePage;