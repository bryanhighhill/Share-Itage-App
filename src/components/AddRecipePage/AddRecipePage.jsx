import React, { useState } from 'react';
import UserPage from '../UserPage/UserPage';

const AddRecipePage = () => {
    const [recipeTitle, setRecipeTitle] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [amount, setAmount] = useState([]);
    const [instructions, setInstructions] = useState([]);
    const [ingredientInputs, setIngredientInputs] = useState([]);
    const [instructionInputs, setInstructionInputs] = useState([]);

    const onSubmit = (event) => {
        event.preventDefault();
        const newRecipe = {
            
        }

        return console.log(`in recipe onSubmit with title: ${recipeTitle}, ingredients: ${ingredients}, and instructions: ${instructions}`);

    }

    const addIngredientInput = () => {
        const ingredientField = [...ingredientInputs, []]
        setIngredientInputs(ingredientField)
    }

    const removeIngredientInput = (index) => {
        const ingredientFields = [...ingredientInputs];
        ingredientFields.splice(index, 1);
        setIngredientInputs(ingredientFields);
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
                    <div className="recipe-title">
                        <label htmlFor="recipe-title"><b>Recipe Title</b></label>
                        <br />
                        <input
                            id="recipe-title"
                            name="recipe-title"
                            value={recipeTitle}
                            placeholder="Recipe Title"
                            onChange={(event) => setRecipeTitle(event.target.value)}
                        />
                    </div> {/* end "recipe-title" div */}

                    <br />
                    <br />

                    {/* input field for INGREDIENTS */}
                    <div className="ingredient-list">
                        <label htmlFor="ingredients"><b>Ingredients</b></label>
                        <br />
                        <input
                            id="ingredients"
                            name="ingredients"
                            // value={ingredient}
                            placeholder="Ingredient"
                            onChange={(event) => setIngredients([...ingredients, event.target.value])}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        
                        {/* input field for INGREDIENT AMOUNTS */}
                        <input
                            id="ingredient-amount"
                            name="ingredient-amount"
                            // value={ingredient}
                            placeholder="Amount"
                            onChange={(event) => setAmount([...amount, event.target.value])}
                        />
                            {ingredientInputs.map((ingredient, i) => {
                                return (
                                    <>
                                        <br />
                                        <input
                                            id="ingredients"
                                            name="ingredients"
                                            // value={ingredient}
                                            placeholder="Ingredient"
                                            onChange={(event) => setIngredients([...ingredients, event.target.value])}
                                        />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        
                                        {/* input field for INGREDIENT AMOUNTS */}
                                        <input
                                            id="ingredient-amount"
                                            name="ingredient-amount"
                                            // value={ingredient}
                                            placeholder="Amount"
                                            onChange={(event) => setAmount([...amount, event.target.value])}
                                        />
                                        <button 
                                            onClick={removeIngredientInput}
                                            className="remove-btn"
                                        >
                                            X
                                        </button>
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