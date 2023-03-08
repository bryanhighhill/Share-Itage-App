import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import UserPage from '../UserPage/UserPage';
import SidePanel from '../SidePanel/SidePanel';
import UserInvitation from '../UserInvitation/UserInvitation';
import './AdminPage.css';

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


    if (user.admin) {
        return (
            <div className="content-container">
                <div className="user-nav">
                    <SidePanel page={page}/>
                </div> {/*end "user-nav" div */}
                <div className="admin-container">
                    <h1>Admin Panel</h1>
                    <div className="page-description">
                        Welcome to the few...the elite...the "admin" 
                        <br />
                        If the logged-in user has admin status they're able to see and interact with the "Admin Panel" button located in the user panel
                        <br />
                        (the button that brought you to this page)
                        <br />
                        As an admin, you're able to do things that the regular user cannot!
                        <br />
                        <h3>Admins can:</h3>
                        <ul>
                            <li><b>Edit a recipe:</b> an option to edit is included on every recipe card, which allows admin to edit the title, ingredients, amounts, 
                                <br />and instructions of that recipe
                                <br />
                                <i>please note:</i> the user who originally created the recipe card can also make edits to it
                            </li>
                            <li><b>Delete a recipe:</b> an option to delete is included on every recipe card, which allows admin to delete that recipe</li>
                            <li><b>Add additional admins:</b> all users in your family are shown below, and you have the ability to define their admin status</li>
                            <li><b>Delete Family Members:</b> you have an option to delete family members below</li>
                            <li><b>Generate Family Invites:</b> On this page you'll find an option to generate a unique registration link which you can send out to someone who you'd like to join your family</li>
                        </ul>
                    </div>
                    <div className="user-invitation-container">
                        <UserInvitation />

                    </div>
                    <div className="your-family"></div>
                    <h2>Your Family</h2>
                    <div className="family-members-container">
                        {family.length > 0
                        ?   <>
                                {family.map((member, index) => {
                                    var options = { year: 'numeric', month: 'long', day: 'numeric' };
                                    const date = new Date(member.registration_date);

                                    return (
                                        <>
                                            <div className={member.username != user.username ? "family-member-container" : "your-container"}>
                                                <b><u>{member.username}</u></b>
                                                <br />
                                                <br />
                                                <b>registered on:</b>
                                                <br />
                                                {(date.toLocaleDateString("en-US", options))} {/* date format string */}
                                                <br />
                                                <br />
                                                <b>status:</b>
                                                <br />
                                                {member.admin ? 'admin' : 'not admin'}
                                                <br />
                                                <br />
                                                <b>contact:</b> 
                                                <br />
                                                {member.email}
                                                <br />
                                                {member.username != user.username &&
                                                    <>
                                                        <br />
                                                        <button className="btn_sizeMed" onClick={() => {admin(member)}}>{member.admin ? 'remove admin' : 'make admin'}</button>
                                                    </>
                                                }
                                                <br />
                                                <br />
                                            </div>
                                        </>
                                    )
                                })}
                            </>
                        : null}
                    </div>
                </div>
            </div>
        )
    }
    return (
    <h2>This page does not exist!</h2>
    )
};

export default AdminPage;