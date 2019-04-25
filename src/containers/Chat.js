import React from "react";
import {connect} from "react-redux";
import WebSocketInstance from "../websocket";
import * as messageActions from "../store/actions/chat";
import ChatMessage from "../components/ChatMessage"
import ChatMessageInput from "../components/ChatMessageInput"
import {Redirect} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import firebase from "firebase";

class Chat extends React.Component {
    state = {
        text: "",
        giphy: null,
    };

    constructor(props) {
        super(props);

    }

    componentWillReceiveProps(newProps) {

    }

    scrollToBottom = () => {
        if (this.props.chatid && this.messagesEnd) {
            this.messagesEnd.scrollIntoView({behavior: "smooth"});
        }
    };

    componentDidMount() {

        this.scrollToBottom();
    }

    componentWillUnmount() {

    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    //Todo rewrite to handle errors better
    sendTokenToServer = (token, FCMToken) => {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        axios
            .post(`http://localhost:8000/api/v1/devices/`, JSON.stringify({
                'registration_id': FCMToken,
                'type': 'web',
            }))
            .then(res => {
                return res
            })
            .catch(error => {
                if (error.hasNestedProperties("response", "data")) {
                    let errorMessages = error.response.data;
                    Object.keys(errorMessages).forEach(function (field) {
                        let msg = (field === "non_field_errors" || field === "detail" ? errorMessages[field] : field + ": " + errorMessages[field]);
                        toast.error(msg.toString().capitalize());
                    });
                }
            })
    };
    getPermission() {
        const messaging = firebase.messaging();
        messaging.requestPermission()
            .then(r => {
                return messaging.getToken()
                    .then(response => {
                        return this.sendTokenToServer(this.props.token, response)
                    })
                    .catch(error => {
                        throw error
                    })
            })
            .catch(error => {
                throw error
            })
    }

    render() {
        if (this.props.chatid && this.props.chat.messages) {
            if(Notification.permission === "default"){
                this.getPermission()
            }
            return (
                <div className={"chat"}>
                    <div className="chatMessagesWrap">
                        <ul className="chatMessages">
                            {this.props.chat.messages.slice(0).reverse().map((message, i, arr) =>
                                <ChatMessage key={i + message.timestamp + message.message_sender + message.text}
                                             message={message} lastMessage={arr[i - 1]}/>
                            )}

                            <div style={{float: "left", clear: "both"}} ref={el => {
                                this.messagesEnd = el;
                            }}/>
                        </ul>
                    </div>
                    <ChatMessageInput/>
                </div>
            );
        } else {
            return (
                <Redirect to={"/"}/>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userid: state.auth.userid,
        chatid: state.chat.active,
        chat: state.chat.chats[state.chat.active],
        messageCount: state.chat.messageCount
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);