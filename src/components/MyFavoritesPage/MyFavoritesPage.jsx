import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UserPage from '../UserPage/UserPage';
import RecipeCard from '../RecipeCard/RecipeCard';

const MyFavoritesPage = () => {
    const dispatch = useDispatch();
    const History = useHistory();
    const user = useSelector(store => store.user);
    const favorites = useSelector((store) => store.setFavorites);
    const id = user.id;
    const page = 2;
    
    useEffect(() => {
        dispatch({ type: 'FETCH_FAVORITES', payload: id });
    }, [id]);


    return (
        <div className="content-container">
            <div className="user-nav">
                <UserPage page={page}/>
            </div>
            {favorites
            ? <div className="favorites-recipe-grid">
                <h1>My Favorites</h1>
                <br />
                <br />
                {favorites.map((recipe, index) => {
                    return (
                        <RecipeCard recipe={recipe} favorite="true"/>
                    );
                })}
            </div>
            : 'You have no favorites yet!'}
        </div>
    )
}

export default MyFavoritesPage;