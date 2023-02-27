import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import UserPage from '../UserPage/UserPage';
import RecipeCard from '../RecipeCard/RecipeCard';

const RandomRecipePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const randomRecipe = useSelector(store => store.randomRecipe);
    const user = useSelector(store => store.user);
    const id = user.family_id;
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient:'', amount:''}]);
    const [instructions, setInstructions] = useState(['']);
    console.log('in random recipe page with: ', randomRecipe);
    // const [checkedInstruction, setCheckedInstruction] = useState(initialCheckedArray);
    // console.log('random instruction length: ', instructions.length)

    // const initialCheckedArray = new Array (randomRecipe.instructions.length).fill(false)

    useEffect(() => {
        dispatch({ type: 'FETCH_RANDOM_RECIPE', payload: id });
    }, [id]);

    useEffect(() => {
        setIngredients(randomRecipe.ingredients);
        setInstructions(randomRecipe.instructions);
        setTitle(randomRecipe.title);
    }, [randomRecipe]);

    const refreshPage = () => {
        window.location.reload(false);
      }
    

    // const onChange = (index) => {
    //     const updatedArray = [...checkedInstruction];
    //     updatedArray[index] = !checkedInstruction[index];
    //     console.log('checked instruction in on chage', updatedArray);
    //     setCheckedInstruction(updatedArray);
    // }

    return (
        <div className="random-recipe">
            <h2><u>{title}</u></h2>
            {ingredients
            ?   <div className="ingredients">
                    <h2>Ingredients</h2>
                    <ul>
                        {ingredients.map((ingredient, index) => {
                            return(
                                <li key={index}><i>{ingredient.amount}</i> of <b>{ingredient.ingredient}</b></li>
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
                                <li>{instruction}</li>
                            )
                        })}  
                    </ul>
                </div>
            : null}
            <button className="btn" onClick={refreshPage}>Generate another random recipe</button>
        </div>
    )
}

export default RandomRecipePage;