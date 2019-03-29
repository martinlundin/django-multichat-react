import React from "react";
import {connect} from "react-redux";
import * as actions from "../store/actions/user";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class NewUser extends React.Component {

    submitEditUser = e => {
        e.preventDefault();
        this.props.editUser(
            this.props.token,
            this.props.userid,
            e.target.name.value,
            e.target.image.value,
        );
    };

    onImageSelect = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var fr = new FileReader();
        fr.onload = function(){
            document.getElementById("showSelectedImageEditUser").src = fr.result;
            document.getElementById("imageEditUser").value = fr.result;
        };
        fr.readAsDataURL(event.target.files[0]);
    };

    render() {
        return (
            <Container className={"newUser"}>
                <div className={"newUserInner"}>
                    <form method="POST" encType="multipart/form-data" onSubmit={this.submitEditUser}>
                        <Row className={"bigText rowMargin"}>Hello <input name={"name"} className={"underlineInput"} placeholder={"(Enter your name)"} defaultValue={this.props.name}/>!</Row>
                        <Row className={"rowMargin"}>
                            <div><label htmlFor={"imageSelectEditUser"}><img id="showSelectedImageEditUser" className={"profilePicture"} alt="Profile" src={this.props.image}/></label></div>
                            <div><label htmlFor={"imageSelectEditUser"}>Add profile picture</label></div>
                            <input name="image" type="hidden" id="imageEditUser"/>
                            <input name="imageSelect" type="file" id="imageSelectEditUser" accept="image/*" onChange={this.onImageSelect}/>
                        </Row>
                        <Row>
                            <button type={"submit"}>Done</button>
                        </Row>
                    </form>
                </div>
            </Container>
        )
    }
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userid: state.auth.userid,
        name: state.user.name,
        image: state.user.image,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        editUser: (token, userid, name, image) => dispatch(actions.editUser(token, userid, name, image)),
        handleChange: (name) => dispatch(actions.handleChange(name)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewUser);