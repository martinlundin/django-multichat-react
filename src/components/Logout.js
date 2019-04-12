import React from "react";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";

class Logout extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => this.props.logout()} className="authBtn">
                    <span>Logout</span>
                </button>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        token: state.auth.token,
        name: state.user.name,
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
)(Logout);