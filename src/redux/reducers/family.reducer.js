const familyReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_FAMILY':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default familyReducer;
  