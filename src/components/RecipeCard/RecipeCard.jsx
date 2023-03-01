import { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import EditButton from '../EditButton/EditButton';
import './RecipeCard.css';
 
const RecipeCard = ({recipe}) => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();    
    const initialCheckedArray = new Array(JSON.parse(recipe.instructions).length).fill(false);
    const [checkedInstruction, setCheckedInstruction] = useState(initialCheckedArray);
    const id = user.id;
    const history = useHistory();
    const favorites = useSelector((store) => store.setFavorites);
    console.log('favorite recipes in recipe card: ', favorites);


    useEffect(() => {
        dispatch({ type: 'FETCH_FAVORITES', payload: id });
    }, [id]);

    return (
        <>
            <div onClick={() => history.push(`/recipe/${recipe.id}`)} className="recipe-card">
                <h2>{recipe.title}</h2>
            </div>
        </>
    )
};

export default RecipeCard;