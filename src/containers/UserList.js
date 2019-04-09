import React from "react";
import {connect} from "react-redux";
import * as usersActions from "../store/actions/users";
import UserPreview from "../components/UserPreview"

class UserList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //Load chats
        this.props.getUsers(this.props.token)
    }

    componentDidUpdate() {

    }

    componentWillReceiveProps(newProps) {

    }

    render() {
        return (
            <div>

                { (this.props.hasOwnProperty("users"))?
                    this.props.users.userids.map((userid, i, arr) => (
                    <UserPreview key={userid} userid={userid} />
                )) : ("")}
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        token: state.auth.token,
        userid: state.auth.userid,
        users: state.users,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        getUsers: (token) => dispatch(usersActions.getUsers(token)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);
