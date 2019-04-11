import React from "react";
import {connect} from "react-redux";
import ChatList from "./ChatList";
import UserList from "./UserList";

class Home extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {
        return (
            (this.props.chatids != null ?
                    //There are chats, show chat list
                    <ChatList/>
                    :
                    //There are no chats, show users
                    <UserList/>
            )
        );
    }
}

const mapStateToProps = state => {
    return {
        userid: state.auth.userid,
        users: state.users,
        chatids: state.chat.chatids
    };
};


const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);