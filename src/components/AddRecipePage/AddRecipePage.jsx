import React, { useState } from 'react';
import UserPage from '../UserPage/UserPage';
import { useDispatch } from 'react-redux';

const AddRecipePage = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient:'', amount:''}]);
    const [instructions, setInstructions] = useState(['']);
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        const newRecipe = {
            title,
            ingredients,
            instructions,            
        }
        dispatch({
            type: 'POST_NEW_RECIPE', 
            payload: newRecipe,
        })

        // return console.log(`in recipe onSubmit with title: ${recipeTitle}, ingredients: ${ingredients}, and instructions: ${instructions}`);

    }

    //variable to add new fields for ingredient/amount on button click
    const addIngredientInput = () => {
        const ingredientField = [...ingredients, {ingredient:'', amount:''}];
        setIngredients(ingredientField);
    }

    //variable to remove previously added ingredient/amount fields if unused
    const removeIngredientInput = (index) => {
        const ingredientFields = [...ingredients];
        ingredientFields.splice(index, 1);
        setIngredients(ingredientFields);
    }

    //variable to add new fields for instructions on button click
    const addInstructionInput = () => {
        const instructionField = [...instructions, ''];
        setInstructions(instructionField);
    }

    //variable to remove previously added instruction fields if unused
    const removeInstructionInput = (index) => {
        const instructionFields = [...instructions];
        instructionFields.splice(index, 1);
        setInstructions(instructionFields);
    }

    return (
        <div className="content-container">
            <div className="user-nav">
                <UserPage />
            </div> {/*end "user-nav" div */}

            <div className="page-content">
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
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div> {/* end "recipe-title" div */}
                    <br />
                    <br />

                    {/* INGREDIENTS HERE */}
                    <label htmlFor="ingredients"><b>Ingredients</b></label>
                    <div className="ingredient-list">
                            {ingredients.map((ingredient, index) => {
                                return (
                                    <>
                                        {/* input field for ingredient */}
                                        <input
                                            id="ingredients"
                                            name="ingredients"
                                            value={ingredient.ingredient}
                                            placeholder="Ingredient"
                                            onChange={(event) => setIngredients(ingredients => {
                                                const newIngredients = [ ...ingredients ];
                                                newIngredients[index].ingredient = event.target.value;
                                                return newIngredients;
                                            })}
                                        />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        
                                        {/* input field for INGREDIENT AMOUNTS */}
                                        <input
                                            id="ingredient-amount"
                                            name="ingredient-amount"
                                            value={ingredient.amount}
                                            placeholder="Amount"
                                            onChange={(event) => setIngredients(ingredients => {
                                                const newIngredients = [ ...ingredients ];
                                                newIngredients[index].amount = event.target.value;
                                                return newIngredients;
                                            })}
                                        />
                                        {/* conditional to prevent first ingredient field from being deleted */}
                                        {index !== 0 && (
                                            <button 
                                                onClick={() => removeIngredientInput(index)}
                                                className="remove-btn"
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
                            className="add-btn"
                        >
                            + Ingredient
                        </button>
                    </div> {/* end "ingredient-list" div */}
                    <br />
                    <br />

                    {/* INSTRUCTIONS HERE */}
                    <label htmlFor="instructions"><b>Instructions</b></label>
                    <div className="instructions-list">
                            {instructions.map((instruction, index) => {
                                return (
                                    <>
                                        {/* input field for instruction */}
                                        <input
                                            id="instructions"
                                            name="instructions"
                                            value={instruction.instruction}
                                            placeholder="Instruction"
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
                                                onClick={() => removeInstructionInput(index)}
                                                className="remove-btn"
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
                            className="add-btn"
                        >
                            + Instruction
                        </button>
                    </div> {/* end "ingredient-list" div */}




                    <br />
                    <br />
                    <br />
                    <button
                        type="submit"
                        className="submit-recipe-btn"
                    >
                        Save Recipe
                    </button>
                </form>
            </div> {/* end "page-content" div */}
        </div>
    )
}

export default AddRecipePage;