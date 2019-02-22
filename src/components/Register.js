import React from "react";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";
import {checkInputError} from './../util'

class Register extends React.Component {

    submitRegistration = e => {
        e.preventDefault();
        this.props.register(
            e.target.email.value,
            e.target.password1.value,
            e.target.password2.value
        );
    };

    // Todo add spam protection on user creation
    render() {
        return (
            <form method="POST" onSubmit={this.submitRegistration}>
                <h3>Register</h3>
                <label htmlFor="emailRegister">Email</label>
                <input
                    name="email"
                    className={checkInputError(this.props, "email")}
                    type="email"
                    id="emailRegister"
                    placeholder="name@mail.com"
                    required
                />
                <label htmlFor="passwordRegister">Password</label>
                <input
                    name="password1"
                    className={checkInputError(this.props, "password1")}
                    type="password"
                    id="passwordRegister"
                    placeholder="Password"
                    required
                />
                <input
                    name="password2"
                    className={checkInputError(this.props, "password2")}
                    type="password"
                    placeholder="Confirm password"
                    required
                />
                <button type="submit">Register</button>
                <a className="changeForm small" href="/" onClick={this.props.changeForm}>Already have an account? Login
                    here</a>
            </form>
        )
    }
}


const mapStateToProps = state => {
    return {
        error: state.auth.error,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        register: (email, password1, password2) =>
            dispatch(actions.authSignup(email, password1, password2)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);