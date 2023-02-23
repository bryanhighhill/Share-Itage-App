import React, { useState } from 'react';
import UserPage from '../UserPage/UserPage';

const AddRecipePage = () => {
    const [recipeTitle, setRecipeTitle] = useState('');
    const [ingredient, setIngredient] = useState([]);
    const [amount, setAmount] = useState([]);
    
    const [ingredientInputs, setIngredientInputs] = useState([]);

    const onSubmit = (event) => {
        event.preventDefault();

        return (
            console.log(`in recipe onSubmit with ${recipeTitle}`)
        )
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

    return (
        <div>
            <div className="user-nav">
                <UserPage />
            </div>
            <div className="page-content-div">
                <h3>add recipe page</h3>

                <form onSubmit={onSubmit}>

                    {/* input for RECIPE TITLE */}
                    <label htmlFor="recipe-title"><b>Recipe Title</b></label>
                    <br />
                    <input
                        id="recipe-title"
                        name="recipe-title"
                        value={recipeTitle}
                        placeholder="Recipe Title"
                        onChange={(event) => setRecipeTitle(event.target.value)}
                    />
                    <br />
                    <br />
                    {/* add input field for INGREDIENT(S) */}
                    <div className="ingredient-list">
                        <label htmlFor="ingredients"><b>Ingredients</b></label>
                        <br />
                        <input
                            id="ingredients"
                            name="ingredients"
                            // value={ingredient}
                            placeholder="Ingredient"
                            onChange={(event) => setIngredient([...ingredient, event.target.value])}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        
                        {/* add input field for INGREDIENT AMOUNTS */}
                        <input
                            id="ingredient-amount"
                            name="ingredient-amount"
                            // value={ingredient}
                            placeholder="Amount"
                            onChange={(event) => setAmount([...amount, event.target.value])}
                        />

                        <br />
                            {ingredientInputs.map((ingredient, i) => {
                                return (
                                    <div>
                                        <input
                                            id="ingredients"
                                            name="ingredients"
                                            // value={ingredient}
                                            placeholder="Ingredient"
                                            onChange={(event) => setIngredient([...ingredient, event.target.value])}
                                        />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        
                                        {/* add input field for INGREDIENT AMOUNTS */}
                                        <input
                                            id="ingredient-amount"
                                            name="ingredient-amount"
                                            // value={ingredient}
                                            placeholder="Amount"
                                            onChange={(event) => setAmount([...amount, event.target.value])}
                                        />
                                        <button onClick={removeIngredientInput}>X</button>
                                    </div>
                                )
                            })}
                        <button onClick={() => addIngredientInput()}>Add Ingredient</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddRecipePage;