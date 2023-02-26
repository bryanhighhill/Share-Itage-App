import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

const NewEditRecipePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedRecipe = useSelector(store => store.selectedRecipe);
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient: '', amount: ''}]);
    const [instructions, setInstructions] = useState(['']);
    console.log('in new edit recipe page: ', selectedRecipe.ingredients)
    
    
    //fire off fetch selected recipe on page load
    useEffect(() => {
        dispatch({
            type: 'FETCH_RECIPE_DATA', 
            payload: id
        })
    }, [id]);
       
    // const ingredientsArray = new Array(JSON.parse(selectedRecipe.ingredients).length);

    // const [updatedIngredientsArray, setUpdatedIngredientsArray] = useState(ingredientsArray);

    // const ingredientsOnChange = (index) => {
    //     const updatedArray = [...updatedIngredientsArray];
    //     updatedArray[index] = !updatedIngredientsArray[index];
    //     setUpdatedIngredientsArray(updatedArray);
    // }

    const onChange = () => {
        return (
            console.log('selectedRecipe in new edit:', selectedRecipe)
        )
    }


    return(
        <>
            <h2>Edit Details for <b>{selectedRecipe.title}</b></h2>

            <form>
            <br />

                {/* collect recipe title update here */}
                <div className="title-container">
                    <label htmlFor="title"><b>Edit Title:</b></label>
                    <br />
                    <input
                        id="title" 
                        name="title"
                        defaultValue={selectedRecipe.title} 
                        // onChange={(event) => setTitle(event.target.value)}
                        onChange={() => {onChange}}
                    />
                </div>
            
                <div className="ingredients-container">
                    
                    {/* was having issue with ingredients array not being defined, but was showing up accurate in console. Added a conditional to check
                    if the ingredients array exists, which has corrected the timing issue */}
                    {selectedRecipe.ingredients 
                        ? selectedRecipe.ingredients.map((ingredient, index) => {
                            return (
                                <p>
                                    <h2>{ingredient.amount}</h2> 
                                    OF
                                    <h2>{ingredient.ingredient}</h2>
                                </p>
                            )
                        })
                        : null}
                </div>

                <br /> 
                <br />

                {/* collect recipe ingredient and amount updates here */}
            </form>
        </>
    )
};

export default NewEditRecipePage;