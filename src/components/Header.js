import React from "react";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";


class Header extends React.Component {

    state = {
        headerClass: ""
    };

    componentDidMount() {
        document.querySelector(".App").addEventListener('scroll', (event) => {
            if (event.target.scrollTop > 5) {
                this.setState({
                    headerClass: "shadow"
                })
            } else {
                this.setState({
                    headerClass: ""
                })
            }

        })
    }

    render() {
        return (
            <header className={`${this.state.headerClass}`}>
                <span className={"headerNavigation"}></span>
                <img className={"userImage headerUserImage"} src={this.props.image} />
            </header>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        name: state.user.name,
        image: state.user.image,
        users: state.users,
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
)(Header);