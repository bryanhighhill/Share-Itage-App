const recipesReducer = (state = [], action) => {
    console.log('in recipes reducer with: ', action);
    switch (action.type) {
      case 'SET_RECIPES':
        return action.payload;
      default:
        return state;
    }
  };
  
  // family will be on the redux state at:
  // state.family
  export default recipesReducer;