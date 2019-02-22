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
            .post("http://127.0.0.1:8000/rest-auth/login/", {
                email: email,
                password: password
            })
            .then(res => {
                const token = res.data.key;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000 * 24 * 365);
                localStorage.setItem("token", token);
                localStorage.setItem("email", email);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(email, token));
                dispatch(checkAuthTimeout(3600 * 24 * 365));
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    };
};