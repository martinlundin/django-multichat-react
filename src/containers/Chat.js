import React from "react";
import {connect} from "react-redux";
import WebSocketInstance from "../websocket";
import * as messageActions from "../store/actions/chat";
import ChatMessage from "../components/ChatMessage"

class ChatRoom extends React.Component {
    state = {
        text: "",
        giphy: null,
    };

    initializeChat() {
        this.connectToSocket();
        WebSocketInstance.onReturnMessages()
        //this.props.createChat(this.props.token, ["3013ec8a-9bca-41a0-943c-2a659ae33505", "5d556ba7-c22b-4177-a122-f28ccb681c4c"], "Hmm")
    }

    connectToSocket(chatid) {
        if (chatid != null) {
            WebSocketInstance.connect(chatid, this.props.token);
            this.waitForSocketConnection(() => {
                WebSocketInstance.getMessages(0, 20);
            });
        }
    }

    constructor(props) {
        super(props);
        this.initializeChat();
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(function () {
            if (WebSocketInstance.state() === 1) {
                console.log("Connection is made");
                callback();
                return;
            } else {
                console.log("wait for connection...");
                component.waitForSocketConnection(callback);
            }
        }, 1000);
    }

    messageChangeHandler = event => {
        this.setState({text: event.target.value});
    };

    sendMessageHandler = e => {
        e.preventDefault();
        const messageObject = {
            text: this.state.text,
        };
        WebSocketInstance.sendMessage(messageObject);
        this.props.addMessageToChat(this.props.chatid, this.props.userid, this.state.text);

        this.setState({message: ""});
    };

    renderTimestamp = timestamp => {
        let prefix = "";
        const timeDiff = Math.round(
            (new Date().getTime() - new Date(timestamp).getTime()) / 60000
        );
        if (timeDiff < 1) {
            // less than one minute ago
            prefix = "just now...";
        } else if (timeDiff < 60 && timeDiff > 1) {
            // less than sixty minutes ago
            prefix = `${timeDiff} minutes ago`;
        } else if (timeDiff < 24 * 60 && timeDiff > 60) {
            // less than 24 hours ago
            prefix = `${Math.round(timeDiff / 60)} hours ago`;
        } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
            // less than 7 days ago
            prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
        } else {
            prefix = `${new Date(timestamp)}`;
        }
        return prefix;
    };

    scrollToBottom = () => {
        if (this.props.chatid) {
            this.messagesEnd.scrollIntoView({behavior: "smooth"});
        }
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentWillReceiveProps(newProps) {
        if (this.props.chatid !== newProps.chatid) {
            if (this.props.chatid != null) {
                WebSocketInstance.disconnect();
            }
            this.connectToSocket(newProps.chatid);
        }
    }

    render() {
        console.log(this.props.active);
        //Show chat if id is selected
        if (this.props.chatid && this.props.active) {
            return (
                <div>
                    <div className="chatMessagesWrap">
                        <ul className="chatMessages">

                            {this.props.active.messages.map((message, i, arr) => (
                                <ChatMessage key={i} message={message} lastMessage={arr[i-1]}/>
                            ))}

                            <div style={{float: "left", clear: "both"}} ref={el => {this.messagesEnd = el;}}/>
                        </ul>
                    </div>
                    <div className="message-input">
                        <p>{this.props.chatid}</p>
                        <form onSubmit={this.sendMessageHandler}>
                            <div className="wrap">
                                <input
                                    onChange={this.messageChangeHandler}
                                    value={this.state.text}
                                    required
                                    id="chat-message-input"
                                    type="text"
                                    placeholder="Write your message..."
                                    autoComplete="off"
                                />
                                <i className="fa fa-paperclip attachment" aria-hidden="true"/>
                                <button id="chat-message-submit" className="submit">
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
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
        active: state.chat.chats[state.chat.active],
        chatid: state.chat.active
    };
};


const mapDispatchToProps = dispatch => {
    return {
        addMessageToChat: (chatid, sender, text, giphy, timestamp) => dispatch(messageActions.addMessageToChat(chatid, sender, text, giphy, timestamp)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatRoom);