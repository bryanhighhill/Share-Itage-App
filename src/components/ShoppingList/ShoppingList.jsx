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
    const [shoppingList, setShoppingList] = useState([...list]);
    const dragItem = useRef();
    const dragOverItem = useRef();
    const [draggableList, setDraggableList] = useState([list]);
   
    useEffect(() => {
        dispatch({ type: 'FETCH_SHOPPING_LIST', payload: user.id });
    }, [user.id]);

    // useEffect(() => {
    //     setShoppingList(list);
    // }, [user.id]);
  
    const removeFromList = (ingredient, index) => {
        const newShoppingList = [ ...list ];
        newShoppingList.splice(index, 1);
        dispatch({ type: 'POST_SHOPPING_LIST', payload: {newShoppingList, id: user.id} });
    };

    const onDragStart = (evemt, position) => {
        dragItem.current = position;
        console.log('on drag start innerHTML: ', event.target.innerHTML);
    };

    const onDragEnter = (event, position) => {
        dragOverItem.current = position;
        console.log('on drag enter innerHTML: ', event.target.innerHTML);
    };

    const drop = (event) => {
        const newShoppingList = [ ...list ];
        const dragItemContent = newShoppingList[dragItem.current];
        newShoppingList.splice(dragItem.current, 1);
        newShoppingList.splice(dragOverItem.current, 0, dragItemContent); 
        dragItem.current = null;
        dragOverItem.current = null;
        setDraggableList(newShoppingList);
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
                ?
                    <ul>
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
                : <h3>there's nothing on your grocery list yet!</h3>
                }
            </div>
        </div>
    );
};

export default ShoppingList;