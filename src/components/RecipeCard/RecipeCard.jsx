import { useState } from 'react'; 
import { useSelector } from 'react-redux';
import EditButton from '../EditButton/EditButton';
 
const RecipeCard = ({recipe}) => {
    const [checkedInstruction, setCheckedInstruction] = useState(false);
    const user = useSelector((store) => store.user);
    
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
                    {/* {recipe.instructions.map((instruction, index) => { */}

                        //state = array that is length of instructions, filled with value = false
                        // Array() creates a new array instance - array langth is argument passed in
                        // .fill() changes all elements array to static value from index 0 to array.length - returning modified array
                        // const [checkedInstruction, setCheckedInstruction] = useState(
                        //     new Array(JSON.parse(recipe.instructions).length).fill(false)
                        // );
                        // console.log('checked instruction: ', checkedInstruction);

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
            {user.admin 
                &&
                <EditButton recipe={recipe}/>
            }
        </div>
    )
};

export default RecipeCard;