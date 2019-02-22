import React from "react";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";

class EditProfile extends React.Component {

    submitEditProfile = e => {
        e.preventDefault();
        this.props.createProfile(
            e.target.name.value,
            e.target.image.value,
        );
    };

    render() {
        return (

            <form method="POST" onSubmit={this.submitEditProfile}>
                <h3>Profile</h3>
                <label htmlFor="emailEditProfile">Email</label>
                <input name="email" type="disabled" id="emailEditProfile" value="mail@here.com" required/>
                <label htmlFor="nameEditProfile">Firstname</label>
                <input name="name" type="type" id="nameEditProfile" placeholder="Melvin" required/>
                <label htmlFor="imageEditProfile">Profile image</label>
                <input name="image" type="file" id="imageEditProfile" accept="image/*"/>
                <button type="submit">Finish</button>
            </form>

        )
    }
}

const mapStateToProps = state => {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {
        //editProfile: (name, image) => dispatch(actions.editProfile(name, image)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfile);