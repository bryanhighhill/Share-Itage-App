import UserPage from '../UserPage/UserPage';

const MyFavoritesPage = () => {
    return (
        <div>
            <div className="user-nav">
                <UserPage />
            </div>
            <div className="page-content-div">
                <h3>my favorites page</h3>
            </div>
        </div>
    )
}

export default MyFavoritesPage;