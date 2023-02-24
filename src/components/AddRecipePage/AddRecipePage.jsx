import React, { useState } from 'react';
import UserPage from '../UserPage/UserPage';
import { useDispatch } from 'react-redux';

const AddRecipePage = () => {
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient:'', amount:''}]);
    const [instructions, setInstructions] = useState(['']);
    const [instructionInputs, setInstructionInputs] = useState([]);
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

        return console.log(`in recipe onSubmit with title: ${recipeTitle}, ingredients: ${ingredients}, and instructions: ${instructions}`);

    }

    const addIngredientInput = () => {
        const ingredientField = [...ingredients, {ingredient:'', amount:''}]
        setIngredients(ingredientField)
    }

    const removeIngredientInput = (index) => {
        const ingredientFields = [...ingredients];
        ingredientFields.splice(index, 1);
        setIngredients(ingredientFields);
    }

    const addInstructionInput = () => {
        const instructionField = [...instructionInputs, []]
        setInstructionInputs(instructionField)
    }

    const removeInstructionInput = (index) => {
        const instructionFields = [...instructionInputs];
        instructionFields.splice(index, 1);
        setInstructionInputs(instructionFields);
    }

    return (
        <div className="content-container">
            <div className="user-nav">
                <UserPage />
            </div> {/*end "user-nav" div */}

            <div className="page-content">
                <h3>add recipe page</h3>

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

                    <div className="ingredient-list">
                            {ingredients.map((ingredient, index) => {
                                return (
                                    <>
                                        <br />
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
                                        {index !== 0 && (
                                            <button 
                                                onClick={() => removeIngredientInput(index)}
                                                className="remove-btn"
                                            >
                                                X
                                            </button>
                                        )}
                                    </>
                                )
                            })}
                        <br />
                        <button onClick={addIngredientInput}>+ Ingredient</button>
                    </div> {/* end "ingredient-list" div */}

                    <br />
                    <br />

                    {/* input field for INSTRUCTIONS */}
                    <div className="instructions">
                        <label htmlFor="instructions"><b>Instructions</b></label>
                        <br />
                        <input
                            id="instructions"
                            name="instructions"
                            // value={ingredient}
                            placeholder="Instruction"
                            onChange={(event) => setInstructions([...instructions, event.target.value])}
                        />
                            {instructionInputs.map((instruction, i) => {
                                return (
                                    <>
                                        <br />
                                        <input
                                            id="instructions"
                                            name="instructions"
                                            // value={ingredient}
                                            placeholder="Instruction"
                                            onChange={(event) => setInstructions([...instructions, event.target.value])}
                                        />
                                        <button 
                                            onClick={removeInstructionInput}
                                            className="remove-btn"    
                                        >
                                            X
                                        </button>
                                    </>
                                )
                            })}
                        <br />
                        <button 
                            onClick={addInstructionInput}
                            className="add-btn"
                        >
                            + Instruction
                        </button>
                    </div> {/* end "instructions" div */}
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