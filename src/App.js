import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SimpleLineChart from './charts/SimpleLineChart';
import SplineWithPlotBands from './charts/SplineWithPlotBands';
import LiveUpdate from './charts/LiveUpdate';
import Root from './components/Root';
import Live from './components/Live';
import './config';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        {/* <button onClick={() => this.requestLiveData(123)}>LiveData</button> */}
        <Live />

        <BrowserRouter>
          <Route path="/" component={Root} />
        </BrowserRouter>

        <SimpleLineChart />
        <SplineWithPlotBands />
        {/* <LiveUpdate /> */}

      </div>
    );
  }
}

export default App;
