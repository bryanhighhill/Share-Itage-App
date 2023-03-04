import React, { useEffect, useState } from 'react';
import UserPage from '../UserPage/UserPage';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import './RecipePage.css';


const RecipePage = () => {
    const dispatch = useDispatch();
    const selectedRecipe = useSelector(store => store.selectedRecipe);
    const user = useSelector(store => store.user);
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient:'', amount:''}]);
    const [instructions, setInstructions] = useState(['']);
    const [checkedInstruction, setCheckedInstruction] = useState(['']);
    const favorites = useSelector((store) => store.setFavorites);
    const history = useHistory();
    
    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPE_DATA', payload: id });
    }, [id]);

    useEffect(() => {
        dispatch({ type: 'FETCH_FAVORITES', payload: user.id });
    }, [id]);
    
    useEffect(() => {
        setIngredients(selectedRecipe.ingredients);
        setInstructions(selectedRecipe.instructions);
        setTitle(selectedRecipe.title);
    }, [selectedRecipe]);

    const onChange = (index) => {
        setCheckedInstruction(new Array(instructions.length).fill(false));
        const updatedArray = [...checkedInstruction];
        updatedArray[index] = !checkedInstruction[index];
        setCheckedInstruction(updatedArray);
    };

    return (
        <div className="content-container">

            <div className="user-nav">
                <UserPage />
            </div>

            <div>
                <div className="recipe-page">
                    <h1><u>{title}</u></h1>
                    {ingredients
                    ?   <div className="ingredients">
                            <label className="small-label" htmlFor="ingredients"><b>Ingredients</b></label>
                            <ul>
                                {ingredients.map((ingredient, index) => {
                                    return(
                                        <li key={index}><i>{ingredient.amount}</i>&nbsp;&nbsp;&nbsp;&nbsp;{ingredient.ingredient}</li>
                                    );
                                })} 
                            </ul>
                        </div>
                    : null}
                    
                    {instructions
                    ?   <div className="instructions">
                            <label className="small-label" htmlFor="instructions"><b>Instructions</b></label>
                            <ul>
                                {instructions.map((instruction, index) => {
                                    return(
                                        <div className="instruct">
                                            <input
                                                key={`checkbox-${index}`}
                                                type="checkbox"
                                                id={`custom-checkbox-${index}`}
                                                name={instruction}
                                                value={instruction}
                                                onChange={() => onChange(index)}
                                            />
                                            <label className={!checkedInstruction[index] ? "checked-instruction-false" : "checked-instruction-true"} htmlFor={`custom-checkbox-${index}`}>{instruction}</label>
                                            <br />
                                        </div>
                                    );
                                })}
                            </ul>
                        </div>
                    : null}
                    
                    <div className="fav-buttons">
                        <FavoritesButton recipeId={Number(id)}/>
                    </div>
                </div>
                <br />
                <div className="nav-buttons">
                    <button className="btn_sizeMed" onClick={() => {history.goBack()}}>Back</button>
                    
                        {(user.admin || user.id === selectedRecipe.user_id) &&
                            <>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <EditButton id={id}/>
                            </>
                        }
                        {user.admin  &&
                            <>
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <DeleteButton id={id}/>
                            </>
                        }                        
                </div>
            </div>
        </div>
    );
};

export default RecipePage;