import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import SimpleLineChart from './charts/SimpleLineChart';
import SplineWithPlotBands from './charts/SplineWithPlotBands';
import Root from './components/Root';
import Header from './components/Header';
import Avg from './components/Avg';
import Profile from './components/Profile';
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
