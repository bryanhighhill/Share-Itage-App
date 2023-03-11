import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';


const ShoppingList = () => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const shoppingList = useSelector(store => store.shoppingList);
    console.log('shopping list: ',shoppingList);
    // const dragItem = useRef();
    // const dragOverItem = useRef();
    // const [list, setList] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);
    
    // const dragStart = (event, position) => {
    //     dragItem.current = position;
    // };

    // const dragEnter = (event, position) => {
    //     dragOverItem.current = position;
    // };

    // const drop = (event) => {
    //     const copyListItems = [ ...list ];
    //     const dragItemContent = copyListItems[dragItem.current];
    //     copyListItems.splice(dragItem.current, 1);
    //     copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    //     dragItem.current = null;
    //     dragOverItem.current = null;
    //     setList(copyListItems);
    // };

    useEffect(() => {
        dispatch({ type: 'FETCH_SHOPPING_LIST', payload: user.id });
    }, [user.id]);

    

    return(
        <>
            <h2>shopping list</h2>
            
            {shoppingList &&
                <>
                    {shoppingList.map((item, index) => (
                        <div 
                            key={index}
                        >
                            {item}
                        </div>
                    ))}
                </>
            }
        </>
    );
};

export default ShoppingList;