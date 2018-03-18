import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div>
                <header className="App-header"></header>
                <div className="App-header-backdrop"></div>
                
                <div className="App-header-bottom">
                    <div className="App-header-profile-avatar">
                        <div class="App-header-profile-photo"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;