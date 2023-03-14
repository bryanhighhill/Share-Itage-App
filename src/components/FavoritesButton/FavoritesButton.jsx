import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const FavoritesButton = ({recipeId}) => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const favorites = useSelector((store) => store.setFavorites);
    const id = user.family_id;
    
    useEffect(() => {
        dispatch({ type: 'FETCH_FAVORITES', payload: user.id });
    }, [id]);
    

    const addFavorites = () => {
        console.log('id in add fav: ', recipeId);
        dispatch({
            type: 'ADD_FAVORITE', 
            payload: {recipe_id: recipeId}
        });
    };

    const removeFavorites = () => {
        const favoriteRecipe = {
            recipe_id: recipeId,
        }
        dispatch({
            type: 'REMOVE_FAVORITE',
            payload: favoriteRecipe,
        });
    };

    return(
        <>
            {favorites.length > 0
                ?
                    <>
                        {favorites.map((favRecipe, index) => {
                            return favRecipe.id;
                        }).includes(recipeId) 
                            ?   <button className="btn_sizeMed" onClick={removeFavorites}>Remove from favorites</button>
                            :   <button className="btn_sizeMed" onClick={addFavorites}>Add to favorites</button>
                        }
                    </>
                :   <button className="btn_sizeMed" onClick={addFavorites}>Add to favorites</button>}
        </>
    );
};

export default FavoritesButton;