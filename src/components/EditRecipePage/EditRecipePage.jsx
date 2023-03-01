import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import UserPage from '../UserPage/UserPage';

const EditRecipePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedRecipe = useSelector(store => store.selectedRecipe);
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient:'', amount:''}]);
    const [instructions, setInstructions] = useState(['']);

    console.log('selectedRecipe on Edit Page: ', selectedRecipe);
    
    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPE_DATA', payload: id });
    }, [id]);
    
    useEffect(() => {
        setIngredients(selectedRecipe.ingredients);
        setInstructions(selectedRecipe.instructions);
        setTitle(selectedRecipe.title);
    }, [selectedRecipe]);

    //on change handler for updated ingredients
    const ingredientOnChange = (value, index) => {
        const updatedIngredient = [...ingredients]
        updatedIngredient[index].ingredient = value;
        setIngredients(updatedIngredient);
    }

    //on change handler for updated amounts
    const amountOnChange = (value, index) => {
        const updatedAmounts = [...ingredients];
        updatedAmounts[index].amount = value;
        setIngredients(updatedAmounts);
    }

    //on change handler for updated instructions
    const instructionOnChange = (value, index) => {
        const updatedInstructions = [...instructions];
        updatedInstructions[index] = value;
        console.log('instruction on change value: ', value, updatedInstructions)
        setInstructions(updatedInstructions);
    }

    //functino to add ingredient/amountfields
    const addIngredientInput = () => {
        const ingredientField = [...ingredients, {ingredient:'', amount:''}];
        setIngredients(ingredientField);
    }

    //function to remove previously added ingredient/amount fields
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

    const onSubmit = (event) => {
        event.preventDefault();
        console.log('in on submit with: ', id, title, ingredients, instructions)
        const updatedRecipe = {
            id,
            title,
            ingredients,
            instructions,
        }
        
        dispatch({
            type: "UPDATE_RECIPE",
            payload: updatedRecipe
        });

        setTitle('');
        setIngredients([{ingredient: '', amount: ''}]);
        setInstructions(['']);
        alert(`Oh yeah, that looks so much better now!`);
        history.push(`/findrecipe`);
    }


    return(
        <div className="content-container">
            <div className="user-nav">
                <UserPage />
            </div>
            <div>
                {selectedRecipe.title
                    ?   <h1>Edit Details for <b>{selectedRecipe.title}</b></h1>
                    : null
                }
                <br />
                <br />
                <form onSubmit={onSubmit}>

                    {/* collect recipe title update here */}
                    <div className="title">
                        <label htmlFor="title"><b>Edit Title</b></label>
                        <br />
                        {selectedRecipe.title
                            ? <input
                                id="title" 
                                name="title"
                                value={title}
                                required 
                                className="ingredient-input"
                                onChange={(event) => setTitle(event.target.value)}
                            />
                            : null
                        }
                    </div>

                    <br />
                    <br />
            
                    <div className="ingredients-container">
                        <label className="small-label" htmlFor="ingredients"><b>Edit Ingredients</b></label>
                        {/* was having issue with ingredients array not being defined, but was showing up accurate in console. Added a conditional to check
                        if the ingredients array exists, which has corrected the timing issue */}
                        <div className="ingredient-list">
                            {ingredients
                                ? ingredients.map((ingredient, index) => {
                                    return (
                                        <div className="ingredient-list">
                                            <input
                                                id={`id-ingredient-${index}`}
                                                key={`ingredient-${index}`}
                                                value={ingredients[index].ingredient}
                                                required
                                                className="ingredient-input"
                                                onChange={(event) => ingredientOnChange(event.target.value, index)}
                                            />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                            <input
                                                id={`id-amount-${index}`}
                                                key={`amount-${index}`}
                                                value={ingredients[index].amount}
                                                required
                                                className="ingredient-input"
                                                onChange={(event) => amountOnChange(event.target.value, index)}
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
                                        </div>
                                    )
                                })
                                : null
                            }
                                <button
                                    onClick={addIngredientInput}
                                    type="button"
                                    className="btn_sizeMed"
                                >
                                    + Ingredient
                                </button>
                                
                        </div>
                    </div>

                    <br /> 
                    <br />

                    <div className="instructions-container">
                        <label className="small-label" htmlFor="ingredients"><b>Edit Instructions</b></label>
                        {/* was having issue with ingredients array not being defined, but was showing up accurate in console. Added a conditional to check
                        if the ingredients array exists, which has corrected the timing issue */}
                        {instructions
                            ? instructions.map((instruction, index) => {
                                return (
                                    <div className="instruction-list">
                                        <input
                                            id={`instruction-id-${index}`}
                                            key={`instruction-${index}`}
                                            value={instructions[index]}
                                            required
                                            className="instruction-input"
                                            onChange={(event) => instructionOnChange(event.target.value, index)}
                                        />
                                        {/* conditional to prevent first instruction field from being deleted */}
                                        {index !== 0 && (
                                            <button
                                                key={`remove-btn-${index}`} 
                                                onClick={() => removeInstructionInput(index)}
                                                type="button"
                                                className="btn_sizeMin"
                                            >
                                                X
                                            </button>
                                        )}
                                    </div>
                                )
                            })
                            : null
                        }
                        <button
                            onClick={addInstructionInput}
                            type="button"
                            className="btn_sizeMed"
                        >
                            + Instruction
                        </button>
                    </div>
                    <br />
                    <br />
                    <button type="submit" className="btn_save">Update Recipe</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                        type="button"
                        className="btn_cancel"
                        onClick={() => history.goBack()}>
                            Cancel
                    </button>
                </form>
            </div>
        </div>
    )
};

export default EditRecipePage;