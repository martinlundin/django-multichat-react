import React from "react";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";
import {checkInputError} from './../util'

class Register extends React.Component {

    submitChangePassword = e => {
        e.preventDefault();
        this.props.changePassword(
            this.props.token,
            e.target.new_password1.value,
            e.target.new_password2.value,
        );
    };
    //Todo add old password as requirement (in django api and here)
    render() {
        return (
            <form method="POST" onSubmit={this.submitChangePassword}>
                <label htmlFor="new_password1ChangePassword">Password</label>
                <input
                    name="new_password1"
                    className={checkInputError(this.props, "new_password1")}
                    type="password"
                    id="new_password1ChangePassword"
                    placeholder="New password"
                    required
                />
                <input
                    name="new_password2"
                    className={checkInputError(this.props, "new_password2")}
                    type="password"
                    placeholder="Confirm new password"
                    required
                />
                <button type="submit">Change</button>
            </form>
        )
    }
}


const mapStateToProps = state => {
    return {
        error: state.auth.error,
        token: state.auth.token,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        changePassword: (token, new_password1, new_password2) =>
            dispatch(actions.changePassword(token, new_password1, new_password2)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);