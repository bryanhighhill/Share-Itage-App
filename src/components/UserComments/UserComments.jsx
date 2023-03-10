import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './UserComments.css';

const UserComments = ({id}) => {
    const [deleteConfVisible, setDeleteConfVisible] = useState(false);
    const dispatch = useDispatch();
    const userRemarks = useSelector((store) => store.userRemarks);
    const user = useSelector((store) => store.user);

    useEffect(() => {
        dispatch({ type: 'FETCH_USER_REMARKS', payload: id });
    }, [id]);

    const deleteComment = (commentId) => {
        const comment = {recipe_id: Number(id), id: commentId}
        dispatch({ type: 'DELETE_COMMENT', payload: comment});
    };

    return (
        <div>
            {userRemarks.length > 0 
            ? <div className="comments-container">
                {userRemarks.map((comment, index) => {
                    return (
                        <div className="comment">
                            <b>{comment.username}</b>: "{comment.comment}"
                            {(!deleteConfVisible ) 
                            ? <>
                                {(user.admin || user.username == comment.username) &&
                                    <button className="btn_commentDelete" onClick={() => deleteComment(comment.id)}>X</button>   
                            } </>
                            : <>
                                <section>are you sure you want to delete this comment?</section>
                                <button>Delete</button>
                                <button>Cancel</button>
                            </>
                            }
                        </div>
                    )
                })}
            </div>
            : <p>no comments yet!</p>}
        </div>
    );
};

export default UserComments;