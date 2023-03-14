  const familyMemberReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_FAMILY_MEMBERS':
        return action.payload;
      default:
        return state;
    }
  };

  export default familyMemberReducer;