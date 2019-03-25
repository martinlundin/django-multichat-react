import React, {Component} from 'react';
import './assets/scss/style.css';
import './extend'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginRegister from "./containers/LoginRegister";
import Chat from "./containers/Chat";
import ChatList from "./containers/ChatList";
import UserList from "./containers/UserList";
import Loggedin from "./components/Loggedin";
import EditUser from "./components/EditUser";
import IntroView from "./containers/IntroView";
import NewUser from "./containers/NewUser";
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
                    this.props.missingName ? (
                        //Logged in new users, (we want user to enter name)
                        <NewUser />
                    ) : (
                        //Logged in users
                        <div>
                            Comming soon
                        </div>
                    )
                ) : (
                    //Not logged in
                    <IntroView />
                )}

            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        missingName: state.user.name !== null,
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);