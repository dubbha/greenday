import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SimpleLineChart from './charts/SimpleLineChart';
import SplineWithPlotBands from './charts/SplineWithPlotBands';
import LiveUpdate from './charts/LiveUpdate';
import Root from './components/Root';
import './config';

import io from 'socket.io-client';
const socket = io.connect('http://127.0.0.1:3001/');

// https://whawker.github.io/react-jsx-highcharts/examples/index.html

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <button onClick={() => this.requestLiveData(123)}>REQUEST DATA</button>

        <BrowserRouter>
          <Route path="/" component={Root} />
        </BrowserRouter>

        <SimpleLineChart />
        <SplineWithPlotBands />
        <LiveUpdate />

      </div>
    );
  }

  componentDidMount() {
    console.log('init');
    socket.on('data', (data) => {
      console.log('data', data);
      // this.setState({ chat: [...this.state.chat, msg] });
    });
  }

  requestLiveData = (uids) => {
    socket.emit('getData', [123, 321]);
  }
}

export default App;
