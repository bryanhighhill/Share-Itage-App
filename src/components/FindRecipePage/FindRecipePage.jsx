import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserPage from '../UserPage/UserPage';
import './FindRecipePage.css';

const FindRecipePage = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const recipes = useSelector((store) => store.recipes);
    console.log('recipes: ', recipes);

    const [checkedInstruction, setCheckedInstruction] = useState(false);

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPES', payload: user.family_id });
    }, []);


    if (recipes.length === 0) {
        return(
            <>
                <div className="user-nav">
                    <UserPage />
                </div>
                <h2>You have no recipes yet!</h2>
                <p>to add recipes, please click on "Add Recipe" in your user panel</p>
            </>
        )
    } else
    if (recipes.length > 0) {
        return(
            <div>
                <div className="user-nav">
                    <UserPage />
                </div>
                <div className="page-content-div">
                    {recipes.map((recipe, index) => {
                        console.log('recipe ingredients in find recipe page: ', recipe.ingredients);

                            return (
                                <div className="recipe-card">
                                    <div className="recipe-title">
                                        <h2>{recipe.title}</h2>
                                    </div>
                                    <div className="ingredient-list">
                                        <element><b>Ingredients</b></element>
                                        <ul>
                                            {JSON.parse(recipe.ingredients).map((ingredient, index) => {
                                                return(
                                                    <li key={index}>{ingredient.amount} of {ingredient.ingredient}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                    <div className="ingredient-list">
                                        <element><b>Instructions</b></element>
                                        <ul>
                                        {JSON.parse(recipe.instructions).map((instruction, index) => {
                
                                            //state = array that is length of instructions, filled with value = false
                                            // Array() creates a new array instance - array langth is argument passed in
                                            // .fill() changes all elements array to static value from index 0 to array.length - returning modified array
                                            // const [checkedInstruction, setCheckedInstruction] = useState(
                                            //     new Array(JSON.parse(recipe.instructions).length).fill(false)
                                            // );
                                            // console.log('checked instruction: ', checkedInstruction);

                                            //onChangeHandler to update checked state of instruction
                                            // const handleOnChange = (instructionIndex, event) => {
                                            //     selected = event.target.checked;
                                            //     instructionArray.map((instruction, index) => {
                                            //         if (index === instructionIndex) {
                                            //             return (
                                            //                 selected === !selected
                                            //             );
                                            //         }
                                            //     } )
                                               
                                            // }

                                            return(
                                            // <li key={index}>{instruction}</li>
                                            <div className="instruction">
                                                {/* <label htmlFor={instruction}></label> */}
                                                <input
                                                    type="checkbox"
                                                    id={`custom-checkbox-${index}`}
                                                    name={instruction}
                                                    value={instruction}
                                                    checked={checkedInstruction}
                                                    onChange={() => setCheckedInstruction(!checkedInstruction)}
                                                />
                                                <label className="checked-instruction-false" htmlFor={`custom-checkbox-${index}`}>{instruction}</label>

                                                {/* {!checkedStatus 
                                                    ? <label className="checked-instruction-false" htmlFor={`custom-checkbox-${index}`}>{instruction}</label>
                                                    : <label className="checked-instruction-true" htmlFor={`custom-checkbox-${index}`}>{instruction}</label>
                                                } */}
                                            </div>
                                            )
                                        })}
                                        </ul>
                                    </div>
                                </div>
                            )
                    })}
                </div>
            </div>
        )   
    }
}

export default FindRecipePage;