import React from "react";
import {connect} from "react-redux";
import WebSocketInstance from "../websocket";
import * as messageActions from "../store/actions/chat";
import {Link} from "react-router-dom";

class ChatPreview extends React.Component {
    state = {
        chat: null,
        users: null,
    };

    constructor(props) {
        super(props);
        this.state.chat = this.props.chats[this.props.chatid];
    }

    getUserNameById(id){
        if(this.props.users.users[id] != null){
            return this.props.users.users[id].name
        }
    }
    getUserImageById(id){
        if(this.props.users.users[id] != null){
            return this.props.users.users[id].image
        }
    }

    componentDidMount() {
        //Remove yourself, we know you are a participant
        this.state.chat.participants.remove(this.props.userid);

        //Set chat name if not set
        if(this.state.chat.name === null){
            let names = [];
            let outsideThis = this;
            this.state.chat.participants.forEach(function(participant, i,){
                names.push(outsideThis.getUserNameById(participant));
            });
            this.state.chat.name =  names.join(", ");
        }

        //Set chat image if not set
        if(this.state.chat.image === null){
            let images = [];
            let outsideThis = this;
            this.state.chat.participants.forEach(function(participant, i,){
                images.push(outsideThis.getUserImageById(participant));
            });
            //Todo somehow add multiple images together, now first participant is shown
            this.state.chat.image = images[0];
        }
    }

    componentDidUpdate() {

    }

    componentWillReceiveProps(newProps) {

    }

    render() {
        return (
            <Link to="/chat" id={this.props.chatid} className="chatPreview padding" onClick={()=>this.props.openChat(this.props.chatid)}>
                <img className={"userImage chatPicture"} src={this.state.chat.image} />
                <div className={"chatInfo"}>
                    <span className={"chatName oneLine"}>{(this.state.chat.name)}</span>
                    {(this.state.chat.hasOwnProperty("messages") && this.state.chat.messages[0] != null ?
                        <span className={"chatLastMessage oneLine"}>
                            {(this.state.chat.messages[0].message_sender === this.props.userid ?
                                "You: "
                                :
                                "")}
                            {(this.state.chat.messages[0].text)}</span>
                        :
                        null
                    )}
                </div>
            </Link>
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