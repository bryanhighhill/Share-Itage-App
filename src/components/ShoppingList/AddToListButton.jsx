import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ShoppingList.css';

const AddToListButton = ({ ingredient, index, list }) => {
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [addedToList, setAddedToList] = useState(false);
    const [ingredientAdded, setIngredientAdded] = useState('');
    const [listChange, setListChange] = useState([]);


    useEffect(() => {
        dispatch({ type: 'FETCH_SHOPPING_LIST', payload: user.id });
    }, [listChange]);

    const addToList = (ingredient, index) => {
        const newShoppingList = [ ...list, ingredient];
        setAddedToList(true);
        setIngredientAdded(ingredient);
        setTimeout(() => {
            setAddedToList(false)
        }, 3000);
        setListChange(newShoppingList);
        dispatch({ type: 'POST_SHOPPING_LIST', payload: {newShoppingList, id: user.id} });
    };

    const removeFromList = (ingredient, index) => {
        const newShoppingList = [ ...list ];
        newShoppingList.splice(index, 1);
        setListChange(newShoppingList);
        dispatch({ type: 'POST_SHOPPING_LIST', payload: {newShoppingList, id: user.id} });
    };


    return (
        <>
            {list
            ?
                <>
                {list.map((item, index) => {
                    return item;
                }).includes(ingredient) 
                    ?   <button onClick={() => history.push('/shoppinglist')} className="btn_addToList">on shopping list</button>  //need to work on remove item from list
                    :   <button onClick={() => addToList(ingredient, index)} className="btn_addToList">+</button> 
                }
                 <div className="added-to-list">{addedToList && <i>added!</i>}</div>
                </>
            :   <button onClick={() => addToList(ingredient, index)} className="btn_addToList">+</button>
            }
            
        
        </>
    );
};

export default AddToListButton;