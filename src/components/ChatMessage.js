import React from "react";
import {connect} from "react-redux";
import WebSocketInstance from "../websocket";
import * as messageActions from "../store/actions/chat";

class ChatMessage extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    componentWillReceiveProps(newProps) {

    }

    render() {
        console.log(this.props);

        let isFollowUp = false;
        //Is less than 15 minutes from last message and sender is the same
        if(this.props.hasOwnProperty("lastMessage") && this.props.lastMessage != null && this.props.message.timestamp < this.props.lastMessage.timestamp + 900 && this.props.message.sender === this.props.lastMessage.sender){
            isFollowUp = true;
        }else{
            isFollowUp = false;
        }

        return (
            <li
                className={
                    "chatMessage " +
                    (this.props.message.sender === this.props.userid ? "sent " : "reply ") +
                    (isFollowUp ? "followUp " : null)
                }
            >
                <span className={"chatMessageTimestamp"}>{this.props.message.timestamp}</span>
                <img className={"profilePicture chatProfilePicture"} src="http://emilcarlsson.se/assets/mikeross.png"/>
                <span className={"chatMessageText"}>{this.props.message.text}</span>
            </li>
        );
    }
}

const mapStateToProps = state => {
    return {
        userid: state.auth.userid,
        users: state.users,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        openChat: (chatid) => dispatch(messageActions.openChat(chatid)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatMessage);