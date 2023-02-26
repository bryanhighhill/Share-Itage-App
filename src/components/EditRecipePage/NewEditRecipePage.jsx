import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

const NewEditRecipePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedRecipe = useSelector(store => store.selectedRecipe);
    const initialIngredients = useSelector(store => store.selectedRecipe.ingredients);
    const initialInstructions = useSelector(store => store.selectedRecipe.instructions);
    const initialTitle = useSelector(store => store.selectedRecipe.title);
    const [title, setTitle] = useState(initialTitle);
    const [ingredients, setIngredients] = useState(initialIngredients);
    const [instructions, setInstructions] = useState(initialInstructions);
    
    
    
    //fire off fetch selected recipe on page load
    useEffect(() => {
        dispatch({
            type: 'FETCH_RECIPE_DATA', 
            payload: id
        })
    }, [id]);
 
        
    // const [updatedArray, setUpdatedArray] = useState([]);
        


    // const onChange = (index) => {
    //     const updatedArray = [...checkedInstruction];
    //     updatedArray[index] = !checkedInstruction[index];
    //     console.log('checked instruction in on chage', updatedArray);
    //     setCheckedInstruction(updatedArray);
    // }
       
    // const ingredientsArray = new Array(JSON.parse(selectedRecipe.ingredients).length);

    // const [updatedIngredientsArray, setUpdatedIngredientsArray] = useState(ingredientsArray);

    const ingredientOnChange = (value, index) => {
        const updatedIngredient = [initialIngredients]
        initialIngredients[index].ingredient = value;
        setIngredients(updatedIngredient);
    }

    const amountOnChange = (value, index) => {
        const updatedAmounts = [initialIngredients];
        initialIngredients[index].amount = value;
        setIngredients(updatedAmounts);
    }

    const instructionOnChange = (value, index) => {
        const updatedInstructions = [initialInstructions];
        initialInstructions[index] = value;
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
            <h2>Edit Details for <b>{title}</b></h2>

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
                            defaultValue={selectedRecipe.title} 
                            onChange={(event) => setTitle(event.target.value)}
                        />
                        : null
                    }
                </div>

                <br />
                <br />
        
                <div className="ingredients-container">
                    <label htmlFor="ingredient"><b>Edit Ingredients:</b></label>
                    {/* was having issue with ingredients array not being defined, but was showing up accurate in console. Added a conditional to check
                    if the ingredients array exists, which has corrected the timing issue */}
                    {selectedRecipe.ingredients 
                        ? selectedRecipe.ingredients.map((ingredient, index) => {
                            return (
                                <div className="ingredient-list">
                                    <input
                                        id="ingredient"
                                        key={`ingredient-${index}`}
                                        defaultValue={ingredient.ingredient}
                                        onChange={(event) => ingredientOnChange(event.target.value, index)}
                                    />
                                    <input
                                        id="amount"
                                        key={`amount-${index}`}
                                        defaultValue={ingredient.amount}
                                        onChange={(event) => amountOnChange(event.target.value, index)}
                                    />
                                </div>
                            )
                        })
                        : null
                    }
                </div>

                <br /> 
                <br />

                <div className="instructions-container">
                    <label htmlFor="instruction"><b>Edit Instructions:</b></label>
                    {/* was having issue with ingredients array not being defined, but was showing up accurate in console. Added a conditional to check
                    if the ingredients array exists, which has corrected the timing issue */}
                    {selectedRecipe.instructions 
                        ? selectedRecipe.instructions.map((instruction, index) => {
                            return (
                                <div className="instruction-list">
                                    <input
                                        id="instruction"
                                        key={`instruction-${index}`}
                                        defaultValue={instruction}
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

export default NewEditRecipePage;