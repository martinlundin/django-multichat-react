import React from "react";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";


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
                <span className={"headerNavigation"}></span>
                <span onClick={function () {
                    console.log("Open settings")
                }}>
                    <img className={"userImage headerUserImage"} src={this.props.image}/>
                </span>
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
    return {};
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);