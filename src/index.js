import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/bootstrap.min.css';
import './assets/styles.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
