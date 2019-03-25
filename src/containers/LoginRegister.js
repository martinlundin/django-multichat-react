import React from "react";
import ReactCardFlip from 'react-card-flip';
import Register from "./../components/Register";
import Login from "./../components/Login";



class LoginRegister extends React.Component {

    state = {
        isFlipped: false
    };

    changeForm = (e) => {
        e.preventDefault();
        this.setState({isFlipped: !this.state.isFlipped});
    };

    render() {
        return (
            <ReactCardFlip isFlipped={this.state.isFlipped}>

                <Login changeForm={this.changeForm} key="back"/>
                <Register changeForm={this.changeForm} key="front"/>

            </ReactCardFlip>
        )
    }
}


export default LoginRegister;