import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cryptoRandomString from 'crypto-random-string';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './UserInvitation.css';

const UserInvitation = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [registrationLink, setRegistrationLink] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [copyText, setCopyText] = useState('');



    const generateToken = () => {
        const newToken = cryptoRandomString({length: 48, type: 'url-safe'});
        setModalVisible(!modalVisible);
        setRegistrationLink(`localhost:3000/#/inviteduserregpage/${newToken}`);

        dispatch({
            type: 'POST_USER_INVITE', 
            payload: newToken,
        });
    };

    const closeModal = () => {
        setModalVisible(!modalVisible);
    }

    
    return (
        <div className ="modal-conatiner">
            <div className="user-invitation-container">
                <h2>Want to invite someone to join your family?</h2>
                <br />
                click the button below to receive a unique registration link
                <br />
                <br />
            </div>

            <section className={modalVisible ? "modal" : "hidden"}> {/* modal container */}
                <div className="flex">
                    <button onClick={closeModal} className="btn_close_modal">X</button>
                </div>
                <div className="link-div">
                    <h2>Please copy the following link:</h2>
                    {registrationLink}
                </div>
                <div className="modal_delete_container">
                    <CopyToClipboard
                        text={registrationLink}
                        onCopy={() => {
                            setIsCopied(true);
                            setTimeout(() => {
                                setIsCopied(false);
                            }, 1000);
                        }}
                    >
                        <button className="btn_modal_copy" onClick={() => alert('link copied!')}> Copy link</button>
                    </CopyToClipboard>
                </div>
            </section>

                <div className={modalVisible ? "overlay" : "hidden"}></div> {/* overlay element - dark blurred background when modal is open */}
                <button onClick = {generateToken}>Generate New Registration Link</button>
        </div>
    );
};

export default UserInvitation;