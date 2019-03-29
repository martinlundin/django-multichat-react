import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
    name: null,
    image: null,
    error: null,
    loading: false
};

const editUserStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const getUserSuccess = (state, action) => {
    return updateObject(state, {
        name: action.name,
        image: action.image,
        error: null,
        loading: false
    });
};

const editUserSuccess = (state, action) => {
    return updateObject(state, {
        name: action.name,
        image: action.image,
        error: null,
        loading: false
    });
};

const editUserFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.EDIT_USER_START:
            return editUserStart(state, action);
        case actionTypes.GET_USER_SUCCESS:
            return getUserSuccess(state, action);
        case actionTypes.EDIT_USER_SUCCESS:
            return editUserSuccess(state, action);
        case actionTypes.EDIT_USER_FAIL:
            return editUserFail(state, action);
        default:
            return state;
    }
};

export default reducer;