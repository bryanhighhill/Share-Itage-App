import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import SidePanel from '../SidePanel/SidePanel';
import './ShoppingList.css';


const ShoppingList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(store => store.user);
    const list = useSelector(store => store.shoppingList);
    const page = 6;
   
    useEffect(() => {
        dispatch({ type: 'FETCH_SHOPPING_LIST', payload: user.id });
    }, [user.id]);
  
    const removeFromList = (ingredient, index) => {
        const newShoppingList = [ ...list ];
        newShoppingList.splice(index, 1);
        dispatch({ type: 'POST_SHOPPING_LIST', payload: {newShoppingList, id: user.id} });
    };

    const clearList = () => {
        const newShoppingList = [];
        dispatch({ type: 'POST_SHOPPING_LIST', payload: {newShoppingList, id: user.id} });
    };

    return(
        <div className="content-container">

            <div className="user-nav">
                <SidePanel page={page}/>
            </div>

            <div className="shopping-list-container">
                <div className="clear-list-button">
                    <button className="btn_delete" onClick={clearList}>Clear list</button>
                </div>
                <h1 className="shopping-list-header"><u>Grocery List</u></h1>
                
                {list.length > 0 
                    ?   <ul>
                            {list.map((ingredient, index) => (
                                <div
                                    key={index}
                                    className="list-item"
                                >
                                    <button onClick={() => removeFromList(ingredient, index)}className="btn_removeFromList">X</button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;{ingredient}
                                </div>
                            ))}
                        </ul>
                    :   <h3>there's nothing on your grocery list yet!</h3>
                }
            </div>
            <div></div> {/* empty div for page columns */}
            
            <div className="nav-button-groceries">
                <button className="btn_sizeMed" onClick={() => {history.goBack()}}>Back</button>
            </div>
        </div>
    );
};

export default ShoppingList;