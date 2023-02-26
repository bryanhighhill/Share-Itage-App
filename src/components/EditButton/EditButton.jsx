import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function EditButton({ recipe }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const clickHandler = (recipe) => {
        history.push(`/edit/${recipe.id}`)
    }


  return (
    <button
      // is passed to it from it's parents through React props
      className="edit-btn"
      onClick={() => clickHandler(recipe)}
    >
        Edit
    </button>
  );
}

export default EditButton;
