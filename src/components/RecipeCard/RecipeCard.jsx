import { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import EditButton from '../EditButton/EditButton';
import './RecipeCard.css';
 
const RecipeCard = ({recipe, favorite}) => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();    
    const initialCheckedArray = new Array(JSON.parse(recipe.instructions).length).fill(false);
    const [checkedInstruction, setCheckedInstruction] = useState(initialCheckedArray);
    const id = user.id;
    const favorites = useSelector((store) => store.setFavorites);
    console.log('favorite recipes in recipe card: ', favorites);

    useEffect(() => {
        dispatch({ type: 'FETCH_FAVORITES', payload: id });
    }, [id]);

    const onChange = (index) => {
        const updatedArray = [...checkedInstruction];
        updatedArray[index] = !checkedInstruction[index];
        setCheckedInstruction(updatedArray);
    }

    const addFavorites = () => {
        
        dispatch({
            type: 'ADD_FAVORITE', 
            payload: {recipe_id: recipe.id}
        })
    }

    const removeFavorites = () => {
            const favoriteRecipe = {
                id,
                recipe_id: recipe.id,
            }
            dispatch({
                type: 'REMOVE_FAVORITE',
                payload: favoriteRecipe,
            })
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
                                <div className="instruction">
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

{/* MAP TO CHECK FOR ID AGAINST FAV ID TO CONDITIONALLY RENDER ADD/REMOVE FAV BUTTON */}
                            {favorites.length > 0
                            ?
                                <div>
                                    {favorites.map((favRecipe, index) => {
                                        if (favRecipe.id === recipe.id) {
                                            return <button onClick={removeFavorites}>Remove from favorites</button>
                                        }
                                            return <button onClick={addFavorites}>Add to favorites</button>
                                    })}
                                </div>
                            :
                                <button onClick={addFavorites}>Add to favorites</button>}
                        
                    
                        
                    
                        
                {/* {favorite === 'true' */}
                {/* // ? <button className="btn_sizeMed" onClick={removeFavorites}>Remove from favorites</button>
                // : <button onClick={addFavorites}>Add to favorites</button>} 
                <br /> */}

                {(user.admin || user.id === recipe.user_id)
                    &&
                    <EditButton recipe={recipe}/>
                }

                </div>
    )
};

export default RecipeCard;