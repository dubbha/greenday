import React, { Component } from 'react';
import firebase from 'firebase';
import Live from '../components/Live';
import Header from '../components/Header';
import Avg from '../components/Avg';
import SimpleLineChart from '../charts/SimpleLineChart';

class Profile extends Component {
    handleSignOut = () => {
        firebase.auth().signOut().then(() => {
            this.props.history.push('/auth/signin');
        });
    };

    render() {
        return (
            <div>
                <Header />
                <Live />
                <Avg />
                <div style={{"paddingTop": "60px"}} className="Highcharts-wrapper">
                    <SimpleLineChart />
                </div>
            </div>
            // <div>
            //     <h1>Profile</h1>
            //     <button onClick={this.handleSignOut}>Sign Out</button>
            // </div>
        );
    }
}

export default Profile;