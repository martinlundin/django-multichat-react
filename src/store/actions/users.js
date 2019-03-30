import axios from "axios";
import * as actionTypes from "./actionTypes";
import {toast} from "react-toastify";


export const getUsers = (token) => {
    return dispatch => {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios
            .get(`http://localhost:8000/api/v1/users/`)
            .then(res => {
                res.data.forEach(function(user){
                    dispatch(addUser(user));
                })
            });
    };
};

export const addUser = user => {
    let userid = user.uuid;
    return {
        type: actionTypes.ADD_USER,
        id: userid,
        payload: {...user}
    };
};