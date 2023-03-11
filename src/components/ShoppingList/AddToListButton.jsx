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
    const [shoppingList, setShoppingList] = useState([]);


    useEffect(() => {
        dispatch({ type: 'FETCH_SHOPPING_LIST', payload: user.id });
    }, [user.id]);

    const addToList = (ingredient, index) => {
        console.log('shoppingList: ', list)
        const newShoppingList = [ ...list, ingredient];
        setShoppingList(newShoppingList);
        setAddedToList(true);
        setIngredientAdded(ingredient);
        setTimeout(() => {
            setAddedToList(false)
        }, 3000);
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
                    ?   <button onClick={() => history.push('/shoppinglist')} className="btn_addToList">view your shopping list</button>  //need to work on remove item from list
                    :   <button onClick={() => addToList(ingredient, index)} className="btn_addToList">+</button>
                }
                </>
            :   <button onClick={() => addToList(ingredient, index)} className="btn_addToList">+</button>
            }
        
        </>
    );
};

export default AddToListButton;