import * as actionTypes from "../actions/actionTypes";


const initialState = {
    userids: [],
    users: {},
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_USER:
            //Only add non existing users
            if(state.userids.includes(action.id) === false){
                return {
                    userids: [ ...state.userids, action.id],
                    users: {
                        ...state.users,
                        [action.id]: action.payload
                    }
                };
            }else{
                return state
            }
        default:
            return state;
    }
};

export default reducer;