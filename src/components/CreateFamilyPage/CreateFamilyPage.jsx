import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './CreateFamilyPage.css';

const CreateFamilyPage = () => {
    const [name, setName] = useState('');
    
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((store) => store.user);

    const onSubmit = (event) => {
        event.preventDefault();
        //TODO: add conditional to check that family name is not blank and that it is a unique family name in db <---------------------------
        //dispatch new family name to redux saga along with user id so that user_family_id can be updated
        dispatch({
            type: 'POST_FAMILY_NAME',
            payload: {
                name,
                user_id: user.id,
            },
        });

        //clear name
        setName('');
        //send user to UserPage
        history.push('/familyconfirmation');
    };

    return (
        <div>
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        id="name"
                        name="name"
                        value={name}
                        placeholder="What's your family name?"
                        className="family-input"
                        required
                        onChange={(event) => setName(event.target.value)}
                    />
                    <br />
                    <br />
                    <button
                        type="submit"
                        className="btn_save"
                    >
                        Create Family
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateFamilyPage;