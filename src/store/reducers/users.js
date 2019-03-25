import * as actionTypes from "../actions/actionTypes";


const initialState = {
    uderids: [],
    users: {},
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_USER:
            return {
                userids: [ ...state.userids, action.id],
                users: {
                    ...state.users,
                    [action.id]: action.payload
                }
            };

        default:
            return state;
    }
};

export default reducer;