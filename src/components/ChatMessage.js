import React from "react";
import {connect} from "react-redux";

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

    isFollowUp(){
        //Todo make more beautiful
        if(this.props.hasOwnProperty("lastMessage") && this.props.lastMessage != null && this.props.message.timestamp < this.props.lastMessage.timestamp + 900 && this.props.message.message_sender === this.props.lastMessage.message_sender){
            return true;
        }else{
            return false;
        }
    }

    render() {
        console.log(this.props);
        return (
            <li
                className={
                    "chatMessage " +
                    (this.props.message.message_sender === this.props.userid ? "sent " : "reply ") +
                    (this.isFollowUp() ? "followUp " : "")
                }
            >
                <span className={"chatMessageTimestamp"}>{this.props.message.timestamp}</span>
                <img className={"userImage chatuserImage"}
                     src="http://emilcarlsson.se/assets/mikeross.png"/>
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatMessage);