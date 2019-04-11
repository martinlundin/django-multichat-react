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
                <div>
                    <div className="chatMessagesWrap">
                        <ul className="chatMessages">
                            {this.props.chat.messages.slice(0).reverse().map((message, i, arr) => {
                                let isFollowUp = false;
                                //Is less than 15 minutes from last message and sender is the same
                                if(this.props.hasOwnProperty("lastMessage") && this.props.lastMessage != null && this.props.message.timestamp < this.props.lastMessage.timestamp + 900 && this.props.message.message_sender === this.props.lastMessage.message_sender){
                                    isFollowUp = true;
                                }else{
                                    isFollowUp = false;
                                }

                                return (
                                    <li key={i}
                                     className={
                                         "chatMessage " +
                                         (message.message_sender === this.props.userid ? "sent " : "reply ") +
                                         (isFollowUp ? "followUp " : "")
                                     }
                                >
                                    <span className={"chatMessageTimestamp"}>{message.timestamp}</span>
                                    <img className={"profilePicture chatProfilePicture"}
                                         src="http://emilcarlsson.se/assets/mikeross.png"/>
                                    <span className={"chatMessageText"}>{message.text}</span>
                                </li>
                                )

                            })}
                            {this.props.chat.messages.slice(0).reverse().map((message, i, arr) =>
                                <ChatMessage key={message.id} message={message} lastMessage={arr[i-1]}/>
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