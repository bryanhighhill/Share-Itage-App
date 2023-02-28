import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function EditButton({ recipe }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const clickHandler = (recipe) => {
      dispatch({
        type: 'FETCH_RECIPE_DATA', 
        payload: recipe.id
      })
        history.push(`/edit/${recipe.id}`)
    }


  return (
    <button
      className="edit-btn"
      onClick={() => clickHandler(recipe)}
    >
        Edit
    </button>
  );
}

export default EditButton;
