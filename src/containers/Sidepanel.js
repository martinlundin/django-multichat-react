import React from "react";
import {Spin, Icon} from "antd";
import {connect} from "react-redux";
import * as messageActions from "../store/actions/chat";
import Contact from "../components/Contact";
import LoginRegister from "./../containers/LoginRegister";
import Loggedin from "../components/Loggedin";
import CreateProfile from "../components/EditUser";

const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;

class Sidepanel extends React.Component {

    waitForAuthDetails() {
        const component = this;
        setTimeout(function () {
            if (
                component.props.token !== null &&
                component.props.token !== undefined
            ) {
                component.props.getUserChats(
                    component.props.email,
                    component.props.token
                );
                return;
            } else {
                component.waitForAuthDetails();
            }
        }, 1000);
    }

    componentDidMount() {
        this.waitForAuthDetails();
    }

    openAddChatPopup() {
        this.props.addChat();
    }

    render() {
        let activeChats = this.props.chats.map(c => {
            let names = ""
            c.participants.forEach(function (name, index) {
                names += (index !== 0 ? ", " : "") + name
            });
            return (
                <Contact
                    key={c.id}
                    name={names}
                    picURL="http://emilcarlsson.se/assets/louislitt.png"
                    status="busy"
                    chatURL={`/${c.id}`}
                />
            );
        });
        return (
            <div id="sidepanel">
                <div id="profile">
                    <div className="wrap">
                        <div id="loginRegisterWrapper">
                            {this.props.loading ? (
                                <Spin indicator={antIcon}/>
                            ) : (
                                <div></div>
                            )}
                            {this.props.isAuthenticated ? (
                                <CreateProfile />
                            ) : (
                                <LoginRegister/>
                            )}
                        </div>
                    </div>
                </div>
                {this.props.token !== null ? (
                    <div>
                        <div id="search">
                            <label htmlFor="">
                                <i className="fa fa-search" aria-hidden="true"/>
                            </label>
                            <input type="text" placeholder="Search Chats..."/>
                        </div>
                        <div id="contacts">
                            <ul>{activeChats}</ul>
                        </div>
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading,
        token: state.auth.token,
        email: state.auth.email,
        chats: state.chat.chats
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserChats: (email, token) =>
            dispatch(messageActions.getUserChats(email, token))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidepanel);
