const invitationsReducer = (state = [], action) => {
    console.log('in invitations reducer with: ', action);

    switch (action.type) {
        case 'SET_INVITATIONS':
            return action.payload;
        default:
            return state;
    }
};

export default invitationsReducer;
