import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './ShoppingList.css';

const AddToListButton = ({ ingredient, index }) => {
    const list = useSelector(store => store.shoppingList);
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const [addedToList, setAddedToList] = useState(false);
    const [ingredientAdded, setIngredientAdded] = useState('');
    const [shoppingList, setShoppingList] = useState([]);


    useEffect(() => {
        dispatch({ type: 'FETCH_SHOPPING_LIST', payload: user.id });
    }, [user.id]);

    // const isInList = () => {
    //     {list.map((item, index) => {
    //         return item;
    //     }).includes(ingredient) 
    //         ?   <button className="btn_sizeMed" onClick={removeFavorites}>Remove from favorites</button>
    //         :   <button className="btn_sizeMed" onClick={addFavorites}>Add to favorites</button>
    //     }
    //     return
    // }

       // const addToList = (ingredient, index) => {
    //     const newShoppingList = [ ...shoppingList, ingredient];
    //     setShoppingList(newShoppingList);
    //     setAddedToList(true);
    //     setIngredientAdded(ingredient);
    //     setTimeout(() => {
    //         setAddedToList(false)
    //     }, 3000);
    //     dispatch({ type: 'POST_SHOPPING_LIST', payload: {newShoppingList, id: user.id} });
    // };

    const addToList = (ingredient, index) => {
        console.log('shoppingList: ', shoppingList)
        const newShoppingList = [ ...shoppingList, ingredient];
        setShoppingList(newShoppingList);
        setAddedToList(true);
        setIngredientAdded(ingredient);
        setTimeout(() => {
            setAddedToList(false)
        }, 3000);
        dispatch({ type: 'POST_SHOPPING_LIST', payload: {newShoppingList, id: user.id} });
    };

    // const removeFromList = (ingredient, index) => {
    //     const newShoppingList = [ ...shoppingList ]
    //     newShoppingList.splice(index, 1);
    //     setShoppingList(newShoppingList);
    //     // setAddedToList(true);
    //     // setIngredientAdded(ingredient);
    //     // setTimeout(() => {
    //     //     setAddedToList(false)
    //     // }, 3000);
    //     dispatch({ type: 'POST_SHOPPING_LIST', payload: {list, id: user.id} });
    //     if (list.length == 0) {history.push('/recipes')}
    // };

    return (
        <>
            {list
            ?
                <>
                {shoppingList.map((item, index) => {
                    return item;
                }).includes(ingredient) 
                    ?   <button onClick={() => addToList(ingredient, index)} className="btn_addToList">-</button>  //need to work on remove item from list
                    :   <button onClick={() => addToList(ingredient, index)} className="btn_addToList">+</button>
                }
                </>
            :   <button onClick={() => addToList(ingredient, index)} className="btn_addToList">+</button>
            }
        
        </>
    );
};

export default AddToListButton;