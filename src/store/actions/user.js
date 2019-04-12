import axios from "axios";
import * as actionTypes from "./actionTypes";
import {toast} from "react-toastify";
import {authFail, changePasswordSuccess} from "./auth";

export const editUserStart = () => {
    return {
        type: actionTypes.EDIT_USER_START
    };
};


export const getUserSuccess = (name, image) => {
    return {
        type: actionTypes.GET_USER_SUCCESS,
        name: name,
        image: image,
    };
};

export const editUserSuccess = (name, image) => {
    return {
        type: actionTypes.EDIT_USER_SUCCESS,
        name: name,
        image: image,
    };
};

export const editUserFail = error => {
    if (error.hasNestedProperties("response", "data")) {
        let errorMessages = error.response.data;
        Object.keys(errorMessages).forEach(function (field) {
            let msg = (field === "non_field_errors" || field === "detail" ? errorMessages[field] : field + ": " + errorMessages[field]);
            toast.error(msg.toString().capitalize());
        });
    }
    return {
        type: actionTypes.EDIT_USER_FAIL,
        error: error
    };
};


export const editUser = (token, userid, name, image) => {
    console.log(image)
    return dispatch => {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios
            .put("http://localhost:8000/api/v1/users/" + userid, {
                image: image,
                name: name,
            })
            .then(res => {
                console.log(res);
                dispatch(editUserSuccess(res.data.name, res.data.image));
            })
            .catch(error => {
                dispatch(editUserFail(error));
            });
    };
};
export const handleChange = (name) => {
    return {
        name: name,
    };
};

export const getUser = (token, userid) => {
    return dispatch => {
        axios.defaults.headers = {
            Authorization: `Token ${token}`
        };
        axios
            .get("http://localhost:8000/api/v1/users/" + userid)
            .then(res => {
                if (res.hasNestedProperties("data")) {
                        dispatch(getUserSuccess(res.data.name, res.data.image));
                }
            })
            .catch(error => {
                    dispatch(editUserFail(error));
            });
    }
};