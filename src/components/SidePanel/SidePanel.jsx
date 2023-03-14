import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import './SidePanel.css';

const SidePanel = ({page}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const shoppingList = useSelector((store) => store.shoppingList);

    useEffect(() => {
        dispatch({ type: 'FETCH_FAMILY', payload: user.family_id });
    }, [user.id]);

    return (
        <div className="container">

           <div className="welcome-div">
                Welcome, <h4 className="welcome-header">{user.username}</h4>!
           </div>

            <button
                className={page === 1 ? "btn_selected" : "btn"}
                onClick={() => {history.push(`/addrecipe`)}}
            >
                Add Recipe
            </button>
            <br />
            <br />

            <button
                className={page === 2 ? "btn_selected" : "btn"}
                onClick={() => {history.push(`/myfavorites`)}}
            >
                My Favorites
            </button>
            <br />
            <br />

            <button
                className={page === 3 ? "btn_selected" : "btn"}
                onClick={() => {history.push(`/findrecipe`)}}
            >
                Find a Recipe
            </button>
            <br />
            <br />

            <button
                className={page === 4 ? "btn_selected" : "btn"}
                onClick={() => {history.push(`/randomrecipe`)}}
            >
                Random Recipe
            </button>
            <br />
            <br />

            {/* if user has items in shopping cart, show shopping cart button */}
            {shoppingList.length > 0 &&
                <>
                    <button
                        className={page === 6 ? "btn_selected" : "btn"}
                        onClick={() => {history.push(`/shoppinglist`)}}
                    >
                        Grocery List ({shoppingList.length})
                    </button>
                    <br />
                    <br />
                </>
            }

            {/* if user is admin, show admin panel button */}
            {user.admin 
                && 
                    <>
                        <button
                            className={page === 5 ? "btn_selected" : "btn"}
                            onClick={() => {history.push(`/admin`)}}
                        >
                            Admin Panel
                        </button>
                        <br />
                        <br />
                    </>
            }
            <LogOutButton className="logout-btn" />
        </div>
    )
}

export default SidePanel;