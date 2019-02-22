import React from "react";
import * as actions from "../store/actions/auth";
import {connect} from "react-redux";

class CreateProfile extends React.Component {

    submitCreateProfile = e => {
        e.preventDefault();
        this.props.createProfile(
            e.target.name.value,
            e.target.image.value,
        );
    };

    render() {
        return (

            <form method="POST" onSubmit={this.submitCreateProfile}>
                <h3>Profile</h3>
                <label htmlFor="nameRegister">Firstname or nickname</label>
                <input name="name" type="type" id="nameRegister" placeholder="Melvin" required/>
                <label htmlFor="imageRegister">Profile image</label>
                <input name="image" type="file" id="imageRegister" accept="image/*"/>
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
        //createProfile: (name, image) => dispatch(actions.createProfile(name, image)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateProfile);