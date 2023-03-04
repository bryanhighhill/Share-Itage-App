import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import './FamilyConfirmationPage.css';

const FamilyConfirmationPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const family = useSelector((store) => store.family);
    const history = useHistory();
    
    useEffect(() => {
        dispatch({ type: 'FETCH_FAMILY', payload: user.family_id });
    }, []);

    return(
        <div className="confirmation-div">
            <div className="congrats">
                Congratulations, {user.username}, you have successfully created the family
                <br />
                <h1>"{family.name}"</h1>
            <br />
            What would you like to do next?
            </div>
            <br />
            <button className="btn_next" onClick={() => history.push('/user')}>View family portal</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn_next">Invite others to join family</button>
        </div>
    );
};

export default FamilyConfirmationPage;