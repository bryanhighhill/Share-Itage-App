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
    
    
    //fire off fetch selected recipe on page load
    useEffect(() => {
        dispatch({
            type: 'FETCH_RECIPE_DATA', 
            payload: id
        })
    }, [id]);

    const onSubmit = () => {
        return (
            console.log('on submit function called')
        );
    };

    const editIngredientHandler = (position, newIngredient ) => {
        return (
            console.log('in ingredient handler')
        )
        // {ingredients.map(recipe, index => {
        //     if (position === index) {
        //         return (
        //             recipe[index] = newIngredient
        //         )
        //     };
        // })}
    }

    return (
        <div>
            <div className="edit-recipe-div">

                {setTitle(selectedRecipe.title)}
                {/* {setIngredients(JSON.parse(selectedRecipe.ingredients))}
                {setInstructions(JSON.parse(selectedRecipe.instructions))} */}
                
                <br />
                <p>editing details for:
                    <br />
                    <element className="recipe-title">
                        <b>{title}</b>
                    </element>
                </p>
    
                <form onSubmit={onSubmit}>
                    <br />
                    <div className="edit-div">
                        {/* collect recipe title update here */}
                        <label htmlFor="title"><b>Edit Title:</b></label>
                        <br />
                        <input
                            id="title" 
                            name="title"
                            value={title} 
                            placeholder={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>
                    <br /> 
                    <br />
                        {/* {ingredients.map((ingredient, index) => {
                           

                            return(
                                <div className="edit-ingredients-div">
                                    <label htmlFor="ingredients">
                                        <b>Edit Ingredients:</b>
                                    </label>
                                    {/* <input
                                        id={`ingredient-${index}`}
                                        name="ingredients"
                                        value={ingredient.ingredient} 
                                        placeholder={ingredient.ingredient}
                                        // onChange={(event) => editIngredientHandler(index, event.target.value)}
                                    /> */}
                                    {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                
                                    {/* input field for INGREDIENT AMOUNTS
                                    <input
                                        key={`amount-${index}`}
                                        id="ingredient-amount"
                                        name="ingredient-amount"
                                        value={ingredient.amount}
                                        placeholder="Amount"
                                        onChange={() => editAmountHandler(index)}
                                    />    */}
                                {/* </div>
                            )
                        })} */} 
                    <br /> 
                    <br />
                    {/* collect recipe ingredients and amounts update here */}
                    <label htmlFor="ingredients">
                        <b>Edit Ingredients:</b>
                    </label>
                    <br />
                    <br />
                </form>
            </div>
        </div>
    )
}

export default EditRecipePage;