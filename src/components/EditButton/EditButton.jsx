import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const EditButton = ({ id }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const clickHandler = (id) => {
      dispatch({
        type: 'FETCH_RECIPE_DATA', 
        payload: id
      })
        history.push(`/edit/${id}`);
    }


  return (
    <button
      className="btn_edit"
      onClick={() => clickHandler(id)}
    >
        Edit
    </button>
  );
}

export default EditButton;
