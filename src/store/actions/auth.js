import axios from "axios";
import * as actionTypes from "./actionTypes";
import {toast} from 'react-toastify';



export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (email, token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        email: email
    };
};

export const authFail = error => {
    //Check error response data, django send back field name eg. "password", if not "non_field_errors"
    let errorMessages = error.response.data;
    Object.keys(errorMessages).forEach(function (field) {
        let msg = (field === "non_field_errors" ? errorMessages[field][0] : field + ": " + errorMessages[field][0]);
        toast.error(msg.capitalize());
    });
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authLogin = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post("http://127.0.0.1:8000/api/v1/rest-auth/login/", {
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

export const authSignup = (email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post("http://127.0.0.1:8000/api/v1/rest-auth/registration/", {
                email: email,
                password1: password1,
                password2: password2
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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(email, token));
                dispatch(
                    checkAuthTimeout(
                        (expirationDate.getTime() - new Date().getTime()) / 1000
                    )
                );
            }
        }
    };
};
