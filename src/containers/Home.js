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
            <div>
                <ChatList/>
            </div>
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
)(Home);