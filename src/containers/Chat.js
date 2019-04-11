import React from "react";
import {connect} from "react-redux";
import WebSocketInstance from "../websocket";
import * as messageActions from "../store/actions/chat";
import ChatMessage from "../components/ChatMessage"
import ChatMessageInput from "../components/ChatMessageInput"

class Chat extends React.Component {
    state = {
        text: "",
        giphy: null,
    };

    constructor(props) {
        super(props);
        WebSocketInstance.onSendMessage(this.props.addNewMessageToChat.bind(this));
    }

    connectToSocket(chatid) {
        if (chatid != null) {
            WebSocketInstance.connect(chatid, this.props.token);
        }
    }

    componentWillReceiveProps(newProps) {
        if (this.props.chatid !== newProps.chatid) {
            if (this.props.chatid != null) {
                WebSocketInstance.disconnect();
            }
            this.connectToSocket(newProps.chatid);
        }
    }

    scrollToBottom = () => {
        //todo Add scroll to bottom
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    render() {
        if (this.props.chatid && this.props.chat.messages) {
            return (
                <div className={"chat"}>
                    <div className="chatMessagesWrap">
                        <ul className="chatMessages">
                            {this.props.chat.messages.slice(0).reverse().map((message, i, arr) =>
                                <ChatMessage key={i + message.timestamp + message.message_sender + message.text} message={message} lastMessage={arr[i-1]}/>
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
            return null
        }
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userid: state.auth.userid,
        chatid: state.chat.active,
        chat: state.chat.chats[state.chat.active],
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addNewMessageToChat: (data) => {
            dispatch(messageActions.addNewMessageToChat(data.chatid, data.message));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);