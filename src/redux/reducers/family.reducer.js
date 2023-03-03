const familyReducer = (state = [], action) => {
    console.log('in family reducer with: ', action);
    switch (action.type) {
      case 'SET_FAMILY':
        return action.payload;
      case 'SET_FAMILY_MEMBERS':
        return action.payload;
      default:
        return state;
    }
  };
  
  // family will be on the redux state at:
  // state.family
  export default familyReducer;