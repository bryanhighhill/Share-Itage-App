import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

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
            <h2>Congratulations, {user.username}, you have successfully created the family "
                {family.map(family => {
                    return (
                        family.name
                    )
                })}
                "!
            </h2>
            <br />
            <p>What would you like to do next?</p>
            <button className="btn" onClick={() => history.push('/user')}>View my family portal</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="btn">Invite others to join my family</button>
        </div>
    );
};

export default FamilyConfirmationPage;