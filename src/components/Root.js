import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import firebase from 'firebase';
import ProtectedRoute from './ProtectedRoute';
import SignIn from './SignIn';
import Profile from './Profile';

class Root extends Component {
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            console.log('user: ', user);
            if (user) {
                this.props.history.push('/profile');
            }
        });
    }

    render() {
        return (
            <Switch>
                <Route path="/" exact component={SignIn} />
                <ProtectedRoute path="/profile" component={Profile} />
            </Switch>
        );
    }
}

export default Root;