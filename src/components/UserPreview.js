import React from "react";
import {connect} from "react-redux";
import * as chatActions from "../store/actions/chat";


class UserPreview extends React.Component {
    state = {
        chat: null,
        users: null,
    };

    constructor(props) {
        super(props);
        this.state.userPreview = this.props.users[this.props.userid];

    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    componentWillReceiveProps(newProps) {

    }

    openOrCreateChat(participants){
        //Todo add check if chat exists then open it logic

        this.props.createChat(this.props.token, participants)
    }

    render() {
        //Show users that actually have a name
        if(this.props.users.users[this.props.userid].name){
            return (
                <div id={this.props.userid} className="userPreview" onClick={()=>this.openOrCreateChat([this.props.userid, this.props.currentUserid])}>
                    <img src={this.props.users.users[this.props.userid].image} className={"profilePicture"} />
                    <span className={"profileName"}>{this.props.users.users[this.props.userid].name}</span>
                </div>
            );
        }else{
            return null
        }
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        currentUserid: state.auth.userid,
        chats: state.chat.chats,
        users: state.users,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        createChat: (token, participants) => dispatch(chatActions.createChat(token, participants)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPreview);