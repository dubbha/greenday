import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import firebase from 'firebase';
import SignIn from './SignIn';

class ProtectedRoute extends Component {
    renderRoute = (routeProps) => {
        console.log('routeProps', routeProps);
        const { component: ProtectedComponent } = this.props;
        const user = firebase.auth().currentUser;

        console.log('user?', user);
        return user ? <ProtectedComponent {...routeProps} /> : <SignIn />
    };

    render() {
        console.log('render');
        return (
            <Route render={this.renderRoute} />
        );
    }
}

export default ProtectedRoute;
