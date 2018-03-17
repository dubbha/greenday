import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import firebase from 'firebase';
import SignIn from './SignIn';

class ProtectedRoute extends Component {
    renderRoute = (routeProps) => {
        const { component: ProtectedComponent } = this.props;
        const user = firebase.auth().currentUser;

        return user ? <ProtectedComponent {...routeProps} /> : <SignIn />
    };

    render() {
        return (
            <Route render={this.renderRoute} />
        );
    }
}

export default ProtectedRoute;
