import DeleteButton from '../DeleteButton/DeleteButton';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({recipe}) => {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const openModalBtn = document.querySelector('.btn_open');
    const closeModalBtn = document.querySelector('.btn_close');

    const openModal = () => {
        modal.classList.remove('hidden'); //removes hidden class from modal
        overlay.classList.remove('hidden'); //removes hidden class from overlay
    }

    const closeModal = () => {
        modal.classList.add('hidden'); //adds hidden class to modal
        overlay.classList.add('hidden'); //adds hidden class to modal
    }

    return (
        <div className="modal-container">
            <section className="modal hidden"> {/* modal container */}
                <div className="flex">
                    <button onClick={closeModal} className="btn_close_modal">X</button>
                </div>
                <div>
                    <h2>Are you sure you want to delete this recipe?</h2>
                </div>
                <button className="btn_delete">Delete</button>
            </section>

            <div className="overlay hidden"></div> {/* overlay element - dark blurred background when modal is open */}
            <DeleteButton />
            <button onClick={openModal} className="btn_open">Open Modal</button> {/* button that opens modal */}
        </div>
    );
};

export default DeleteConfirmationModal;