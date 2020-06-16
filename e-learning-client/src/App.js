import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/App.css';

import store from './redux/store';
import { loadUser } from './redux/actions/authActions';

import Header from './components/Layout/Header';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <>
        <Header/>
      </>
    );
  }
}

export default App;
