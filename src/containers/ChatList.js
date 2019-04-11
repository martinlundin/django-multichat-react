import React from "react";
import {connect} from "react-redux";
import * as messageActions from "../store/actions/chat";
import * as usersActions from "../store/actions/users";
import ChatPreview from "../components/ChatPreview"


class ChatList extends React.Component {

    componentDidMount() {
        //Load chats
        this.props.getChats(this.props.token);
        //Load users
        this.props.getUsers(this.props.token);
    }

    render() {
        return (
            <div className={"chatList"}>
                {
                    this.props.chatids.map((chatid, i, arr) => (
                        <ChatPreview key={chatid} chatid={chatid} />
                    ))
                }
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        chatids: state.chat.chatids
    };
};


const mapDispatchToProps = dispatch => {
    return {
        getUsers: (token) => dispatch(usersActions.getUsers(token)),
        getChats: (token) => dispatch(messageActions.getChats(token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatList);
