import React, {Component} from 'react';
import './assets/scss/style.css';
import './extend'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginRegister from "./containers/LoginRegister";
import Loggedin from "./components/Loggedin";
import EditProfile from "./components/EditProfile";
import ChangePassword from "./components/ChangePassword";
import {connect} from "react-redux";
import * as actions from "./store/actions/auth";


class App extends Component {
    componentDidMount() {
        this.props.tryCookieLogin();
    }
    render() {
        return (
            <div className="App">
                <ToastContainer closeButton={false} position={"top-center"} toastClassName={"bbToast"}
                                hideProgressBar={true} pauseOnFocusLoss={false}/>

                {this.props.isAuthenticated ? (
                    <div>
                        <Loggedin/>
                        <ChangePassword/>
                    </div>
                ) : (
                    <LoginRegister/>
                )}

            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token,
        userid: state.auth.userid,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        tryCookieLogin: () => dispatch(actions.tryCookieLogin()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);