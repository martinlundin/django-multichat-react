import React from "react";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";
import { Link, NavLink} from "react-router-dom";

class Header extends React.Component {

    state = {
        headerClass: ""
    };

    onScroll = (event) => {
        if (event.target.scrollTop > 5) {
            this.setState({
                headerClass: "shadow"
            })
        } else {
            this.setState({
                headerClass: ""
            })
        }
    };

    componentDidMount() {
        document.querySelector(".App").addEventListener('scroll', this.onScroll)
    }

    componentWillUnmount() {
        document.querySelector(".App").removeEventListener('scroll', this.onScroll);
    }

    render() {
        return (
            <header className={`padding ${this.state.headerClass}`}>
                <span className={"headerNavigation"}>
                    <NavLink exact to={"/"} onClick={()=> {document.querySelector(".App").scrollTop = 0}}><i className="fas fa-chevron-left"></i></NavLink>
                </span>
                <Link to={"/profile"}>
                    <img className={"userImage headerUserImage"} src={this.props.image}/>
                </Link>
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
        pathname: window.location.pathname,
    }
};
const mapDispatchToProps = dispatch => {
    return {};
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);