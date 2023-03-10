import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import SidePanel from '../SidePanel/SidePanel';

const EditRecipePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedRecipe = useSelector(store => store.selectedRecipe);
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient:'', amount:''}]);
    const [instructions, setInstructions] = useState(['']);
    
    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPE_DATA', payload: id });
    }, [id]);
    
    useEffect(() => {
        setIngredients(selectedRecipe.ingredients);
        setInstructions(selectedRecipe.instructions);
        setTitle(selectedRecipe.title);
    }, [selectedRecipe]);

    const ingredientOnChange = (value, index) => {
        const updatedIngredient = [...ingredients]
        updatedIngredient[index].ingredient = value;
        setIngredients(updatedIngredient);
    };

    const amountOnChange = (value, index) => {
        const updatedAmounts = [...ingredients];
        updatedAmounts[index].amount = value;
        setIngredients(updatedAmounts);
    };

    const instructionOnChange = (value, index) => {
        const updatedInstructions = [...instructions];
        updatedInstructions[index] = value;
        setInstructions(updatedInstructions);
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

    const onSubmit = (event) => {
        event.preventDefault();
        const updatedRecipe = {
            id,
            title,
            ingredients,
            instructions,
        };
        dispatch({
            type: "UPDATE_RECIPE",
            payload: updatedRecipe
        });
        openModal();
        setTitle('');
        setIngredients([{ingredient: '', amount: ''}]);
        setInstructions(['']);
    };

    const openModal = () => {
        const modal = document.querySelector('.modal');
        const overlay = document.querySelector('.overlay');
        modal.classList.remove('hidden'); //remove hidden class from modal
        overlay.classList.remove('hidden'); //remove hidden class from overlay
    };


    return(
        <div className="content-container">
            <div className="user-nav">
                <SidePanel />
            </div>
            <div>
                {selectedRecipe.title &&
                    <h1>Edit Details for <b>{selectedRecipe.title}</b></h1>
                }
                <br />
                <br />
                <form onSubmit={onSubmit}>

                    <div className="title">
                        <label htmlFor="title"><b>Edit Title</b></label>
                        <br />
                        {selectedRecipe.title &&
                            <input
                                id="title" 
                                name="title"
                                value={title}
                                required 
                                className="ingredient-input"
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        }
                    </div>
                    <br />
                    <br />
            
                    <div className="ingredients-container">
                        <label className="small-label" htmlFor="ingredients"><b>Edit Ingredients</b></label>
                        <div className="ingredient-list">
                            {ingredients &&
                                ingredients.map((ingredient, index) => {
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
                        {instructions &&
                            instructions.map((instruction, index) => {
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

                    <section className="modal hidden">
                        <div>
                            <h2>Ahhh... <br />that looks so much better now!</h2>
                        </div>
                        <div className="modal_confirm_container">
                            <button onClick={() => history.goBack()} className="btn_modal_confirm">Agreed</button>
                        </div>
                    </section>
                    
                    <div className="overlay hidden"> {/* overlay element - dark blurred background when modal is open */}
                    </div>

                    <button type="submit" className="btn_save">Update Recipe</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                        type="button"
                        className="btn_cancel"
                        onClick={() => history.goBack()}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditRecipePage;