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
    const [linkVisible, setLinkVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [copyText, setCopyText] = useState('');



    const generateToken = () => {
        const newToken = cryptoRandomString({length: 48, type: 'url-safe'});
        // setModalVisible(!modalVisible);
        setRegistrationLink(`localhost:3000/#/inviteduserregpage/${newToken}`);
        setLinkVisible(true);

        dispatch({
            type: 'POST_USER_INVITE', 
            payload: newToken,
        });
    };
 
    return (
        <div className="invite-container">
            
            <h2>Invite someone to join your family!</h2>
            Generate a registration link so that others can join your
            <br /> <b>Share-itage</b> family!
            <br />
            <button type="text" className="btn_invite" onClick={generateToken}>Generate New Registration Link</button>
            <br />
            <i>Registration links remain valid for 30 minutes</i>

            {linkVisible && 
                <p>
                    <b>New link:</b>
                    <br />
                    <input className="invitation-input" defaultValue={registrationLink} readOnly={true}></input>
                    <br />
                    <CopyToClipboard
                        text={registrationLink}
                        onCopy={() => {
                            setIsCopied(true);
                            setTimeout(() => {
                                setIsCopied(false);
                                setLinkVisible(false);
                            }, 5000);
                        }}
                    >
                        <button className="btn_sizeMed"> Copy link</button>
                    </CopyToClipboard>
                        {isCopied &&
                        <div className="link-copied">                            
                            <i>link copied!</i>
                        </div>
                        }
                </p>
            }
        </div>
    );
};

export default UserInvitation;