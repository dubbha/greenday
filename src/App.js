import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SimpleLineChart from './charts/SimpleLineChart';
import SplineWithPlotBands from './charts/SplineWithPlotBands';
import LiveUpdate from './charts/LiveUpdate';
import Root from './components/Root';
import Live from './components/Live';
import Header from './components/Header';
import LiveMine from './components/LiveMine';
import Avg from './components/Avg';
import Profile from './components/Profile';
import './config';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        {/* <Header />

        <Live />
        <Avg />
        <SimpleLineChart /> */}

        {/* <SplineWithPlotBands /> */}
        {/* <LiveUpdate /> */}

        <BrowserRouter>
          <Route path="/" component={Root} />
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
