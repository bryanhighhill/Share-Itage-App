import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './FamilyConfirmationPage.css';

const FamilyConfirmationPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const family = useSelector((store) => store.family);
    const history = useHistory();
    const [familyCreated, setFamilyCreated] = useState(true);
    
    useEffect(() => {
        dispatch({ type: 'FETCH_FAMILY', payload: user.family_id });
    }, [user.id]);

    const userNavAdmin = () => {
        dispatch({ type: 'FETCH_FAMILY', payload: user.family_id });
        {family.name &&
            history.push('/admin');
        };
    };

    const userNavHome = () => {
        dispatch({ type: 'FETCH_FAMILY', payload: user.family_id });
        {family.name &&
            history.push('/user');
        };
    };
    
    return (
        <div className="confirmation-div">
            <div className="nav-next">
                Congratulations, <b>{user.username}</b>, you have created your family!
                <br />
                <br />
                What would you like to do next?
                <br />
                <br />
                <button className="btn_next" onClick={userNavHome}>View family portal</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="btn_next" onClick={userNavAdmin}>Invite others to join family</button>
                <br />
            </div>
        </div>    
   );
};

export default FamilyConfirmationPage;