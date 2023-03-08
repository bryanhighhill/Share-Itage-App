import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserComments = ({id}) => {
    const dispatch = useDispatch();
    const userRemarks = useSelector((store) => store.userRemarks);

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_REMARKS', payload: id });
    }, [id]);

    return (
        <div>
        {userRemarks.length > 0 
        ? <>
            {userRemarks.map((comment, index) => {
                return (
                    <div className="comment">
                        <b>{comment.username}</b>: "{comment.comment}"
                    </div>
                )
            })}
        </>
        : <p>no comments yet!</p>}
        </div>
    )
}

export default UserComments;