import React from "react";
import {connect} from "react-redux";
import WebSocketInstance from "../websocket";
import * as messageActions from "../store/actions/chat";
import ChatMessage from "../components/ChatMessage"
import ChatMessageInput from "../components/ChatMessageInput"
import {Redirect} from "react-router-dom";

class Chat extends React.Component {
    state = {
        text: "",
        giphy: null,
    };

    constructor(props) {
        console.log("construct")

        super(props);
        if (this.props.chatid){
            console.log("constructconnect")
            this.connectToSocket(this.props.chatid);
        }
        WebSocketInstance.onSendMessage(this.props.addNewMessageToChat.bind(this));
    }

    connectToSocket(chatid) {
        if (chatid != null) {
            WebSocketInstance.connect(chatid, this.props.token);
        }
    }

    componentWillReceiveProps(newProps) {
        console.log("recievedprops")
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
        console.log("didmount")
        this.scrollToBottom();
    }

    componentWillUnmount() {
        console.log("unmount")
        WebSocketInstance.disconnect();
    }

    componentDidUpdate() {
        console.log("didupdate")
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
            return (
                <Redirect to={"/"}/>
            )
        }
    }
}

const mapStateToProps = state => {
console.log(state)
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
        addNewMessageToChat: (data) => {
            dispatch(messageActions.addNewMessageToChat(data.chatid, data.message));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat);