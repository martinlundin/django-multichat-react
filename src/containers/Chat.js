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

    render() {
        if (this.props.chatid && this.props.chat.messages) {
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