import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';


const ShoppingList = () => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const shoppingList = user.shopping_list;
    console.log('user', user)

    

    return(
        <>
            <h2>shopping list</h2>
            
            {user.shoppingList.length > 0 &&
                <ul>
                    {shoppingList.map((item, index) => (
                        <li>{item}</li>
                    ))}
                </ul>
            }
        </>
    );
};

export default ShoppingList;