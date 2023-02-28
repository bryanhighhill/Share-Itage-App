import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import UserPage from '../UserPage/UserPage';

const RandomRecipePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const randomRecipe = useSelector(store => store.randomRecipe);
    const user = useSelector(store => store.user);
    const id = user.family_id;
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState([{ingredient:'', amount:''}]);
    const [instructions, setInstructions] = useState(['']);
    console.log('in random recipe page with: ', randomRecipe);

    const initialCheckedArray = new Array(instructions).length.fill(false);

    const [checkedInstruction, setCheckedInstruction] = useState(initialCheckedArray);

    const onChange = (index) => {
        const updatedArray = [...checkedInstruction];
        updatedArray[index] = !checkedInstruction[index];
        console.log('checked instruction in on chage', updatedArray);
        setCheckedInstruction(updatedArray);
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_RANDOM_RECIPE', payload: id });
    }, [id]);

    useEffect(() => {
        setIngredients(randomRecipe.ingredients);
        setInstructions(randomRecipe.instructions);
        setTitle(randomRecipe.title);
    }, [randomRecipe]);

    return (
        <h2>{randomRecipe.title}</h2>
    )
}

export default RandomRecipePage;