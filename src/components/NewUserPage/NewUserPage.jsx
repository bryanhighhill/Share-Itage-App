import { useHistory } from 'react-router-dom';

const NewUserPage = ({setLoading}) => {
    const history = useHistory();

    return (
        <div className="family-div">
            In order to start adding your recipes, please create a family or join an existing family
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
    );
};

export default NewUserPage;
