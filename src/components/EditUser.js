import React from "react";
import * as actions from "../store/actions/user";
import {connect} from "react-redux";

class EditUser extends React.Component {

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

            <form method="POST" encType="multipart/form-data" onSubmit={this.submitEditUser}>
                <h3>User</h3>
                <label htmlFor="nameEditUser">Firstname or nickname</label>
                <input name="name" type="text" id="nameEditUser" placeholder="Melvin" defaultValue={this.props.name} required/>
                <div><label htmlFor={"imageSelectEditUser"}><img id="showSelectedImageEditUser" className={"userImage"} alt="Profile" src={this.props.image}/></label></div>
                <div><label htmlFor={"imageSelectEditUser"}>Add profile picture</label></div>
                <input name="image" type="hidden" id="imageEditUser"/>
                <input name="imageSelect" type="file" id="imageSelectEditUser" accept="image/*" onChange={this.onImageSelect}/>
                <button type="submit">Submit</button>
            </form>

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
)(EditUser);