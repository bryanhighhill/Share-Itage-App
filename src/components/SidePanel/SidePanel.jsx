import { useHistory } from 'react-router-dom';

const SidePanel = () => {
    const history = useHistory();

    return (
        <div className="side-panel-container">
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
        </div>

    )
}

export default SidePanel;