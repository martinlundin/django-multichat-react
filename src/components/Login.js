import React from "react";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";

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
                    id="emailLogin"
                    placeholder="name@mail.com"
                />
                <label htmlFor="passwordLogin">Password</label>
                <input
                    name="password"
                    type="password"
                    id="passwordLogin"
                    placeholder="Password"
                />
                <button type="submit">Login</button>
                <button className="changeForm small" onClick={this.props.changeForm}>Don't have an account? Register here</button>
            </form>
        )
    }
}


const mapStateToProps = state => {
    return {

    }
};
const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) =>
            dispatch(actions.authLogin(email, password))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);