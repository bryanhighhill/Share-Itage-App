import React, { useEffect, useState } from 'react';
import SidePanel from '../SidePanel/SidePanel';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import EditButton from '../EditButton/EditButton';
import DeleteButton from '../DeleteButton/DeleteButton';
import FavoritesButton from '../FavoritesButton/FavoritesButton';
import UserComments from '../UserComments/UserComments';
import AddToListButton from '../ShoppingList/AddToListButton.jsx';
import './RecipePage.css';


const RecipePage = () => {
    const dispatch = useDispatch();
    const selectedRecipe = useSelector(store => store.selectedRecipe);
    const user = useSelector(store => store.user);
    const list = useSelector(store => store.shoppingList);
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient:'', amount:''}]);
    const [instructions, setInstructions] = useState(['']);
    const [checkedInstruction, setCheckedInstruction] = useState(['']);
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [comment, setComment] = useState('');
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_RECIPE_DATA', payload: id });
    }, [id]);

    useEffect(() => {
        dispatch({ type: 'FETCH_FAVORITES', payload: user.id });
    }, [id]);
    
    useEffect(() => {
        dispatch({ type: 'FETCH_SHOPPING_LIST', payload: user.id });
    }, [user.id]);
    
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

    const closeComments = () => {
        setCommentsVisible(false);
        setComment('');
    };

    const submitHandler = () => {
        const newComment = {recipe_id: Number(id), comment};
        if (comment.length === 0) {
            alert('comment cannot be blank!')
        } else 
        if (comment.length > 100) {
            alert('comment can only be 100 characters');
        } else
        dispatch({ type: 'POST_COMMENT', payload: newComment });
        setComment('');
    };

    return (
        <div className="content-container">

            <div className="user-nav">
                <SidePanel />
            </div>

            <div>
                {commentsVisible &&
                    <div className="user-remarks-div">
                        <UserComments id={id}/>
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
                    </>
                }
                <br />
                <br />
                    
                <div className="recipe-page">
                    <div className="white-fill">
                        <h1><u>{title}</u></h1>
                        {ingredients &&
                            <div className="ingredients">
                                <span><h2>Ingredients</h2></span>
                                
                                <ul>
                                    {ingredients.map((ingredient, index) => (
                                        <li key={`ingredient-${ingredient.ingredient}-${ingredient.amount}`}>
                                            {ingredient.ingredient} - {ingredient.amount}
                                            <AddToListButton ingredient={ingredient.ingredient} index={index} list={list}/>
                                        </li>
                                    ))} 
                                </ul>
                                    
                            </div>
                        }
                        
                        {instructions &&
                            <div className="instructions">
                                <span><h2>Instructions</h2></span>
                                <ul>
                                    {instructions.map((instruction, index) => (
                                        <div className="instruct">
                                            <input
                                                key={`instruction-${instruction}`}
                                                type="checkbox"
                                                id={`custom-checkbox-${index}`}
                                                name={instruction}
                                                value={instruction}
                                                maxLength={100}
                                                onChange={() => onChange(index)}
                                            />
                                            <label className={!checkedInstruction[index] ? "checked-instruction-false" : "checked-instruction-true"} htmlFor={`custom-checkbox-${index}`}>{instruction}</label>
                                            <br />
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div>
                    
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