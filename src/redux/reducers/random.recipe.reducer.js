const randomRecipeReducer = (state = [], action) => {
    console.log('in random reducer with: ', action);

    switch (action.type) {
        case 'SET_RANDOM_RECIPE':
            return action.payload;
        default:
            return state;
    }
};

export default randomRecipeReducer;