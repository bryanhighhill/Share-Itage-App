import React, { useEffect, useState } from 'react';
import UserPage from '../UserPage/UserPage';
import { useDispatch, useSelector } from 'react-redux';
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

    const addFavorites = () => {
        console.log('id in add fav: ', recipeId);
        dispatch({
            type: 'ADD_FAVORITE', 
            payload: {recipe_id: randomRecipe.id}
        });
    };

    const removeFavorites = () => {
            const favoriteRecipe = {
                recipe_id: randomRecipe.id,
            }
            dispatch({
                type: 'REMOVE_FAVORITE',
                payload: favoriteRecipe,
            });
    };


    
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
                    {favorites.length > 0
                        ?
                            <>
                                {favorites.map((favRecipe, index) => {
                                    return favRecipe.id;
                                }).includes(recipeId) 
                                    ?   <button className="btn_sizeMed" onClick={removeFavorites}>Remove from favorites</button>
                                    :   <button className="btn_sizeMed" onClick={addFavorites}>Add to favorites</button>
                                }
                            </>
                        :   <button className="btn_sizeMed" onClick={addFavorites}>Add to favorites</button>}
                </div>
                <div className="random-button">
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