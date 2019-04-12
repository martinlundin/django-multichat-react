import React, {Component} from 'react';
import './assets/scss/style.css';
import './extend'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginRegister from "./containers/LoginRegister";
import Chat from "./containers/Chat";
import Home from "./containers/Home";
import Profile from "./containers/Profile";
import ChatList from "./containers/ChatList";
import UserList from "./containers/UserList";
import Loggedin from "./components/Logout";
import Header from "./components/Header";
import EditUser from "./components/EditUser";
import IntroView from "./containers/IntroView";
import NewUser from "./containers/NewUser";
import ChangePassword from "./components/ChangePassword";
import {connect} from "react-redux";
import * as actions from "./store/actions/auth";
import {Route, withRouter, Redirect} from "react-router-dom";


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
                    this.props.hasName ? (
                        //Logged in users
                        <div>
                            <Header/>
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/profile" component={Profile}/>
                        </div>
                    ) : (
                        //Logged in new users, (we want user to enter name)
                        <NewUser/>
                    )
                ) : (
                    //Not logged in
                    <IntroView/>
                )}

            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        hasName: state.user.name !== null && state.user.name !== "",
        token: state.auth.token,
        userid: state.auth.userid,
        chatid: state.chat.active,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        tryCookieLogin: () => dispatch(actions.tryCookieLogin()),
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));