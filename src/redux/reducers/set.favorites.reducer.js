
const setFavoritesReducer = (state = [], action) => {
    console.log('in favorite recipes reducer with: ', action);

    switch (action.type) {
        case 'SET_FAVORITES':
            return action.payload;
        default:
            return state;
    }
};

export default setFavoritesReducer;