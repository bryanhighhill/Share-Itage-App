import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import UserPage from '../UserPage/UserPage';

const CreateFamilyPage = () => {
    const [familyName, setFamilyName] = useState('');
    
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);

    const onSubmit = (event) => {
        event.preventDefault();
        const newFamily = {
            name: familyName,
            id: user.id,
        }
        
        //add conditional to check that family name is not blank and that it is a unique family name in db

        dispatch({
            type: 'POST_FAMILY_NAME',
            payload: newFamily,
        });
        setFamilyName('');
        history.push('/user');
    }

    return (
        <div>
            <div className="user-nav">
                {/* <UserPage /> */}
            </div>
            <div className="page-content-div">
                <h3>create family page</h3>
                <form onSubmit={onSubmit}>
                <label htmlFor="family-name"><b>Family Name</b></label>
                        <br />
                        <input
                            id="family-name"
                            name="family-name"
                            value={familyName}
                            placeholder="What's your family name?"
                            onChange={(event) => setFamilyName(event.target.value)}
                        />

                        <button
                            type="submit"
                            className="submit-family-btn"
                        >
                            Create Family
                        </button>
                </form>
            </div>
        </div>
    )
}

export default CreateFamilyPage;