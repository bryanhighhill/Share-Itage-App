const selectedRecipeReducer = (state = [], action) => {
    console.log('in selectedRecipe reducer with: ', action);

    switch (action.type) {
        case 'SET_SELECTED_RECIPE':
            return action.payload;
        default:
            return state;
    }
};

export default selectedRecipeReducer;