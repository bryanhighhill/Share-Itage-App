import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './DeleteConfirmationModal.css';

const DeleteButton = ({ id }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);
    
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');

    const openModal = () => {
        modal.classList.remove('hidden'); //remove hidden class from modal
        overlay.classList.remove('hidden'); //remove hidden class from overlay
    };

    const closeModal = () => {
        modal.classList.add('hidden'); //add hidden class to modal
        overlay.classList.add('hidden'); //add hidden class to modal
    };

    const clickHandler = (id) => {
        const recipe = {
            id, 
            family_id: user.family_id,
        }
        dispatch({
        type: 'REMOVE_RECIPE', 
        payload: recipe
        })
        history.push('/findrecipe');
    };

    return (
        <>
            <section className="modal hidden">
                <div className="flex">
                    <button onClick={closeModal} className="btn_close_modal">X</button>
                </div>
                <div>
                    <h2>Are you sure you want to delete this recipe?</h2>
                </div>
                <div className="modal_delete_container">
                    <button onClick={() => clickHandler(id)} className="btn_modal_delete">Delete</button>
                </div>
            </section>

            <div className="overlay hidden"></div> {/* overlay element - dark blurred background when modal is open */}
            <button
                className="btn_delete"
                onClick={openModal}
            >
                Delete
            </button>
        </>
    );
};
    
export default DeleteButton;