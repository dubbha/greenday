import React, { Component } from 'react';
import firebase from 'firebase';

class Profile extends Component {
    handleSignOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.history.push('/auth/signin');
        });
    };

    render() {
        return (
            <div>
                <h1>Profile</h1>
                <button onClick={this.handleSignOut}>Sign Out</button>
            </div>
        );
    }
}

export default Profile;