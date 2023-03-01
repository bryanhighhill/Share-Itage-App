import { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import EditButton from '../EditButton/EditButton';
import './RecipeCard.css';
 
const RecipeCard = ({recipe, favorite}) => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();    
    const initialCheckedArray = new Array(JSON.parse(recipe.instructions).length).fill(false);
    const [checkedInstruction, setCheckedInstruction] = useState(initialCheckedArray);
    const id = user.id;
    const history = useHistory();
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

    // const favoriteButton = () => {
    //     {favorites.length > 0
    //     ?
    //         <>
    //             {favorites.map((favRecipe, index) => {
    //                 return favRecipe.id;
    //             }).includes(recipe.id) ?
    //                 <button className="btn_sizeMed" onClick={removeFavorites}>Remove from favorites</button>
    //                 :   <button className="btn_sizeMed" onClick={addFavorites}>Add to favorites</button>
    //             }
    //         </>
    //     :
    //         <button className="btn_sizeMed" onClick={addFavorites}>Add to favorites</button>}
    // }

    return (
        <div className="recipe-card">

            <div className="recipe-title">
                <h2 onClick={() => history.push(`/recipe/${recipe.id}`)}>{recipe.title}</h2>
            </div>

            {/* <div className="ingredient-list">
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
            </div> */}
            
            {(user.admin || user.id === recipe.user_id)
                &&
                <EditButton recipe={recipe}/>
            }

        </div>
    )
};

export default RecipeCard;