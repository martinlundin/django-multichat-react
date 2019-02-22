import axios from "axios";
import * as actionTypes from "./actionTypes";

export const editProfileActionType = () => {
    return {
        type: actionTypes.EDIT_PROFILE
    };
};


export const editProfile = (email, password) => {
    return dispatch => {
        dispatch(editProfileActionType());
        axios
            .post("http://127.0.0.1:8000/api/v1/users/", {
                email: email,
                password: password
            })
            .then(res => {
                const token = res.data.key;

                dispatch(editProfileSuccess(email, token));
            })
            .catch(error => {
                dispatch(editProfileFail(error));
            });
    };
};