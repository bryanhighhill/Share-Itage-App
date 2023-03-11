const shoppingListReducer = (state = [], action) => {
    console.log('in shopping list reducer with: ', action.payload);
    switch (action.type) {
      case 'SET_SHOPPING_LIST':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default shoppingListReducer;