import React from "react";
import {connect} from "react-redux";
import WebSocketInstance from "../websocket";
import * as messageActions from "../store/actions/chat";

class ChatPreview extends React.Component {
    state = {
        chat: null,
        users: null,
    };

    constructor(props) {
        super(props);
        this.state.chat = this.props.chats[this.props.chatid];

    }

    componentDidMount() {
        //Remove yourself, we know you are a participant
        this.state.chat.participants.remove(this.props.userid);

        //Set chat name if not set
        if(this.state.chat.name === null){
            this.state.chat.name = this.state.chat.participants.join(", ")
        }
    }

    componentDidUpdate() {

    }

    componentWillReceiveProps(newProps) {

    }

    render() {
        return (
            <div id={this.props.chatid} className="chatPreview" onClick={()=>this.props.openChat(this.props.chatid)}>
                <span className={"chatName"}>{(this.state.chat.name)}</span>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userid: state.auth.userid,
        chats: state.chat.chats,
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
)(ChatPreview);