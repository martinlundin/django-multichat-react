import React from "react";
import {connect} from "react-redux";
import * as messageActions from "../store/actions/chat";
import ChatPreview from "../components/ChatPreview"

class ChatList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //Load chats
        this.props.getChats(this.props.token)
    }

    componentDidUpdate() {

    }

    componentWillReceiveProps(newProps) {

    }

    render() {
        return (
            <div>
                {this.props.chatids.map((chatid, i, arr) => (
                    <ChatPreview key={chatid} chatid={chatid} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userid: state.auth.userid,
        chatids: state.chat.chatids
    };
};


const mapDispatchToProps = dispatch => {
    return {
        getChats: (token) => dispatch(messageActions.getChats(token)),
        createChat: (token, participants, name) => dispatch(messageActions.createChat(token, participants, name)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatList);
