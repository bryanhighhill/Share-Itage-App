import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import UserPage from '../UserPage/UserPage';

const AdminPage = () => {
    const user = useSelector(store => store.user);
    const family =useSelector(store => store.family);
    const dispatch = useDispatch();
    const page = 5;

    console.log('family on admin page', family);

    useEffect(() => {
        console.log('user family id: ', user.family_id);
        dispatch({ type: 'FETCH_FAMILY_MEMBERS', payload: user.family_id });
    }, [user.family_id]);

    const admin = (member) => {
        console.log('admin in change status: ', member)
        const adminStatus = !member.admin;
        dispatch({ type: 'CHANGE_ADMIN_STATUS', payload: {id: member.id, admin: adminStatus} });
        dispatch({ type: 'FETCH_FAMILY_MEMBERS', payload: user.family_id });
    }

    return (
        <div className="content-container">
            <div className="user-nav">
                <UserPage page={page}/>
            </div> {/*end "user-nav" div */}
            <div className="admin-container">
                <h1>Admin Panel</h1>
                <br />
                <br />
                <div className="page-description">
                    If the logged-in user has admin status they are able to see and interact with the "Admin Panel" button located in the user panel
                    <br />
                    (the button that brought you to this page)
                    <br />
                    <br />
                    Welcome to the few...the elite...the "admin" 
                    <br />
                    As an admin, you're able to do things that the regular user cannot!
                    <br />
                    Admins can:
                    <ul>
                        <li><b>Edit a recipe:</b> an option to edit is included on every recipe card, which allows admin to edit the title, ingredients, amounts, and instructions of that recipe</li>
                        <li><b>Delete a recipe:</b> an option to delete is included on every recipe card, which allows admin to delete that recipe</li>
                        <li><b>Add additional admins:</b> on this page, an admin will be able to view all users in their family, and assign any of them admin status</li>
                    </ul>
                </div>

                {family.map((member, index) => {
                    return (
                        <div className="famly-member-container">
                                <b><u>{member.username}</u></b>
                                <br />
                                <b>registered on:</b> {member.registration_date}
                                <br />
                                <b>status:</b> {member.admin ? 'admin' : 'not admin'}
                                <br />
                                {(member.username != user.username) &&
                                    <button className="btn_sizeMed" onClick={() => {admin(member)}}>{member.admin ? 'remove admin' : 'make admin'}</button>
                                }
                                <br />
                                <br />
                        </div>
                    )
                
                })}
            </div>
        </div>
    )
}

export default AdminPage;