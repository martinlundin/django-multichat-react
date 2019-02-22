import React from "react";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";

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
                <input name="email" type="email" id="emailRegister" placeholder="name@mail.com" required/>
                <label htmlFor="passwordRegister">Password</label>
                <input
                    name="password1"
                    type="password"
                    id="passwordRegister"
                    placeholder="Password"
                    required
                />
                <input
                    name="password2"
                    type="password"
                    placeholder="Confirm password"
                    required
                />
                <button type="submit">Register</button>
                <button className="changeForm small" onClick={this.props.changeForm}>Already have an account? Login
                    here</button>
            </form>
        )
    }
}


const mapStateToProps = state => {
    return {

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