import { useHistory } from 'react-router-dom';

const SidePanel = () => {
    const history = useHistory();

    return (
        <div className="side-panel-container">
            <div className="family-div">
                In order to start adding your recipes, please create a family or join a family
                <br />
                <br />
                <button
                    className="btn"
                    onClick={() => {history.push(`/createfamily`)}}
                >
                    Create a Family
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                    className="btn"
                    onClick={() => {history.push(`/joinfamily`)}}
                >
                    Join a Family
                </button>
                <br />
                <br />
            </div>
            - - - - - - - - - -
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
        </div>

    )
}

export default SidePanel;