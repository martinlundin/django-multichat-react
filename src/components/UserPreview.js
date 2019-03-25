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
            <div id={this.props.userid} className="userPreview" onClick={()=>this.props.createChat(this.props.token, [this.props.userid, this.props.currentUserid])}>
                <span className={"userName"}>{(this.state.userPreview.name)}</span>
                <img src={(this.state.userPreview.image)}>{(this.state.userPreview.name)}</img>
            </div>
        );
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