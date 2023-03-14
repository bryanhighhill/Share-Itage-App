import { combineReducers } from 'redux';

const familyReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_FAMILY':
        return action.payload;
      default:
        return state;
    }
  };
  
  // family will be on the redux state at:
  // state.family
  export default familyReducer;
  