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
    console.log('shopping list: ',shoppingList);
    const page = 6;
    const [shoppingList, setShoppingList] = useState([]);
  
    const removeFromList = (ingredient, index) => {
        list.splice(index, 1);
        setShoppingList(list);
        // setAddedToList(true);
        // setIngredientAdded(ingredient);
        // setTimeout(() => {
        //     setAddedToList(false)
        // }, 3000);
        dispatch({ type: 'POST_SHOPPING_LIST', payload: {list, id: user.id} });
        if (list.length == 0) {history.push('/recipes')}
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
                <h1>Shopping List</h1>
                
                {list.length > 0 &&
                
                    <>
                        {list.map((ingredient, index) => (
                            <div className="list-item">
                                <div key={index} className="item">
                                    {ingredient}
                                </div>
                                <button onClick={() => removeFromList(ingredient, index)}className="btn_removeFromList">X</button>
                            </div>
                        ))}
                    </>
            
                }
            </div>
        </div>
    );
};

export default ShoppingList;