import React, { useState } from 'react';
import UserPage from '../UserPage/UserPage';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './AddRecipePage.css';

const AddRecipePage = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient:'', amount:''}]);
    const [instructions, setInstructions] = useState(['']);
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const page = 1;

    const onSubmit = (event) => {
        event.preventDefault();
        //TODO: add conditional to check that values are not blank and that it is a unique title in db <---------------------------
        //include user.family_id in new recipe object so that it can be added to recipe table in db
        const newRecipe = {
            title,
            ingredients,
            instructions,
            family_id: user.family_id,
            user_id: user.id,            
        }
        dispatch({
            type: 'POST_NEW_RECIPE', 
            payload: newRecipe,
        });
        //TODO: fetch recipes data here recipes <--------------------------------
        //clear values
        setTitle('');
        setIngredients([{ingredient:'', amount:''}]);
        setInstructions(['']);
        //send user to CONFIRMATION PAGE/NEW RECIPE PAGE? instead of user page <----------------------------------------
        alert('Your recipe book is getting bigger!');
        history.push('/user');
    };

    //function to add new fields for ingredient/amount on button click
    const addIngredientInput = () => {
        const ingredientField = [...ingredients, {ingredient:'', amount:''}];
        setIngredients(ingredientField);
    }

    //function to remove previously added ingredient/amount fields if unused
    const removeIngredientInput = (index) => {
        const ingredientFields = [...ingredients];
        ingredientFields.splice(index, 1);
        setIngredients(ingredientFields);
    }

    //function to add new fields for instructions on button click
    const addInstructionInput = () => {
        const instructionField = [...instructions, ''];
        setInstructions(instructionField);
    }

    //function to remove previously added instruction fields if unused
    const removeInstructionInput = (index) => {
        const instructionFields = [...instructions];
        instructionFields.splice(index, 1);
        setInstructions(instructionFields);
    }

    return (
        <div className="content-container">
            <div className="user-nav">
                <UserPage page={page}/>
            </div> {/*end "user-nav" div */}

            <div className="form-container">
                <h1>Add Recipe</h1>
                <br />
                <br />
                <form onSubmit={onSubmit}>
                    {/* input for RECIPE TITLE */}
                    <div className="title">
                        <label htmlFor="title"><b>Recipe Title</b></label>
                        <br />
                        <input
                            id="title"
                            name="title"
                            value={title}
                            placeholder="title"
                            required
                            className="ingredient-input"
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div> {/* end "recipe-title" div */}
                    <br />
                    <br />

                    {/* INGREDIENTS HERE */}
                    <label className="small-label" htmlFor="ingredients"><b>Ingredients</b></label>
                    <div className="ingredient-list">
                            {ingredients.map((ingredient, index) => {
                                return (
                                    <>
                                        {/* input field for ingredient */}
                                        <input
                                            key={`ingredient-${index}`}
                                            className="ingredient-input"
                                            id="ingredients"
                                            name="ingredients"
                                            value={ingredient.ingredient}
                                            placeholder="ingredient"
                                            required
                                            onChange={(event) => setIngredients(ingredients => {
                                                const newIngredients = [ ...ingredients ];
                                                newIngredients[index].ingredient = event.target.value;
                                                console.log('new ingredients: ', newIngredients);
                                                return newIngredients;
                                            })}
                                        />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        
                                        {/* input field for INGREDIENT AMOUNTS */}
                                        <input
                                            key={`amount-${index}`}
                                            className="ingredient-input"
                                            id="ingredient-amount"
                                            name="ingredient-amount"
                                            value={ingredient.amount}
                                            placeholder="amount"
                                            required
                                            onChange={(event) => setIngredients(ingredients => {
                                                const newIngredients = [ ...ingredients ];
                                                newIngredients[index].amount = event.target.value;
                                                return newIngredients;
                                            })}
                                        />
                                        {/* conditional to prevent first ingredient field from being deleted */}
                                        {index !== 0 && (
                                            <button
                                                key={`remove-btn-${index}`} 
                                                onClick={() => removeIngredientInput(index)}
                                                type="button"
                                                className="btn_sizeMin"
                                            >
                                                X
                                            </button>
                                        )}
                                        <br />
                                    </>
                                )
                            })}
                        <button
                            onClick={addIngredientInput}
                            type="button"
                            className="btn_sizeMed"
                        >
                            + Ingredient
                        </button>
                    </div> {/* end "ingredient-list" div */}
                    <br />
                    <br />

                    {/* INSTRUCTIONS HERE */}
                    <label className="small-label" htmlFor="instructions"><b>Instructions</b></label>
                    <div className="instructions-list">
                            {instructions.map((instruction, index) => {
                                return (
                                    <>
                                        {/* input field for instruction */}
                                        <input
                                            key={`instruction-${index}`}
                                            className="instruction-input"
                                            id="instructions"
                                            name="instructions"
                                            value={instruction.instruction}
                                            placeholder="instruction"
                                            required
                                            onChange={(event) => setInstructions(instructions => {
                                                const newInstructions = [ ...instructions ];
                                                newInstructions[index] = event.target.value;
                                                return newInstructions;
                                            })}
                                        />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        
                                        {/* conditional to prevent first instruction field from being deleted */}
                                        {index !== 0 && (
                                            <button
                                                key={`remove-btn2-${index}`} 
                                                onClick={() => removeInstructionInput(index)}
                                                type="button"
                                                className="btn_sizeMin"
                                            >
                                                X
                                            </button>
                                        )}
                                        <br />
                                    </>
                                )
                            })}
                        <button
                            onClick={addInstructionInput}
                            type="button"
                            className="btn_sizeMed"
                        >
                            + Instruction
                        </button>
                    </div> {/* end "ingredient-list" div */}
                    <br />
                    <br />
                    <button
                        type="submit"
                        className="btn_save"
                    >
                        Save Recipe
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                        type="button"
                        className="btn_cancel"
                        onClick={() => history.push('/user')}>
                            Cancel
                    </button>
                </form>
            </div> {/* end "page-content" div */}
        </div>
    )
}

export default AddRecipePage;