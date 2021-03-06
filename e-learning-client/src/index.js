import React from 'react';
import ReactDOM from 'react-dom';

import './css/index.css';
import './css/App.css';
import './css/colors.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-table-v6/react-table.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './css/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
