import React, { useState } from 'react';
import SidePanel from '../SidePanel/SidePanel';
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
        const newRecipe = {
            title,
            ingredients,
            instructions,
            family_id: user.family_id,
            user_id: user.id,            
        };
        dispatch({
            type: 'POST_NEW_RECIPE', 
            payload: newRecipe,
        });
        openModal();
        setTitle('');
        setIngredients([{ingredient:'', amount:''}]);
        setInstructions(['']);
        // history.push('/findrecipe');
    };

    const addIngredientInput = () => {
        const ingredientField = [...ingredients, {ingredient:'', amount:''}];
        setIngredients(ingredientField);
    };

    const removeIngredientInput = (index) => {
        const ingredientFields = [...ingredients];
        ingredientFields.splice(index, 1);
        setIngredients(ingredientFields);
    };

    const addInstructionInput = () => {
        const instructionField = [...instructions, ''];
        setInstructions(instructionField);
    };

    const removeInstructionInput = (index) => {
        const instructionFields = [...instructions];
        instructionFields.splice(index, 1);
        setInstructions(instructionFields);
    };

    const openModal = () => {
        const modal = document.querySelector('.modal');
        const overlay = document.querySelector('.overlay');
        modal.classList.remove('hidden'); //removes hidden class from modal
        overlay.classList.remove('hidden'); //removes hidden class from overlay
    };

    const closeModal = () => {
        const modal = document.querySelector('.modal');
        const overlay = document.querySelector('.overlay');
        modal.classList.add('hidden'); //adds hidden class to modal
        overlay.classList.add('hidden'); //adds hidden class to modal
    };

    return (
        <div className="content-container">
            <div className="user-nav">
                <SidePanel page={page}/>
            </div>

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

                    {/* INGREDIENTS */}
                    <label className="small-label" htmlFor="ingredients"><b>Ingredients</b></label>
                    <div className="ingredient-list">
                            {ingredients.map((ingredient, index) => {
                                return (
                                    <>
                                        {/* input field for INGREDIENTS */}
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

                                        {/* prevent first ingredient field from being deleted */}
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
                    </div>
                    <br />
                    <br />

                    {/* INSTRUCTIONS */}
                    <label className="small-label" htmlFor="instructions"><b>Instructions</b></label>
                    <div className="instructions-list">
                            {instructions.map((instruction, index) => {
                                return (
                                    <>
                                        {/* input field for INSTRUCTIONS */}
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
                        
                                        {/* prevent first instruction field from being deleted */}
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
                    </div>
                    <br />
                    <br />

                    <section className="modal hidden"> {/* modal container */}
                        <div>
                            <h2>Your recipe book is getting bigger!</h2>
                        </div>
                        <div className="modal_confirm_container">
                            <button onClick={() => history.push('/findrecipe')} className="btn_modal_confirm">Yes, I know</button>
                        </div>
                    </section>

                    <div className="overlay hidden"></div> {/* overlay element - dark blurred background when modal is open */}
                    
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
            </div>
        </div>
    )
}

export default AddRecipePage;