const SidePanel = () => {
    return (
        <div className="side-panel-container">
            <button
                className="btn"
            >
                Add Recipe
            </button>
            <br />
            <br />
            <button
                className="btn"
            >
                My Favorites
            </button>
            <br />
            <br />
            {/* STRETCH:*/} 
            <button
                className="btn"
            >
                Find New Recipe
            </button>
            <br />
            <br />
            <button
                className="btn"
            >
                Random Recipe
            </button>
            <br />
            <br />
        </div>

    )
}

export default SidePanel;