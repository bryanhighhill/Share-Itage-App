import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import SidePanel from '../SidePanel/SidePanel';
import UserInvitation from '../UserInvitation/UserInvitation';
import FamilyDisplay from '../FamilyDisplay/FamilyDisplay';
import './DeleteMemberButton.css';
import './AdminPage.css';

const AdminPage = () => {
    const user = useSelector(store => store.user);
    const family = useSelector(store => store.familyMember);
    const dispatch = useDispatch();
    const page = 5;
    console.log('family on admin page: ', family);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        dispatch({ type: 'FETCH_FAMILY_MEMBERS', payload: user.family_id });
        setIsLoading(false);
    }, [user.id]);

    if (user.admin) {
        return (
            <div className="content-container">
                <div className="user-nav">
                    <SidePanel page={page}/>
                </div>

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

                    {family.length > 0 &&
                        <FamilyDisplay family={family} user={user} />
                    }
                </div>
            </div>
        );
    }

    return (
        <h2>This page does not exist!</h2>
    );
};

export default AdminPage;