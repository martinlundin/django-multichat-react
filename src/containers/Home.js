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
                <h4 className={`text-center`}>Other users</h4>
                <UserList/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};


const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);