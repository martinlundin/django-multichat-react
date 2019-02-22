import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";
import {editProfile} from "../actions/profile";

const initialState = {
    token: null,
    email: null,
    name: null,
    error: null,
    loading: false
};

const editProfile = (state, action) => {
    return updateObject(state, {
        name: action.name,
        
        error: null,
        loading: false
    });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EDIT_PROFILE:
            return editProfile(state, action);
        default:
            return state;
    }
};

export default reducer;