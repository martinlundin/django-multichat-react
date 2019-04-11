import React from "react";
import {connect} from "react-redux";
import WebSocketInstance from "../websocket";
import * as messageActions from "../store/actions/chat";

class ChatMessage extends React.Component {
    state = {
        text: "",
        giphy: null,
    };
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    componentWillReceiveProps(newProps) {

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
        this.setState({text: ""});
    };

    render() {
        return (
            <div className="chatMessageInput">
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
                        <button id="chat-message-submit" className="submit"><i className="far fa-paper-plane"></i></button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userid: state.auth.userid,
        chatid: state.chat.active
    };
};


const mapDispatchToProps = dispatch => {
    return {
        addNewMessageToChat: (chatid, sender, text, giphy, timestamp) => dispatch(messageActions.addNewMessageToChat(chatid, sender, text, giphy, timestamp)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatMessage);