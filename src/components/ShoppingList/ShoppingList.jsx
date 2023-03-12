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
    const [shoppingList, setShoppingList] = useState([]);
  
    const removeFromList = (ingredient, index) => {
        const newShoppingList = [ ...list ];
        newShoppingList.splice(index, 1);
        dispatch({ type: 'POST_SHOPPING_LIST', payload: {newShoppingList, id: user.id} });
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_SHOPPING_LIST', payload: user.id });
    }, [user.id]);
    

    return(
        <div className="content-container">

            <div className="user-nav">
                <SidePanel page={page}/>
            </div>

            <div className="shopping-list-container">
                <h1><u>Shopping List</u></h1>
                
                {list.length > 0 
                ?
                    <ul>
                        {list.map((ingredient, index) => (
                            <div
                                key={index}
                                className="list-item" 
                            >
                                {ingredient}
                                <button onClick={() => removeFromList(ingredient, index)}className="btn_removeFromList">X</button>
                            </div>
                        ))}
                    </ul>
                : <h3>there's nothing on your shopping list yet!</h3>
                }
            </div>
        </div>
    );
};

export default ShoppingList;