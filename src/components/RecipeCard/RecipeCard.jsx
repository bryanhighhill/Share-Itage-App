import { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import EditButton from '../EditButton/EditButton';
import './RecipeCard.css';
 
const RecipeCard = ({recipe, favorite}) => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    
    const initialCheckedArray = new Array(JSON.parse(recipe.instructions).length).fill(false);

    const [checkedInstruction, setCheckedInstruction] = useState(initialCheckedArray);
        
    // const [updatedArray, setUpdatedArray] = useState([]);

    const onChange = (index) => {
        const updatedArray = [...checkedInstruction];
        updatedArray[index] = !checkedInstruction[index];
        console.log('checked instruction in on chage', updatedArray);
        setCheckedInstruction(updatedArray);
    }

    const addToFavorites = () => {
        console.log('you want to add to favorites: ', recipe.title);

        const favoriteRecipe = {
            user_id: user.id,
            recipe_id: recipe.id,
        }
        dispatch({
            type: 'ADD_FAVORITE', 
            payload: favoriteRecipe
        })
    }

    const removeFavorites = () => {
        return (
            console.log('you want to remove from favorites')
        )
    };

    return (
        <div className="recipe-card">
            <div className="recipe-title">
                <h2>{recipe.title}</h2>
            </div>

            <div className="ingredient-list">
                <p><b>Ingredients</b></p>
                {recipe.ingredients
                ?   <ul>
                    {JSON.parse(recipe.ingredients).map((ingredient, index) => {
                        return(
                            <li key={index}>{ingredient.amount} of {ingredient.ingredient}</li>
                        )
                    })}
                    </ul>
                : null}
            </div>
            <div className="instruction-list">
                <p><b>Instructions</b></p>
                {recipe.ingredients
                ?   <div>
                        {JSON.parse(recipe.instructions).map((instruction, index) => {

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
                                    onChange={() => onChange(index)}
                                />
                                <label className={!checkedInstruction[index] ? "checked-instruction-false" : "checked-instruction-true"} htmlFor={`custom-checkbox-${index}`}>{instruction}</label>

                            </div>
                            )
                        })}
                    </div>
                : null}
                </div>

                {favorite 
                ? <button onClick={removeFavorites}>Remove from favorites</button>
                : <button onClick={addToFavorites}>Add to favorites</button>}
                <br />

                {(user.admin || user.id === recipe.user_id)
                    &&
                    <EditButton recipe={recipe}/>
                }
                </div>
    )
};

export default RecipeCard;