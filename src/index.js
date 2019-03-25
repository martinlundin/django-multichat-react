import React from 'react';
import ReactDOM from 'react-dom';
import './util';
import App from './App'
import * as serviceWorker from './serviceWorker';
import {createStore, compose, applyMiddleware, combineReducers} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import userReducer from "./store/reducers/user";
import chatReducer from "./store/reducers/chat";
import usersReducer from "./store/reducers/users";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore() {
    const rootReducer = combineReducers({
        auth: authReducer,
        user: userReducer,
        chat: chatReducer,
        users: usersReducer,
    });

    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    );

}

const store = configureStore();

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
