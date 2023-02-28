import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SidePanel = ({page}) => {
    const history = useHistory();
    const user = useSelector((store) => store.user);

    return (
        <div className="side-panel-container">
            <br />
            <br />

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
            {/* STRETCH:*/} 
            <button
                className={page === 3 ? "btn_selected" : "btn"}
                onClick={() => {history.push(`/findrecipe`)}}
            >
                Find New Recipe
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
        </div>
    )
}

export default SidePanel;