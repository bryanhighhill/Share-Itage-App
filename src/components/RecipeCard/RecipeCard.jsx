import { useState } from 'react'; 
import { useSelector } from 'react-redux';
import EditButton from '../EditButton/EditButton';
import './RecipeCard.css';
 
const RecipeCard = ({recipe}) => {
    const user = useSelector((store) => store.user);
    
    const initialCheckedArray = new Array(JSON.parse(recipe.instructions).length).fill(false);

    const [checkedInstruction, setCheckedInstruction] = useState(initialCheckedArray);
        
    // const [updatedArray, setUpdatedArray] = useState([]);
        


    const onChange = (index) => {
        const updatedArray = [...checkedInstruction];
        updatedArray[index] = !checkedInstruction[index];
        console.log('checked instruction in on chage', updatedArray);
        setCheckedInstruction(updatedArray);
    }

    return (
        <div className="recipe-card">
            <div className="recipe-title">
                <h2>{recipe.title}</h2>
            </div>
            <div className="ingredient-list">
                <p><b>Ingredients</b></p>
                <ul>
                    {JSON.parse(recipe.ingredients).map((ingredient, index) => {
                        return(
                            <li key={index}>{ingredient.amount} of {ingredient.ingredient}</li>
                        )
                    })}
                </ul>
            </div>
            <div className="ingredient-list">
                <p><b>Instructions</b></p>
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
                                key={`checkbox-${index}`}
                                type="checkbox"
                                id={`custom-checkbox-${index}`}
                                name={instruction}
                                value={instruction}
                                // checked={updatedArray[index]}
                                onChange={() => onChange(index)}
                            />
                            <label className={!checkedInstruction[index] ? "checked-instruction-false" : "checked-instruction-true"} htmlFor={`custom-checkbox-${index}`}>{instruction}</label>

                            {/* {!checkedInstruction[index] 
                                ? <label className="checked-instruction-false" htmlFor={`custom-checkbox-${index}`}>{instruction}</label>
                                : <label className="checked-instruction-true" htmlFor={`custom-checkbox-${index}`}>{instruction}</label>
                            } */}
                        </div>
                        )
                    })}
            </div>
            {user.admin 
                &&
                <EditButton recipe={recipe}/>
            }
        </div>
    )
};

export default RecipeCard;