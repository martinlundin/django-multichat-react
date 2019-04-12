import axios from "axios";
import * as actionTypes from "./actionTypes";
import {toast} from 'react-toastify';
import {getUser} from './user'


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userid) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userid: userid,
    };
};

export const authFail = error => {
    //Check error response data, django send back field name eg. "password", if not "non_field_errors"
    if(error.hasNestedProperties("response", "data")){
        let errorMessages = error.response.data;
        Object.keys(errorMessages).forEach(function (field) {
            let msg = (field === "non_field_errors" || field === "detail" ? errorMessages[field] : field + ": " + errorMessages[field]);
            toast.error(msg.toString().capitalize());
        });
    }
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const changePasswordSuccess = (res) => {
    if(res.hasNestedProperties("data", "detail")) {
        toast.success(res.data.detail);
    }
    return {
        type: actionTypes.CHANGE_PASSWORD_SUCCESS,
    };
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("expirationDate");
    window.history.pushState('', '', '/');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const login = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post("http://localhost:8000/api/v1/rest-auth/login/", {
                email: email,
                password: password
            })
            .then(res => {
                const token = res.data.key;
                const userid = res.data.user;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000 * 24 * 365); //1 year
                localStorage.setItem("token", token);
                localStorage.setItem("userid", userid);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(token, userid));
                dispatch(getUser(token, userid));
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    };
};

export const register = (email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios
            .post("http://localhost:8000/api/v1/rest-auth/registration/", {
                email: email,
                password1: password1,
                password2: password2
            })
            .then(res => {
                const token = res.data.key;
                const userid = res.data.user;
                const expirationDate = new Date(new Date().getTime() + 3600 * 1000 * 24 * 365);
                localStorage.setItem("token", token);
                localStorage.setItem("userid", userid);
                localStorage.setItem("expirationDate", expirationDate);
                dispatch(authSuccess(token, userid));
                dispatch(getUser(token, userid));
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    };
};

export const changePassword = (token, new_password1, new_password2) => {
    return dispatch => {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios
            .post("http://localhost:8000/api/v1/rest-auth/password/change/", {
                new_password1: new_password1,
                new_password2: new_password2
            })
            .then(res => {
                dispatch(changePasswordSuccess(res));
            })
            .catch(error => {
                dispatch(authFail(error));
            });
    };
};

export const tryCookieLogin = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        const userid = localStorage.getItem("userid");
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, userid));
                dispatch(getUser(token, userid));
            }
        }
    };
};