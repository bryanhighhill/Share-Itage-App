import { useSelector } from 'react-redux';
import RecipeCard from '../RecipeCard/RecipeCard';

const RecipeGrid = () => {
    const recipes = useSelector((store) => store.recipes);
    console.log('recipes: ', recipes);

    return(
        <div className="recipe-grid">
            {recipes.map((recipe, index) => {
                console.log('recipe in map: ', recipe);
                return (
                    <RecipeCard recipe={recipe}/>
                );
            })}
        </div>
    );
};

export default RecipeGrid;