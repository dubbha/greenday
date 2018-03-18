import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SimpleLineChart from './charts/SimpleLineChart';
import SplineWithPlotBands from './charts/SplineWithPlotBands';
import LiveUpdate from './charts/LiveUpdate';
import Root from './components/Root';
import './config';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/" component={Root} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;