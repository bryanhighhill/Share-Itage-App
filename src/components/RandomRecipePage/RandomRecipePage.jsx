import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidePanel from '../SidePanel/SidePanel';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import UserComments from '../UserComments/UserComments';
import './RandomRecipe.css';


const RandomRecipePage = () => {
    const dispatch = useDispatch();
    const randomRecipe = useSelector(store => store.randomRecipe);
    const user = useSelector(store => store.user);
    const recipes = useSelector((store) => store.recipes);
    const favorites = useSelector((store) => store.setFavorites);
    const id = user.family_id;
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient:'', amount:''}]);
    const [instructions, setInstructions] = useState(['']);
    const [recipeId, setRecipeId] = useState(0);
    const [checkedInstruction, setCheckedInstruction] = useState(['']);
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [comment, setComment] = useState('');
    const page = 4;
    const [isLoading, setIsLoading] = useState(true);
    
    
    useEffect(() => {
        setIsLoading(true);
        dispatch({ type: 'FETCH_RECIPES', payload: user.family_id });
        dispatch({ type: 'FETCH_RANDOM_RECIPE', payload: id });
        dispatch({ type: 'FETCH_FAVORITES', payload: user.id });
    }, [id]);

    useEffect(() => {
        {setIngredients(randomRecipe.ingredients)}
        {setInstructions(randomRecipe.instructions)}
        {setTitle(randomRecipe.title)}
        {setRecipeId(randomRecipe.id)}
        setIsLoading(false);
    }, [randomRecipe])

    const refreshPage = () => {
        console.log('in refresh page');
        window.location.reload(false);
        dispatch({ type: 'FETCH_RECIPES', payload: user.family_id });
      };
    

    const onChange = (index) => {
        setCheckedInstruction(new Array(instructions.length).fill(false));
        const updatedArray = [...checkedInstruction];
        updatedArray[index] = !checkedInstruction[index];
        setCheckedInstruction(updatedArray);
    }

    const closeComments = () => {
        setCommentsVisible(false);
        setComment('');
    };

    const submitHandler = () => {
        const newComment = {recipe_id: Number(randomRecipe.id), comment}
        console.log('in submit comment with', newComment);
        if (comment.length === 0) {
            alert('comment cannot be blank!')
        } else 
        if (comment.length > 100) {
            alert('comment can only be 100 characters');
        } else
        dispatch({ type: 'POST_COMMENT', payload: newComment });
        setComment('');
    };

   if (isLoading) {
    return 'loading';
   }
    return (
        <div className="content-container">

            <div className="user-nav">
                <SidePanel page={page}/>
            </div>

            {recipes.length > 0
            ? <div className="random-recipe">
                <h1>Random Recipe</h1>
                {commentsVisible &&
                        <div className="user-remarks-div">
                            <UserComments id={randomRecipe.id}/>
                            {commentsVisible &&
                                <>
                                    <input 
                                        placeholder="add your comment here"
                                        className="comment-input"
                                        value={comment} 
                                        onChange={(event) => setComment(event.target.value)}>
                                    </input>
                                    <button className="btn_sizeMed" onClick={submitHandler}>Submit</button>
                                    &nbsp;&nbsp;&nbsp;
                                    <button className="btn_edit" onClick={closeComments}>Close</button>
                                </>
                            }
                        </div>
                    }
                    {!commentsVisible &&
                        <>
                            <button className="btn_sizeMed" onClick={() => setCommentsVisible(true)}>View Comments</button>
                            <br />
                            <br />
                        </>
                    }
                <div className="random-recipe-card">
                    <h2><u>{title}</u></h2>
                    {ingredients
                    ?   <div className="ingredients">
                            <h2>Ingredients</h2>
                            <ul>
                                {ingredients.map((ingredient, index) => {
                                    return(
                                        <li key={index}>{ingredient.ingredient} - {ingredient.amount}</li>
                                    )
                                })}  
                            </ul>
                        </div>
                    : null}
                    {instructions
                    ?   <div className="instructions">
                            <h2>Instructions</h2>
                            <ul>
                                {instructions.map((instruction, index) => {
                                    return(
                                        <>
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
                                        </>
                                    )
                                })}  
                            </ul>
                        </div>
                    : null}
                    <div className="fav-buttons">
                        <FavoritesButton recipeId={recipeId}/>
                    </div>
                </div>
                <div className="btn_random_div">
                    <button className="btn_random" onClick={refreshPage}><b>? ? ?</b></button>
                </div>
            </div>
            : <div>
                <h1>Random Recipe</h1>
                <br />
                <br />
                <h2>You have no recipes yet!</h2>
                <p>to add recipes, please click on "Add Recipe" in your user panel</p>
            </div>}
        </div>
    );
};

export default RandomRecipePage;