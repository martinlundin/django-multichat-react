import * as actionTypes from "../actions/actionTypes";


const initialState = {
    chatids: [],
    chats: {},
    active: null
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_CHAT:
            //Only add non existing chats
            if (state.chatids.includes(action.id) === false) {
                return {
                    chatids: [...state.chatids, action.id],
                    chats: {
                        ...state.chats,
                        [action.id]: action.payload
                    }
                };
            } else {
                return state
            }
        case actionTypes.ADD_MESSAGE_TO_CHAT:
            state.chats[action.id]['messages'].unshift(action.payload);
            return {
                ...state
            };
        case actionTypes.OPEN_CHAT:
            state.active = action.id;
            return {
                ...state
            };
        case actionTypes.UPDATE_CHAT:
            state.chats[action.id] = {
                ...state.chats[action.id],
                ...action.payload
            };
            return {
                ...state
            };
        case actionTypes.REMOVE_CHAT:
            const prunedIds = state.chatids.filter(item => {
                return item !== action.id // return all the items not matching the action.id
            });
            delete state.chats[action.id]; // delete the hash associated with the action.id

            return {
                chatids: prunedIds,
                chats: state.chats
            };

        default:
            return state;
    }
};

export default reducer;