import React from "react";
import {connect} from "react-redux";
import EditUser from "./../components/EditUser";
import Logout from "../components/Logout";

class Profile extends React.Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div>
                <EditUser/>
                <Logout/>
            </div>
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
)(Profile);