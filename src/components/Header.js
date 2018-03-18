import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div>
                <header className="App-header">
                    <ul className="nav navbar-nav">
                        <li><a className="active">Dash</a></li>
                        <li><a>Notification</a></li>
                        <li><a>Home</a></li>
                    </ul>
                </header>

                <div className="App-header-backdrop"></div>
                
                <div className="App-header-bottom">
                    <div className="App-header-profile-avatar">
                        <div className="App-header-profile-photo"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;