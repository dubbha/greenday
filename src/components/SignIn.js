import React, { Component } from 'react';
import firebase from 'firebase';

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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Email" ref={(node) => {this.email = node;}} />
                    <br />
                    <input type="password" placeholder="Password" ref={(node) => {this.password = node;}} />
                    <br />
                    <span>Forget password?</span>
                    <br />
                    <button onClick={this.handleSubmit}>Sign In</button>
                </form>
            </div>
        );
    }
}

export default SignIn;