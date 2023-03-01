import React, { useEffect, useState } from 'react';
import UserPage from '../UserPage/UserPage';
import { useDispatch, useSelector } from 'react-redux';


const RandomRecipePage = () => {
    const dispatch = useDispatch();
    const randomRecipe = useSelector(store => store.randomRecipe);
    const user = useSelector(store => store.user);
    const id = user.family_id;
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient:'', amount:''}]);
    const [instructions, setInstructions] = useState(['']);
    // const [instructionsLength, setInstructionsLength] = useState(0);
    const [checkedInstruction, setCheckedInstruction] = useState(['']);
    const page = 4;

    // const initialCheckedArray = new Array(instructionsLength).fill(false);



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
    

    const onChange = (index) => {
        setCheckedInstruction(new Array(instructions.length).fill(false));
        const updatedArray = [...checkedInstruction];
        updatedArray[index] = !checkedInstruction[index];
        setCheckedInstruction(updatedArray);
    }

    return (
        <div className="content-container">
            <div className="user-nav">
                <UserPage page={page}/>
            </div>
            <div className="random-recipe">
                <h1>Random Recipe</h1>
                <br />
                <br />
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
                                    <>
                                    <input
                                        key={`checkbox-${index}`}
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={instruction}
                                        value={instruction}
                                        onChange={() => onChange(index)}
                                    />
                                    {/* <label htmlFor={`custom-checkbox-${index}`}>{instruction}</label> */}
                                    <label className={!checkedInstruction[index] ? "checked-instruction-false" : "checked-instruction-true"} htmlFor={`custom-checkbox-${index}`}>{instruction}</label>
                                    <br />
                                    </>
                                )
                            })}  
                        </ul>
                    </div>
                : null}
                <button className="btn_save" onClick={refreshPage}>Generate another random recipe</button>
            </div>
        </div>
    )
}

export default RandomRecipePage;