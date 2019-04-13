import React from "react";
import {connect} from "react-redux";
import WebSocketInstance from "../websocket";
import * as messageActions from "../store/actions/chat";

class ChatMessage extends React.Component {
    state = {
        scrollClass: "",
        text: "",
        giphy: null,
    };

    constructor(props) {
        super(props);

    }

    onScroll = (event) => {
        let contentHeight = document.querySelector(".AppContent").clientHeight;

        if (event.target.scrollTop + event.target.clientHeight + 5 < contentHeight) {
            this.setState({
                scrollClass: "shadow"
            })
        } else {
            this.setState({
                scrollClass: ""
            })
        }
    };

    componentDidMount() {
        document.querySelector(".App").addEventListener('scroll', this.onScroll);
    }

    componentWillUnmount() {
        document.querySelector(".App").removeEventListener('scroll', this.onScroll);
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
        console.log(messageObject);
        WebSocketInstance.sendMessage(messageObject);
        this.setState({text: ""});
    };

    render() {
        return (
            <form className={`chatMessageInput ${this.state.scrollClass}`} onSubmit={this.sendMessageHandler}>
                <input
                    onChange={this.messageChangeHandler}
                    value={this.state.text}
                    required
                    id="chat-message-input"
                    type="text"
                    placeholder="Aa"
                    autoComplete="off"
                />
                <button id="chat-message-submit" className={`submit ${(this.state.text !== "" ? "show" : "")}`}>
                    <i className="far fa-paper-plane"></i>
                </button>
            </form>
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