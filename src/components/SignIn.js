import React, { Component } from 'react';
import firebase from 'firebase';
import './SignIn.css';

class SignIn extends Component {
    state = {
        authenticating: false,
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            authenticating: true,
        });

        firebase.auth()
            .signInWithEmailAndPassword(this.email.value, this.password.value)
            .then(r => {
                localStorage.setItem('user', 'y');
                console.log('sign in ', r);
            })
            .then(() => {
                this.setState({
                    authenticating: false,
                });
                this.props.history.push('/profile');
            })
            .catch(() => {
                alert(123);
                this.setState({
                    authenticating: false,
                });
            });
    }

    render() {
        return (
            <div className="signin-wrapper">
                <div className="logo">
                    GREEN CITY
                    <div className="sublogo">solarmarathon</div>
                </div>
                <div className="signin-form">
                    <div className="signin-links">
                        <span className="signin-activelink">Sign in</span>
                        <span className="signin-link">New user registration</span>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input className="signin-input" type="text" placeholder="Email" ref={(node) => {this.email = node;}} />
                        <br />
                        <input className="signin-input" type="password" placeholder="Password" ref={(node) => {this.password = node;}} />
                        <br />
                        <div className="signin-right signin-forgot"><span className="signin-link">Forgot password?</span></div>
                        <br />
                        <div className="signin-right"><button className="signin-button" onClick={this.handleSubmit}>Sign In</button></div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignIn;
