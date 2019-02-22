import React from "react";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";
import {checkInputError} from './../util'

class Login extends React.Component {

    submitLogin = e => {
        e.preventDefault();
        this.props.login(e.target.email.value, e.target.password.value);
    };

    render() {
        return (
            <form method="POST" onSubmit={this.submitLogin}>
                <h3>Login</h3>
                <label htmlFor="emailLogin">Email</label>
                <input
                    name="email"
                    type="email"
                    className={checkInputError(this.props, "email")}
                    id="emailLogin"
                    placeholder="name@mail.com"
                />
                <label htmlFor="passwordLogin">Password</label>
                <input
                    name="password"
                    className={checkInputError(this.props, "password")}
                    type="password"
                    id="passwordLogin"
                    placeholder="Password"
                />
                <button type="submit">Login</button>
                <a className="changeForm small" href="/"  onClick={this.props.changeForm}>Don't have an account? Register here</a>
            </form>
        )
    }
}


const mapStateToProps = state => {
    return {
        error: state.auth.error,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) =>
            dispatch(actions.login(email, password))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);