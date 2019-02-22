import axios from "axios";
import * as actionTypes from "./actionTypes";
import {toast} from 'react-toastify';

function inputErrorFieldIndicator(error) {
    if (error.response.data.non_field_errors) {
        error.response.data.non_field_errors.forEach(function (error) {
            toast.error(error);
        })
    } else {
        //Add error class to field
        Object.keys(error.response.data).forEach(function (field) {
            //Find first element with fieldname
            let elements = document.querySelectorAll("input[name="+field+"]");
            elements.forEach(function (element) {
                element.classList.add("invalid");
            });
            let errors = error.response.data[field];
            errors.forEach(function (error) {
                toast.error(field + ": " + error);
            });
        })
    }
}

function inputErrorFieldIndicatorReset() {
    let elements = document.querySelectorAll(".invalid");
    elements.forEach(function (element) {
        element.classList.remove("invalid");
    });
}


export const authStart = () => {
    inputErrorFieldIndicatorReset();
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
    inputErrorFieldIndicator(error);
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
