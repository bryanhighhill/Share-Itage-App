import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SidePanel = () => {
    const history = useHistory();
    const user = useSelector((store) => store.user);

    return (
        <div className="side-panel-container">
            <br />
            <br />

            <button
                className="btn"
                onClick={() => {history.push(`/addrecipe`)}}
            >
                Add Recipe
            </button>
            <br />
            <br />

            <button
                className="btn"
                onClick={() => {history.push(`/myfavorites`)}}
            >
                My Favorites
            </button>

            <br />
            <br />
            {/* STRETCH:*/} 
            <button
                className="btn"
                onClick={() => {history.push(`/findrecipe`)}}
            >
                Find New Recipe
            </button>
            <br />
            <br />

            <button
                className="btn"
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
                            className="btn"
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