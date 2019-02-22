import React from "react";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";

class Loggedin extends React.Component {
    render() {
        return (
            <div>
                <img
                    id="profile-img"
                    src="http://emilcarlsson.se/assets/mikeross.png"
                    className="online"
                    alt=""
                />
                <p>{this.props.email}</p>
                <button onClick={() => this.props.logout()} className="authBtn">
                    <span>Logout</span>
                </button>
            </div>
        )
    }
}


const mapStateToProps = state => {
    console.log(state)
    return {
        loading: state.auth.loading,
        token: state.auth.token,
        email: state.auth.email,
        chats: state.message.chats
    };
};
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Loggedin);