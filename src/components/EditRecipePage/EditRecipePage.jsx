import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

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
        setIngredients([{ingredient:'', amount:''}]);
        setInstructions(['']);
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
    }

    const amountOnChange = (value, index) => {
        const updatedAmounts = [...ingredients];
        updatedAmounts[index].amount = value;
        setIngredients(updatedAmounts);
    }

    const instructionOnChange = (value, index) => {
        const updatedInstructions = [...instructions];
        updatedInstructions[index] = value;
        console.log('instruction on change value: ', value, updatedInstructions)
        setInstructions(updatedInstructions);
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
        <>
            {selectedRecipe.title
            ?   <h2>Edit Details for <b>{selectedRecipe.title}</b></h2>
            : null}

            <br />
            <br />

            <form onSubmit={onSubmit}>

                {/* collect recipe title update here */}
                <div className="title-container">
                    <label htmlFor="title"><b>Edit Title:</b></label>
                    <br />
                    {selectedRecipe.title
                        ? <input
                            id="title" 
                            name="title"
                            value={title} 
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        : null
                    }
                </div>

                <br />
                <br />
        
                <div className="ingredients-container">
                    <p><b>Edit Ingredients:</b></p>
                    {/* was having issue with ingredients array not being defined, but was showing up accurate in console. Added a conditional to check
                    if the ingredients array exists, which has corrected the timing issue */}
                    <div className="ingredient-list">
                        {ingredients
                            ? ingredients.map((ingredient, index) => {
                                return (
                                    <>
                                        <input
                                            id={`id-ingredient-${index}`}
                                            key={`ingredient-${index}`}
                                            value={ingredients[index].ingredient}
                                            onChange={(event) => ingredientOnChange(event.target.value, index)}
                                        />
                                        <input
                                            id={`id-amount-${index}`}
                                            key={`amount-${index}`}
                                            value={ingredients[index].amount}
                                            onChange={(event) => amountOnChange(event.target.value, index)}
                                        />
                                        <br />
                                        <br />
                                    </>
                                )
                            })
                            : null
                        }
                    </div>
                </div>

                <br /> 
                <br />

                <div className="instructions-container">
                    <p><b>Edit Instructions:</b></p>
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
                                        onChange={(event) => instructionOnChange(event.target.value, index)}
                                    />
                                </div>
                            )
                        })
                        : null}
                </div>
                <br />
                <br />
                <button type="submit" className="btn">Update Recipe</button>
            </form>
        </>
    )
};

export default EditRecipePage;