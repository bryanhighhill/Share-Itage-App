import UserPage from '../UserPage/UserPage';

const AdminPage = () => {
    const page = 5;
    return (
        <>
            <div className="user-nav">
                <UserPage page={page}/>
            </div> {/*end "user-nav" div */}
            <div className="admin-container">
            <h2>ADMIN PANEL</h2>
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
            </div>
        </>
    )
}

export default AdminPage;