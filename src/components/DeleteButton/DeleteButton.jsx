import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const DeleteButton = ({id}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);

    const clickHandler = (id) => {
        const recipe = {
            id, 
            family_id: user.family_id
        }
        dispatch({
        type: 'REMOVE_RECIPE', 
        payload: recipe
        })
        history.push('/findrecipe');
    }

    return (
    <button
        className="btn_delete"
        onClick={() => clickHandler(id)}
    >
        Delete
    </button>
    );
};
    
export default DeleteButton;