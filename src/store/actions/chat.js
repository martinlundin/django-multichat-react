import axios from "axios";
import * as actionTypes from "./actionTypes";

export const getChats = (token) => {
    return dispatch => {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios
            .get(`http://localhost:8000/api/v1/chat/`)
            .then(res => {
                res.data.forEach(function(chat){
                    dispatch(addChat(chat));
                })
            });
    };
};

export const createChat = (token, participants, name = null) => {
    console.log(name);
    let data = {
        participants: participants,
        name: name,
    };
    return dispatch => {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios
            .post(`http://localhost:8000/api/v1/chat/`, data)
            .then(res => {
                dispatch(addChat(res.data));
            });
    };
};

export const addChat = chat => {
    let chatid = chat.uuid;
    return {
        type: actionTypes.ADD_CHAT,
        id: chatid,
        payload: {...chat}
    };
};



export const openChat = chatid => {
    return {
        type: actionTypes.OPEN_CHAT,
        id: chatid,
    };
};

export const addNewMessageToChat = (chatid, message) => {
    return {
        type: actionTypes.ADD_MESSAGE_TO_CHAT,
        id: chatid,
        payload: message
    };
};

export const sendMessage = () => {

};

/*
const action1 = {
    type: 'add',

}

const action2 = {
    type: 'update',
    id: '2',
    payload: { content: {title: 'item 2 updated' }}
}

const action3 = {
    type: 'remove',
    id: '4'
}*/