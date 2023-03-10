import { useState } from 'react';
import { useDispatch } from 'react-redux';

const FamilyDisplay = ({ family, user }) => {
    const dispatch = useDispatch();
    const [deleteId, setDeleteID] = useState(0);


    const admin = (member) => {
        console.log('admin in change status: ', member)
        const adminStatus = !member.admin;
        dispatch({ type: 'CHANGE_ADMIN_STATUS', payload: {id: member.id, admin: adminStatus} });
        dispatch({ type: 'FETCH_FAMILY_MEMBERS', payload: user.family_id });
    }

    const openModal = (member) => {
        const modal = document.querySelector('.modal2');
        const overlay = document.querySelector('.overlay2');
        modal.classList.remove('hidden2'); //removes hidden class from modal
        overlay.classList.remove('hidden2'); //removes hidden class from overlay
        setDeleteID(member.id);
    }

    const closeModal = () => {
        const modal = document.querySelector('.modal2');
        const overlay = document.querySelector('.overlay2');
        modal.classList.add('hidden2'); //adds hidden class to modal
        overlay.classList.add('hidden2'); //adds hidden class to modal
        setDeleteID(0);
    }

    const clickHandler = () => {
        console.log('member to be deleted: ', deleteId);
        const member = {
            id: deleteId, 
            family_id: user.family_id,
        }
        dispatch({
        type: 'REMOVE_FAMILY_MEMBER', 
        payload: member
        })
        closeModal();
    }

        return (
            <div className="your-family">
                <h2>Your Family</h2>
                <div className="family-members-container">
                    {/* {family.length > 0 && */}
                        {/* <> */}
                            {family.map((member, index) => {
                                console.log('member in fam: ', member);
                                var options = { year: 'numeric', month: 'long', day: 'numeric' };
                                const date = new Date(member.registration_date);
                                
                                return (
                                    <div className={member.username != user.username ? "family-member-container" : "your-container"}>
                                        <b><u>{member.username}</u></b>
                                        <br />
                                        <br />
                                        <b>registered on:</b>
                                        <br />
                                        {(date.toLocaleDateString("en-US", options))} {/* date format string */}
                                        <br />
                                        <br />
                                        <b>status:</b>
                                        <br />
                                        {member.admin ? 'admin' : 'not admin'}
                                        <br />
                                        <br />
                                        <b>contact:</b> 
                                        <br />
                                        {member.email}
                                        <br />
                                        {member.username != user.username &&
                                            <>
                                                <br />
                                                <button className="btn_sizeMed" onClick={() => {admin(member)}}>{member.admin ? 'remove admin' : 'make admin'}</button>
                                                <br />
                                                <br />
                                                {/* <button className="btn_delete" onClick={() => removeFromFamily(member.id)}>Remove</button> */}
                                                <section className="modal2 hidden2"> {/* modal container */}
                                                    <div className="flex2">
                                                        <button onClick={closeModal} className="btn_close_modal2">X</button>
                                                    </div>
                                                    <div>
                                                        <h2>Are you sure you want to remove this user from your family?</h2>
                                                    </div>
                                                    <div className="modal_delete_container2">
                                                        <button onClick={clickHandler} className="btn_modal_delete2">Delete</button>
                                                    </div>
                                                </section>

                                                <div className="overlay2 hidden2"></div> {/* overlay element - dark blurred background when modal is open */}
                                                <button
                                                    className="btn_delete"
                                                    onClick={() => openModal(member)}
                                                >
                                                    Remove
                                                </button>
                                            </>
                                        }
                                    </div>
                                )
                            })}
                        {/* </>
                    } */}
                </div>
            </div>
        );
    };

export default FamilyDisplay;